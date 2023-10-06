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

export interface IHighlightOptions {
  renderer?: object;
  highlight?: string | ((code: string, lang: string) => string);
  langPrefix?: string;
  pedantic?: boolean;
  gfm?: boolean;
  breaks?: boolean;
  sanitize?: boolean;
  smartLists?: boolean;
  smartypants?: boolean;
  xhtml?: boolean;
}

export interface IHighlightJs {
  setOptions: (options: IHighlightOptions) => void;
  highlight: (code: string, {}) => any;
  highlightAll: () => any;
  registerLanguage: (lang: string, plugin: any) => any;
  getLanguage: (lang: string) => any;
  parse: (
    markdownString: string,
    options?: IHighlightOptions,
    callback?: () => any
  ) => string;
}
