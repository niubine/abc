/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // 👈 添加这一行，启用静态导出
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}


export default nextConfig
