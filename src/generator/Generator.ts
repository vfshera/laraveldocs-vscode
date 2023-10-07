import * as fs from "fs";
import hljs from "highlight.js/lib/common";
import * as path from "path";
import { Marked } from "marked";
import { HTML_DOCS, MD_DOCS, EXT_NAME } from "../constants";
import { markedHighlight } from "marked-highlight";
import { getDocContents } from "../utils";
import bladeHighlight from "./blade-highlight";
import { logger } from "../utils/logger";
import * as kleur from "kleur";

hljs.registerLanguage("blade", bladeHighlight);

const marked = new Marked(
  markedHighlight({
    langPrefix: "hljs language-",
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : "php";
      return hljs.highlight(code, { language }).value;
    },
  })
);
export default class Generator {
  static baseDir = path.join(__dirname, "..", "..");

  /**
   * Files to be excluded from compilation to html
   */
  static excludeFiles: string[] = [
    "documentation.md",
    "deployment.md",
    "releases.md",
    "contributions.md",
    "readme.md",
  ];

  /**
   * Find directory if none, create!
   * @param dirPath
   */
  private static existsOrCreate(dirPath: string, deleteContents: boolean = false) {
    logger(`Checking ${dirPath}`);
console.log();

    if (!fs.existsSync(dirPath)) {
      logger(kleur.red(`${dirPath} was not found!`));
      logger(kleur.green(`Creating ${dirPath}`));
      fs.mkdirSync(dirPath, { recursive: true });
      return;
    }

    if (deleteContents) {
      console.log();
      
      logger("Checking Folder Contents!");

      fs.readdirSync(dirPath).forEach((htmlFile) => {

        let foundFilePath = path.join(dirPath, htmlFile);

        fs.unlinkSync(foundFilePath);
        console.log();
        logger(kleur.red(`Deleted ${htmlFile}`));
      });
    }
  }

  private static processDocs() {
    /**
     * Get Versions eg 10.x
     */
    const versionList: string[] = fs.readdirSync(path.join(Generator.baseDir, MD_DOCS));

    return versionList.map((ver) => {
      const versionDir = path.join(Generator.baseDir, MD_DOCS, ver);

      return {
        version: ver,
        files: fs.readdirSync(versionDir).map((fileName) => ({
          title: fileName.split(".")[0],
          filename: fileName,
          link: path.join(versionDir, fileName),
        })),
      };
    });
  }

  static renderHtml() {
    const DOCS = Generator.processDocs();

    Generator.existsOrCreate(path.join(Generator.baseDir, HTML_DOCS));

    DOCS.forEach((d) => {
      /**
       * Find docs directory
       */
      const docDir = path.join(Generator.baseDir, HTML_DOCS, d.version);

      Generator.existsOrCreate(docDir, true);

      d.files.forEach(async (f) => {
        if (Generator.excludeFiles.includes(f.filename.toLowerCase())) {
          console.log();
          
          logger(kleur.underline().yellow(`${f.filename} has been excluded!`));
        } else {
          const fileName = f.title.toLowerCase() + ".html";
          
          const filePath = path.join(docDir, fileName);
          
          const fileContents = getDocContents(f.link);
          
          const HTML = await marked.parse(fileContents);
          
          fs.writeFile(filePath, HTML, (err) => {
            if (err) {
              throw err;
            }
            console.log();
            logger(kleur.green(`Created ${fileName}`));
          });
        }
      });
    });
  }
}

/**
 * Render Html
 */
logger(`${kleur.blue("Render Html")}`);
console.log();

Generator.renderHtml();
