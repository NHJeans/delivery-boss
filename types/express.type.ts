// Request를 확장해서 CustomRequest라는 인터페이스를 쓰겠다!

export interface CustomRequest extends Request {
  user: {
    userId: number;
  };
}
