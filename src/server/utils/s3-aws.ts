import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_KEY!,
  },
});

export async function uploadToS3(file: File | Blob, folder: string) {
  const key = `${folder}/${Date.now()}-${file instanceof File ? file.name : "file"}`;
  
  const arrayBuffer = await file.arrayBuffer();
  
  const body = new Uint8Array(arrayBuffer); 
  
  await s3.send(new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET!,
    Key: key,
    Body: body,
    ContentType: (file as any).type || "application/octet-stream",
  }));

  return {
    key,
    size: arrayBuffer.byteLength,
    mime: (file as any).type || "application/octet-stream",
    url: `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`,
  };
}
