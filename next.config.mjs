/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'phenomenal-example-f9a76ee58b.strapiapp.com',
        port: '',
        pathname: '**',
      },
    ],
  },
}

export default nextConfig
