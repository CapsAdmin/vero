import esbuild from "esbuild"
import fs from "fs-extra"
import { spawn } from "child_process"

const tsc = () => {
	console.time("typecheck")

	spawn("pnpm", ["tsc"], { stdio: "inherit" }).on("exit", (error) => {
		console.timeEnd("typecheck")
	})
}

console.time("build")
const context = await esbuild.context({
	entryPoints: ["src/index.tsx"],
	outfile: "public/bundle.js",
	bundle: true,
	minify: false,
	target: "ES2020",
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
})

const result = await context.rebuild()
console.timeEnd("build")

tsc()

fs.emptyDirSync("./public/assets/")
fs.copySync("../gui/src/assets/", "./public/assets/")

await context.watch()

 await context.serve({
	port: 3000,
	servedir: "./public",
 })

 console.log("http://localhost:3000")