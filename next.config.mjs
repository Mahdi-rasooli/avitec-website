/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.aon.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'assets.aon.com',
                pathname: '/**',
            }
        ],
    },
};

export default nextConfig;
