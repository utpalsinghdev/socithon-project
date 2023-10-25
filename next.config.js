/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
    },
    images: {
        domains: [
            "res.cloudinary.com",
            "images.unsplash.com",
            "lh3.googleusercontent.com",
            "source.unsplash.com",
        ],
    },
};

module.exports = nextConfig;