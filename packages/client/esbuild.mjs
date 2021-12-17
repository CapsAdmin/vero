import esbuild from "esbuild"
import fs from "fs-extra"

esbuild
	.build({
		entryPoints: ["src/index.tsx"],
		outfile: "public/bundle.js",
		bundle: true,
		minify: false,
		sourcemap: "both",
		inject: ["./src/import_react.js"],
		define: {
			"process.env.NODE_ENV": '"production"',
			"process.env.JEST_WORKER_ID": "undefined",
			"process.env.PUBLIC_URL": '"http://localhost"',
		},
		loader: {
			".png": "dataurl",
			".jpg": "dataurl",
			".ttf": "dataurl",
			".svg": "dataurl",
		},
		plugins: [
			{
				name: "map react-native",
				setup(build) {
					build.onLoad({ filter: /react\-native\/index\.js/ }, async (args) => {
						return {
							loader: "js",
							resolveDir: "./node_modules/react-native-web/dist/",
							contents: await fs.promises.readFile("./node_modules/react-native-web/dist/index.js"),
						}
					})
				},
			},
		],
	})
	.catch(() => process.exit(1))

fs.emptyDirSync("./public/assets/")
fs.copySync("../gui/src/assets/", "./public/assets/")
