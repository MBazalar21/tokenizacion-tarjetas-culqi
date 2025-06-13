import { Readable } from 'stream';

export function createMockRequest(body: any): Readable {
  const jsonData = JSON.stringify(body);

  const req = new Readable({
    read() {
      this.push(jsonData); // simula el evento 'data'
      this.push(null);     // simula el evento 'end'
    }
  });

  // Agrega las propiedades mínimas necesarias para que funcione como un request real
  (req as any).method = 'POST';
  (req as any).headers = {
    'content-type': 'application/json',
  };

  return req;
}