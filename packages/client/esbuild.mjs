import esbuild from "esbuild"
import fs from "fs-extra"
import serve, { error, log } from "create-serve"
import { spawn } from "child_process"

const tsc = () => {
	console.time("typecheck")

	spawn("pnpm", ["tsc"], { stdio: "inherit" }).on("exit", (error) => {
		console.timeEnd("typecheck")
	})
}

esbuild
	.build({
		entryPoints: ["src/index.tsx"],
		outfile: "public/bundle.js",
		bundle: true,
		minify: false,
		sourcemap: "both",
		define: {
			"process.env.NODE_ENV": '"development"',
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
		watch: {
			onRebuild(err) {
				tsc()
				serve.update()
				err ? error("× Failed") : log("✓ Updated")
			},
		},
	})
	.catch(() => process.exit(1))

fs.emptyDirSync("./public/assets/")
fs.copySync("../gui/src/assets/", "./public/assets/")

tsc()

serve.start({
	port: 3000,
	root: "./public",
})
