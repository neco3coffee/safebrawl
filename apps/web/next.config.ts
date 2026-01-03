import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  output: "export",
};

const withNextIntl = createNextIntlPlugin(
  './app/_i18n/request.ts'
);
export default withNextIntl(nextConfig);


