import React from "react";
import { Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import axios from "axios";
import { trpc } from "@/utils/trpc";

const CHUNK_SIZE = 8 * 1024 * 1024;
const MAX_RETRY = 3;

type UploadCastingFileProps = {
  castingId: string;
  onUploaded?: () => void;
};

export default function UploadCastingFile({
  castingId,
  onUploaded,
}: UploadCastingFileProps) {
  const createMut = trpc.upload.createSession.useMutation();
  const presignMut = trpc.upload.getPresignedPartUrl.useMutation();
  const completeMut = trpc.upload.completeUpload.useMutation();

  const uploadChunkWithRetry = async (url, chunk, fileType) => {
    let attempt = 0;
    while (attempt < MAX_RETRY) {
      try {
        const res = await axios.put(url, chunk, {
          headers: {
            "Content-Type": fileType,
          },
          maxBodyLength: Infinity,
          maxContentLength: Infinity,
        });
        return res;
      } catch (err) {
        attempt++;
        if (attempt >= MAX_RETRY) throw err;
      }
    }
  };

  const customUpload = async ({ file, onSuccess, onError, onProgress }) => {
    try {
      const start = await createMut.mutateAsync({
        filename: file.name,
        contentType: file.type || "application/octet-stream",
        castingId,
      });

      const totalParts = Math.ceil(file.size / CHUNK_SIZE);
      const parts: { partNumber: number; ETag: string }[] = [];

      for (let partNumber = 1; partNumber <= totalParts; partNumber++) {
        const startByte = (partNumber - 1) * CHUNK_SIZE;
        const endByte = Math.min(partNumber * CHUNK_SIZE, file.size);
        const chunk = file.slice(startByte, endByte);

        const presignResp = await presignMut.mutateAsync({
          uploadId: start.uploadId,
          key: start.key,
          partNumber,
        });

        let putRes;
        try {
          putRes = await uploadChunkWithRetry(
            presignResp.url,
            chunk,
            file.type,
          );
        } catch (err1) {
          putRes = await axios.put(presignResp.url, chunk, {
            maxBodyLength: Infinity,
            maxContentLength: Infinity,
          });
        }

        const rawEtag = (putRes.headers.etag ??
          putRes.headers.ETag) as string;

        if (!rawEtag)
          throw new Error("No ETag returned from S3 for part " + partNumber);

        const ETag = rawEtag.replace(/"/g, "");

        parts.push({ partNumber, ETag });

        onProgress?.({
          percent: Math.round((partNumber / totalParts) * 100),
        });
      }

      parts.sort((a, b) => a.partNumber - b.partNumber);

      await completeMut.mutateAsync({
        uploadId: start.uploadId,
        key: start.key,
        parts,
        castingId,
        filename: file.name,
        contentType: file.type || "application/octet-stream",
        size: file.size,
        type: file.type.startsWith("video") ? "video" : "image",
      });

      message.success("Upload xong");
      onUploaded?.();
      onSuccess?.("ok");
    } catch (err) {
      console.error("upload error", err);
      message.error("Upload thất bại");
      onError?.(err);
    }
  };

  return (
    <Upload.Dragger customRequest={customUpload as any}>
      <p>
        <InboxOutlined /> Kéo thả file hoặc nhấn để upload
      </p>
    </Upload.Dragger>
  );
}
