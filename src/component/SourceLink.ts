import {a} from '@fusorjs/dom/html';

const root = process.env.SOURCE_FILE_ROOT ?? '';

export const SourceLink = (filePath: string, ...args: any[]) =>
  a(args, {target: '_blank', href: root + filePath});
