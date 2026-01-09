export function mapLanguage(language: string) {
  switch (language.toLowerCase()) {
    case "java":
      return "Java";
    case "python":
      return "Python";
    case "cpp":
      return "C++";
    case "c":
      return "C";
    case "py":
      return "Python";
    default:
      return language;
  }
}
