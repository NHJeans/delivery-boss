// auth.interface.ts
export interface GoogleRequest {
  user: {
    email: string;
    firstName: string;
    lastName: string;
    photo: string;
  };
}

export interface GoogleLoginAuthOutputDto {
  ok: boolean;
  error?: string;
  accessToken?: string;
}
