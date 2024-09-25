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
    comfydeploy_api_key: process.env.COMFYDEPLOY_API_KEY,
    slug_link: "latest-generations",
    url: "latest-generations.getreica.com",
    title_og: "Reica | Generate AI image for Free",
    desc_og: "AI Generative photorealistic suite for Marketeers | Try and generate photo free, Get Free Credits to Generate your next asset",
    supabase: {
      api_key: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRkbG1oa2xkaXNvcnNncG9uaXNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ0MzMyMjEsImV4cCI6MjA0MDAwOTIyMX0.Q8eqlJCRggK_1fP6BAIFThvKVgJEYEoS3xdSOjXmqYA",
      url: "https://ddlmhkldisorsgponisj.supabase.co"
    }
  },
};
