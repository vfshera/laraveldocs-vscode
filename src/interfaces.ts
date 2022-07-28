export interface IDocFile {
  title: string;
  filename: string;
  link: string;
}
export interface IDocContents extends IDocFile {
  contents: string;
}
