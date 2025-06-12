const BASE62_CHARS = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

export function toBase62(num: number): string {
  let str = '';
  do {
    str = BASE62_CHARS[num % 62] + str;
    num = Math.floor(num / 62);
  } while (num > 0);
  return str;
}

export function fromBase62(str: string): number {
  return [...str].reduce((acc, char) => acc * 62 + BASE62_CHARS.indexOf(char), 0);
}
