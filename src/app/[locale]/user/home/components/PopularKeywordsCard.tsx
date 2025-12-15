import { Card, Typography } from "antd";

const { Title } = Typography;

const keywords = [
  { label: "Networking", color: "text-red-500", size: "text-sm" },
  { label: "Divide & Conquer", color: "text-gray-500", size: "text-lg" },
  { label: "SelectionSort", color: "text-green-600", size: "text-base" },
  { label: "Backtracking", color: "text-purple-500", size: "text-lg" },
  { label: "Software Development", color: "text-red-600", size: "text-xl" },
  { label: "Probability", color: "text-red-500", size: "text-base" },
  { label: "Complexity", color: "text-orange-500", size: "text-xl" },
  { label: "Database", color: "text-cyan-500", size: "text-base" },
  { label: "Graph", color: "text-purple-400", size: "text-base" },
  { label: "Discrete Math", color: "text-cyan-500", size: "text-xl" },
  { label: "NP-hard", color: "text-purple-500", size: "text-lg" },
  { label: "Greedy", color: "text-orange-400", size: "text-lg" },
  { label: "Tree", color: "text-lime-500", size: "text-xl" },
  { label: "DFS", color: "text-cyan-500", size: "text-base" },
  { label: "Dijkstra", color: "text-orange-500", size: "text-sm" },
  { label: "Heap", color: "text-green-600", size: "text-base" },
  { label: "Shortest Path", color: "text-gray-600", size: "text-xl" },
  { label: "C++", color: "text-amber-700", size: "text-lg" },
  { label: "BFS", color: "text-pink-500", size: "text-base" },
  { label: "Sorting", color: "text-green-600", size: "text-xl" },
  { label: "Hashing", color: "text-pink-400", size: "text-lg" },
  { label: "Searching", color: "text-orange-500", size: "text-xl" },
  { label: "Dynamic Programming", color: "text-green-700", size: "text-xl" },
  { label: "Python", color: "text-blue-600", size: "text-lg" },
  { label: "Java", color: "text-purple-600", size: "text-lg" },
  { label: "OOP", color: "text-sky-600", size: "text-lg" },
  { label: "Binary Tree", color: "text-orange-500", size: "text-lg" },
  { label: "Data Structures", color: "text-blue-600", size: "text-2xl" },
  { label: "Optimization", color: "text-red-600", size: "text-xl" },
  { label: "Array", color: "text-pink-400", size: "text-lg" },
  { label: "Tree Traversal", color: "text-gray-600", size: "text-lg" },
  { label: "MergeSort", color: "text-red-600", size: "text-base" },
  { label: "QuickSort", color: "text-lime-600", size: "text-base" },
  { label: "Stack", color: "text-gray-700", size: "text-lg" },
  { label: "Linked List", color: "text-sky-600", size: "text-lg" },
];

export default function PopularKeywordsCard() {
  return (
    <Card className="rounded-2xl shadow-lg" bodyStyle={{ padding: 24 }}>
      <Title level={4} className="!mb-4 text-sky-600">
        Popular Keywords
      </Title>

      <div className="flex flex-wrap gap-x-4 gap-y-2 leading-snug">
        {keywords.map((item) => (
          <span
            key={item.label}
            className={`${item.color} ${item.size} font-medium cursor-pointer hover:opacity-80 transition`}
          >
            {item.label}
          </span>
        ))}
      </div>
    </Card>
  );
}
