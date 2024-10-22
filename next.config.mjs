/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        instrumentationHook: true,
    },
    swcMinify: true,
    compiler: {
        removeConsole: true,
    },
    eslint: {
        ignoreDuringBuilds: true
    }
};

export default nextConfig;
