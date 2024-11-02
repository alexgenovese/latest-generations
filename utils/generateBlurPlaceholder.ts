// import imagemin from "imagemin";
// import imageminJpegtran from "imagemin-jpegtran";
import type { ImageProps } from "./types";

const cache = new Map<ImageProps, string>();

export default async function getBase64ImageUrl( image: ImageProps ): Promise<string> {
  let url = cache.get(image);
  if (url) return url;
  
  const response = await fetch(`https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/w_scale,w_8/${image.public_id}.${image.format}`);
  const buffer = await response.arrayBuffer();
  // const minified = await imagemin.buffer(Buffer.from(buffer), { plugins: [imageminJpegtran()] } );

  url = `data:image/jpeg;base64,${Buffer.from(buffer)}`;
  cache.set(image, url);
  return url;
}