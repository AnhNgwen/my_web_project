interface RegisterTypes {
  username: string;
  password: string;
  confirmPassword: string;
}

interface RegisterResponseTypes {
  username: string;
  jwtToken: string;
  role: string;
  message: string;
}

interface LoginTypes {
  username: string;
  password: string;
}

export interface User {
  username: string;
  role: 'ADMIN' | 'USER';
}

export interface ListUserResponse {
  content: User[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
  first: boolean;
}