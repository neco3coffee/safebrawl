import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
	/* config options here */
	async headers() {
		return [
			{
				source: '/:locale(ja|en)',
				headers: [
					{
						key: 'Cache-Control',
						value: 'public, max-age=3600, s-maxage=86400'
					}
				]
			},
			// /ja, /en etc
			{
				source: '/:locale(ja|en)/home',
				headers: [
					{
						key: 'Cache-Control',
						value: 'public, max-age=3600, s-maxage=86400'
					}
				]
			}
		]
	}
};

const withNextIntl = createNextIntlPlugin(
	"./app/_i18n/request.ts"
);
export default withNextIntl(nextConfig);

// Enable calling `getCloudflareContext()` in `next dev`.
// See https://opennext.js.org/cloudflare/bindings#local-access-to-bindings.
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
