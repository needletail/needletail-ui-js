import typescript from "@rollup/plugin-typescript";
import html from "rollup-plugin-html";
import postcss from "rollup-plugin-postcss";
import scss from 'postcss-scss';
import cssnano from 'cssnano';
import terser from '@rollup/plugin-terser';

export default {
    input: 'src/Needletail.ts',
    output: {
        file: 'needletail.min.js',
        format: 'es',
        plugins: [],
    },
    plugins: [
        typescript(), 
        html({
            include: "src/**/*.html",
        }),
        postcss({
            extract: true,
            plugins: [cssnano()],
            parser: scss,
            stringifier: scss,
        }),
        terser()
    ]
}