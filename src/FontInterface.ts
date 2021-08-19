export interface Font {
  family: String;
  variants: String[];
  subsets: String[];
  version: String;
  lastModified: String;
  files: {
    [key: string]: String;
  };
  category: String;
  kind: String;
}
