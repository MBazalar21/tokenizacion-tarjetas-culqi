import { Writable } from 'stream';

export class MockResponse extends Writable {
  statusCode?: number;
  _data = '';

  constructor() {
    super();
  }

  override _write(
    chunk: any,
    encoding: BufferEncoding,
    callback: (error?: Error | null) => void
  ) {
    this._data += chunk instanceof Buffer ? chunk.toString() : chunk;
    callback();
  }

  writeHead(statusCode: number, headers?: Record<string, string>) {
    this.statusCode = statusCode;
  }

  // 👇 Sobrecargas
  override end(cb?: () => void): this;
  override end(chunk: any, cb?: () => void): this;
  override end(chunk: any, encoding: BufferEncoding, cb?: () => void): this;

  // 👇 Implementación real compatible con las tres firmas
  override end(
    chunk?: any,
    encodingOrCb?: BufferEncoding | (() => void),
    maybeCb?: () => void
  ): this {
    let encoding: BufferEncoding | undefined;
    let callback: (() => void) | undefined;

    if (typeof encodingOrCb === 'function') {
      callback = encodingOrCb;
    } else {
      encoding = encodingOrCb;
      callback = maybeCb;
    }

    if (chunk) {
      this._data += chunk instanceof Buffer ? chunk.toString() : chunk;
    }

    if (callback) callback();
    return this;
  }

  _getData(): string {
    return this._data;
  }
}
