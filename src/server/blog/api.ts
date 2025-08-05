import * as fs from "fs-extra";
import * as path from "node:path";
import _ from "lodash";

async function* dir_api(dir: string) {
    for await (const d of await fs.promises.opendir(dir)) {
        if (d.isDirectory()) yield* [d.name];
    }
}

export async function getAllBlogs() {
    const fullPath = path.join(process.cwd(), 'docs', 'blog');
    const dirs = dir_api(fullPath);
    const list = [];
    for await (let d of dirs) {
        list.push(d);
    }
    return _.uniq(list);
}
