"use server"
import sharp from 'sharp'
import type { ImageProps } from "./types";

function bufferToBase64(buffer: Buffer): string {
  return `data:image/png;base64,${buffer.toString('base64')}`
}

async function getBuffer(url: string) {
  const response = await fetch(url)
  return Buffer.from(await response.arrayBuffer())
}

export default async function getPlaceholderImage(image: ImageProps ): Promise<string> {
  try {
    const lowResImage = await getBuffer(
      `https://res.cloudinary.com/${process.env.cloudinary_cloud_name}/image/upload/f_jpg,w_8,q_70/${image.public_id}.${image.format}`,
    )
    const resizedBuffer = await sharp(lowResImage).resize(20).toBuffer()
    return bufferToBase64(resizedBuffer)
  } catch {
    return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOsa2yqBwAFCAICLICSyQAAAABJRU5ErkJggg=='
  }
}