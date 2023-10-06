export type IDocFile = {
  title: string;
  filename: string;
  link: string;
};
export type IDocContents = IDocFile & {
  contents: string;
};
