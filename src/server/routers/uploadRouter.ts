// trpc/uploadRouter.ts

import { zod } from "zod";
import { router, publicProcedure } from "../trpc/router";
import {
  CreateMultipartUploadCommand,
  UploadPartCommand,
  CompleteMultipartUploadCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3 } from "../utils/s3-aws";
import { castingMedia } from "../db/schema";

export const uploadRouter = router({

  // STEP 1: create multipart upload
  createSession: publicProcedure
    .input(zod.object({
      filename: zod.string(),
      contentType: zod.string(),
      castingId: zod.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      const key = `casting/${ctx.user.id}/${Date.now()}-${input.filename}`;

      const command = new CreateMultipartUploadCommand({
        Bucket: process.env.AWS_BUCKET!,
        Key: key,
        ContentType: input.contentType,
      });

      const res = await s3.send(command);

      return {
        uploadId: res.UploadId!,
        key,
      };
    }),

  // STEP 2: get presigned URL for each part
  getPresignedPartUrl: publicProcedure
    .input(zod.object({
      uploadId: zod.string(),
      key: zod.string(),
      partNumber: zod.number(),
    }))
    .mutation(async ({ input }) => {
      const command = new UploadPartCommand({
        Bucket: process.env.AWS_BUCKET!,
        Key: input.key,
        UploadId: input.uploadId,
        PartNumber: input.partNumber,
      });

      const url = await getSignedUrl(s3, command, {
        expiresIn: 3600,
      });

      return { url };
    }),

  // STEP 3: Complete multipart
  completeUpload: publicProcedure
  .input(zod.object({
    uploadId: zod.string(),
    key: zod.string(),
    castingId: zod.string(),
    parts: zod.array(zod.object({
      partNumber: zod.number(),
      ETag: zod.string(),
    })),
    filename: zod.string(),
    contentType: zod.string(),
    size: zod.number(),
    type: zod.enum(["image", "video", "document"]),
  }))
  .mutation(async ({ ctx, input }) => {
    // 1. finish S3
    await s3.send(new CompleteMultipartUploadCommand({
      Bucket: process.env.AWS_BUCKET!,
      Key: input.key,
      UploadId: input.uploadId,
      MultipartUpload: {
        Parts: input.parts.map((p) => ({
          ETag: p.ETag,
          PartNumber: p.partNumber,
        })),
      }
    }));

    const fileUrl = `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${input.key}`;

    // 2. save DB
    await ctx.db.insert(castingMedia).values({
      castingId: input.castingId,
      userId: ctx.user.id,
      url: fileUrl,
      key: input.key,
      filename: input.filename,
      contentType: input.contentType,
      type: input.type,
      size: input.size,
      status: "completed",
      duration: 0,
    });

    return { success: true, fileUrl };
  }),
});
