import path from 'node:path';
import {defineConfig, type Plugin} from 'vite';

function htmlTemplatesAsRawPlugin(): Plugin {
    const htmlTemplatesDirFragment = `${path.sep}src${path.sep}Html${path.sep}`;

    return {
        name: 'needletail-html-templates-as-raw',
        enforce: 'pre',
        async resolveId(source, importer, options) {
            if (!source.endsWith('.html') || !importer) {
                return null;
            }

            // Let Vite resolve the file first (handles TS/alias/etc)
            const resolved = await this.resolve(source, importer, {
                ...options,
                skipSelf: true,
            });

            if (!resolved) {
                return null;
            }

            // Only rewrite Needletail's mustache templates, not Vite HTML entrypoints.
            if (!resolved.id.includes(htmlTemplatesDirFragment)) {
                return null;
            }

            // Vite's built-in `?raw` turns the file into a string default export.
            if (resolved.id.includes('?raw')) {
                return resolved.id;
            }
            if (resolved.id.includes('?')) {
                return `${resolved.id}&raw`;
            }
            return `${resolved.id}?raw`;
        },
    };
}

export default defineConfig({
    root: __dirname,
    plugins: [htmlTemplatesAsRawPlugin()],
    resolve: {
        alias: {
            '@needletail/ui': path.resolve(__dirname, '../src/Needletail.ts'),
        },
    },
    build: {
        outDir: path.resolve(__dirname, 'dist'),
        emptyOutDir: true,
        rollupOptions: {
            input: {
                index: path.resolve(__dirname, 'index.html'),
                all: path.resolve(__dirname, 'all.html'),
                dates: path.resolve(__dirname, 'dates.html'),
                applyMode: path.resolve(__dirname, 'apply-mode.html'),
            },
        },
    },
    server: {
        port: 5173,
        strictPort: true,
    },
});

