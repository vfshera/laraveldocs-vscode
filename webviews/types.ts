export interface IpostMessage {
  command: string;
  value: any;
}
export interface IDoc {
  version: string;
  files: IDocFile[];
}
export interface IDocFile {
  title: string;
  filename: string;
  link: string;
}

export interface IDocContents extends IDocFile {
  contents: string;
}
