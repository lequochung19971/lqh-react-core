export class HttpClientErrorModel extends Error {
  constructor(public message: string, public code: string) {
    super(message);
  }
}
