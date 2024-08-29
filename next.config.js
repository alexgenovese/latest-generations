module.exports = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  env: {
    cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    comfydeploy_api_key: process.env.COMFYDEPLOY_API_KEY
  },
};
