import * as fs from "fs";
import hljs from "highlight.js/lib/common";
import hljsBlade from "highlightjs-blade";
hljs.registerLanguage("blade", hljsBlade);
import * as path from "path";

import { marked } from "marked";
import { getDocContents, getName } from "./Utils";
import { HTML_DOCS, MD_DOCS } from "./constants";

export default class Generator {
  static baseDir = path.join(__dirname, "..");
  /**
   * Find directory if none, create!
   * @param dirPath
   */
  private static existsOrCreate(dirPath: string, deleteContents?: boolean) {
    console.log("Checking ", dirPath);

    if (!fs.existsSync(dirPath)) {
      console.log("Creating ", dirPath);
      fs.mkdirSync(dirPath, { recursive: true });
      return;
    }

    console.log("Exists!");

    if (deleteContents === true) {
      console.log("Checking Folder Contents!");

      fs.readdirSync(dirPath).forEach((htmlFile) => {
        let foundFilePath = path.join(dirPath, htmlFile);

        fs.unlinkSync(foundFilePath);
        console.log("Deleted ", foundFilePath);
      });
    }
  }

  private static processDocs() {
    /**
     * Get Versions eg 8.x,9.x
     */
    const versionList: string[] = fs.readdirSync(
      path.join(Generator.baseDir, MD_DOCS)
    );

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

      d.files.forEach((f) => {
        const fileName = path.join(docDir, f.title.toLowerCase() + ".html");

        const fileContents = getDocContents(f.link);

        const HTML = marked(fileContents, {
          highlight: (code, lang) => {
            const language = hljs.getLanguage(lang) ? lang : "php";
            return hljs.highlight(code, { language }).value;
          },
        });

        fs.writeFile(fileName, HTML, (err) => {
          if (err) {
            throw err;
          }
          console.log("Created File", fileName);
        });
      });
    });
  }
}
