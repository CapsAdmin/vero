const { resolve } = require("path")
const { readdir, writeFile } = require("fs").promises

async function* getFiles(dir) {
	const dirents = await readdir(dir, { withFileTypes: true })
	for (const dirent of dirents) {
		const res = resolve(dir, dirent.name)
		if (dirent.isDirectory()) {
			yield* getFiles(res)
		} else {
			yield res
		}
	}
}

;(async () => {
	let json = {}
	for await (const path of getFiles(".")) {
		if (path.endsWith(".png")) {
			const relative = path.substr(__dirname.length + 1)
			let [group, id, name] = relative.toLowerCase().split("/")

			if (!name) {
				name = id
				id = id.substr(0, id.length - 4)
			}
			name = name.substr(0, name.length - 4)

			const key = group + "." + id

			json[key] = json[key] || { outline: [], color: [] }
			if (name.includes("color")) {
				json[key].color.push(relative)
			} else {
				json[key].outline.push(relative)
			}
		}
	}
	await writeFile(__dirname + "/parts.json", JSON.stringify(json, null, 4))
})()
