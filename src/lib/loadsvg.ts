import fs from "fs";
import { join} from 'path';

const SVG_PATH = join(process.cwd(),'public','svgs') // "/Users/username/project/public/svgs"

export default function loadSvg(name: string) {
    const filepath = join(SVG_PATH, `${name}.svg`); // adds name to end of path to find svg in public folder
    return fs.readFileSync(filepath, "utf8"); // returns the raw svg markup as a string
}
