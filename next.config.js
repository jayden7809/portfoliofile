/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // 깃허브 페이지(포트폴리오)에서 이 사이트를 iframe으로 감쌀 수 있도록 허용
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' https://jayden7809.github.io https://*.github.io",
          },
          // X-Frame-Options는 아예 내지 않는 편이 가장 안전합니다(빈값 지양).
          // Next.js는 기본으로 XFO를 주지 않으므로 여기선 추가하지 않습니다.
        ],
      },
    ];
  },
};

module.exports = nextConfig;
