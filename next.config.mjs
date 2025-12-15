import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/libs/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true, // Bật strict mode để phát hiện vấn đề sớm
  compress: true, // Bật compression
  poweredByHeader: false, // Ẩn X-Powered-By header
  // Tối ưu hình ảnh
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",

    remotePatterns: [
      {
        protocol: 'http',
        hostname: '192.168.1.171',
        port: '9000',
        pathname: '/images/**',
      },
      {
        protocol: 'http',
        hostname: '192.168.1.171',
        port: '9000',
        pathname: '/my-bucket/**',
      },
    ],
  },
  // Tối ưu bundle
  experimental: {
    // optimizeCss: true, // Tạm thời tắt do thiếu module 'critters'
  },
  // Tối ưu compiler
  compiler: {
    removeConsole:
      process.env.NODE_ENV === 'production'
        ? {
            exclude: ['error', 'warn'],
          }
        : false,
  },
  webpack: (config, { dev, isServer }) => {
    config.externals.push({
      bufferutil: 'bufferutil',
      'utf-8-validate': 'utf-8-validate',
    });

    // Tối ưu production build
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        moduleIds: 'deterministic',
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              priority: 10,
              reuseExistingChunk: true,
            },
            antd: {
              test: /[\\/]node_modules[\\/]antd[\\/]/,
              name: 'antd',
              priority: 20,
              reuseExistingChunk: true,
            },
          },
        },
      };
    }

    // Tối ưu production build
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        moduleIds: 'deterministic',
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              priority: 10,
              reuseExistingChunk: true,
            },
            antd: {
              test: /[\\/]node_modules[\\/]antd[\\/]/,
              name: 'antd',
              priority: 20,
              reuseExistingChunk: true,
            },
          },
        },
      };
    }

    return config;
  },
  // Headers cho caching và security
  async headers() {
    return [
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
