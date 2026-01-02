export interface Submission{
   submissionId: number;
   status: string;
   passedTestcases: number;
   totalTestcases: number;
   executionTime: number;
   memoryUsed: number;
   selected: boolean;
}

export interface ListSubmissionResponse {
    content: Submission[];
    pageNumber: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
    last: boolean;
    first: boolean;
}