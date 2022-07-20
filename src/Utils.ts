import * as fs from "fs";
import path = require("path");

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
  return filename.charAt(0).toUpperCase() + filename.slice(1);
}

export function docs() {
  /**
   * Get Versions eg 8.x,9.x
   */
  const versionList: string[] = fs.readdirSync(
    path.join(__dirname, "..", "assets/docs")
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
        .map((f) => ({
          title: getName(f.split(".")[0]),
          filename: f,
          link: path.join(__dirname, "..", "assets/docs/", ver, "/", f),
        })),
    };
  });
}
