export const difficultyConfig: Record<
  string,
  { color: string; label: string }
> = {
  EASY: { color: "green", label: "Dễ" },
  MEDIUM: { color: "gold", label: "Trung bình" },
  HARD: { color: "red", label: "Khó" },
};
export const difficultyOptions = [
  { value: "EASY", label: "Easy" },
  { value: "MEDIUM", label: "Medium" },
  { value: "HARD", label: "Hard" },
];