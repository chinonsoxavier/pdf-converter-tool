"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var vite_1 = require("vite");
var plugin_react_swc_1 = __importDefault(require("@vitejs/plugin-react-swc"));
var path_1 = __importDefault(require("path"));
var vite_2 = __importDefault(require("@tailwindcss/vite"));
// https://vite.dev/config/
exports.default = (0, vite_1.defineConfig)({
    plugins: [(0, plugin_react_swc_1.default)(), (0, vite_2.default)()],
    resolve: {
        alias: {
            "@": path_1.default.resolve(__dirname, "./src"),
        },
    },
    server: {
        port: 5173,
        proxy: {
            '/pdf-worker': {
                target: 'https://unpkg.com/pdfjs-dist@3.8.162/legacy/build/pdf.worker.min.js',
                rewrite: function (path) { return path.replace(/^\/pdf-worker/, ''); },
                changeOrigin: true,
                secure: false,
            },
        },
    },
});
