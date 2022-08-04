import * as fs from "fs";
import path = require("path");
import { DOCS_DIR } from "./constants";

export function getNonce() {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

function getName(filename: string) {
  return filename
    .trim()
    .split("-")
    .map((substr) => {
      if (substr !== "-") {
        substr = capitalizeFirst(substr);
      }
      return substr;
    })
    .join(" ");
}

function capitalizeFirst(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function getDocContents(pathToFile: string) {
  return fs.readFileSync(pathToFile, { encoding: "utf-8" });
}

export function docs() {
  /**
   * Get Versions eg 8.x,9.x
   */
  const versionList: string[] = fs.readdirSync(
    path.join(__dirname, "..", DOCS_DIR)
  );

  return versionList.map((ver) => {
    /**
     * Getting Files in each version folder
     * [{ version: 9.x, files: [...list of .md filenames without extension ]}]
     */
    return {
      version: ver,
      files: fs
        .readdirSync(path.join(__dirname, "..", "assets/docs/", ver))
        .map((fileName) => ({
          title: getName(fileName.split(".")[0]),
          filename: fileName,
          link: path.join(__dirname, "..", "assets/docs/", ver, "/", fileName),
        })),
    };
  });
}
