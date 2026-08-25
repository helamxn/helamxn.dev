// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import { siteConfig } from './src/config/site';

// https://astro.build/config
export default defineConfig({
    site: siteConfig.url,
    fonts: [
        {
            provider: fontProviders.fontsource(),
            name: 'Cascadia Code',
            cssVariable: '--font-cascadia-code',
            weights: [400, 600, 700],
            styles: ['normal'],
            subsets: ['latin'],
            fallbacks: ['Consolas', 'monospace'],
        },
    ],
});
