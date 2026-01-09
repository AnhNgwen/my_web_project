export interface Admin{
    userId: string;
    username: string;
    role: string;
}

export interface ListAdminResponse {
    content: Admin[];
    totalElements: number;
    pageNumber: number;
    pageSize: number;
    totalPages: number;
}