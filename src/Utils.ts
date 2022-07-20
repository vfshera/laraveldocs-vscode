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

export function docs() {
  const versions = fs.readdirSync(path.join(__dirname, "..", "assets/docs"));

  return versions.map((ver) => {
    return {
      v: ver,
      files: fs
        .readdirSync(path.join(__dirname, "..", "assets/docs/", ver))
        .map((f) => f.split(".")[0]),
    };
  });
}
