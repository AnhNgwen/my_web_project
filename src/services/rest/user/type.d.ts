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

export interface UpdateRoleRequest {
  username: string;
  role: 'ADMIN' | 'USER';
  action: 'GRANT' | 'REVOKE';
}
