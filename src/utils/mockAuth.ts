// Mock authentication data
export interface Student {
  email: string;
  password: string;
  studentId: string;
  name: string;
}

export const students: Student[] = [
  {
    email: "sv001@university.edu.vn",
    password: "Qwerty123456",
    studentId: "SV001",
    name: "Nguyễn Văn An",
  },
  {
    email: "sv002@university.edu.vn",
    password: "Qwerty123456",
    studentId: "SV002",
    name: "Trần Thị Bình",
  },
  {
    email: "sv003@university.edu.vn",
    password: "Qwerty123456",
    studentId: "SV003",
    name: "Lê Hoàng Cường",
  },
  {
    email: "sv004@university.edu.vn",
    password: "Qwerty123456",
    studentId: "SV004",
    name: "Phạm Minh Đức",
  },
  {
    email: "sv005@university.edu.vn",
    password: "Qwerty123456",
    studentId: "SV005",
    name: "Võ Ngọc Hân",
  },
  {
    email: "sv006@university.edu.vn",
    password: "Qwerty123456",
    studentId: "SV006",
    name: "Đặng Quốc Khánh",
  },
  {
    email: "sv007@university.edu.vn",
    password: "Qwerty123456",
    studentId: "SV007",
    name: "Bùi Thanh Lan",
  },
  {
    email: "sv008@university.edu.vn",
    password: "Qwerty123456",
    studentId: "SV008",
    name: "Ngô Đức Long",
  },
];

// Mock authentication function
export const authenticateUser = (
  email: string,
  password: string
): Student | null => {
  const user = students.find(
    (student) => student.email === email && student.password === password
  );
  return user || null;
};

// Get company info by email
export const getCompanyByEmail = (email: string): Student | null => {
  return students.find((student) => student.email === email) || null;
};
