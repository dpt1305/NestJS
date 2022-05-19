export interface Message<T> {
  statusCode: number;
  message: string;
  data: T;
}
