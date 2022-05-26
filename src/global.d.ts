declare module '*.scss';
declare module 'betterdiscord/bdapi';

declare const PACKAGE_VERSION: string;
declare const PACKAGE_DESCRIPTION: string;
declare const BETTERDISCORD_UPDATEURL: string;

interface Font {
  family: string;
  variants: string[];
  subsets: string[];
  version: string;
  lastModified: string;
  files: {
    [key: string]: string;
  };
  category: string;
  kind: string;
}
