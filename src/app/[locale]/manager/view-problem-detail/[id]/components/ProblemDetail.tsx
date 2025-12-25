"use client";
import useLoadingStore from "@/app/store/loadingStore";
import PublishButton from "@/components/shared/Button/FormHeader/PublishButton";
import { ProblemDetail } from "@/services/rest/problem/getProlemDetail/type";
import { TestCase } from "@/services/rest/test-case/get-test-case/type";
import {
  ClockCircleOutlined,
  DatabaseOutlined,
  EditOutlined,
  EyeOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { Card, Table } from "antd";
import { useRouter } from "next/navigation";

type Props = {
  testCases: TestCase[];
  data: ProblemDetail;
};

export default function ProblemDetailPage({ testCases, data }: Props) {
  const sampleColumns = [
    { title: "Input", dataIndex: "input", key: "input" },
    { title: "Output", dataIndex: "output", key: "output" },
  ];

  const testCaseColumns = [
    { title: "Input", dataIndex: "input", key: "input" },
    { title: "Output", dataIndex: "output", key: "output" },
    { title: "Score", dataIndex: "score", key: "score" },
  ];

  const sampleData = testCases.filter((item) => item.is_sample);

  const startLoading = useLoadingStore((state) => state.startLoading);

  const router = useRouter();

  return (
    <>
      <div className="p-6 space-y-6">
        <Card
          extra={
            <PublishButton
              title="Edit button"
              Icon={EditOutlined}
              onClick={() => {
                startLoading();
                router.push(`/manager/edit-problem/${data.problemId}`);
              }}
            />
          }
          className="p-6 rounded-2xl shadow-sm border"
        >
          <div className="flex flex-row justify-between">
            <h1 className="text-xl font-semibold mb-2 flex">
              <span className="text-2xl font-semibold mb-2">
                Problem Title: {data.title}
              </span>
            </h1>
          </div>
          <div className="flex items-center gap-4 text-gray-600 mb-4">
            <span className="font-medium text-base">Difficulty:</span>
            {data.difficultyLevel && (
              <span
                className={
                  data.difficultyLevel === "EASY"
                    ? "text-green-600 text-lg font-semibold"
                    : data.difficultyLevel === "HARD"
                    ? "text-red-600 text-lg font-semibold"
                    : "text-orange-500 text-lg font-semibold"
                }
              >
                {data.difficultyLevel}
              </span>
            )}
          </div>
          {/* <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="font-medium text-gray-600 mr-2">Tags:</span>
            {data.tags.map((tag, index) => (
              <Tag key={index} color="blue">
                {tag}
              </Tag>
            ))}
          </div> */}
          <div className="flex gap-6 mb-4 text-gray-700">
            <div className="flex flex-row gap-2 items-center">
              <span className="font-medium text-base">Visibility:</span>{" "}
              <span
                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold
                        ${
                          data.active
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
              >
                {data.active ? <EyeOutlined /> : <LockOutlined />}
                {data.active ? "Public" : "Private"}
              </span>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-sm font-medium">
                <ClockCircleOutlined />
                <span>Time Limit:</span>
                <span className="font-semibold">{data.timeLimit} ms</span>
              </div>

              <div className="flex items-center gap-2 bg-purple-50 text-purple-700 px-3 py-1.5 rounded-full text-sm font-medium">
                <DatabaseOutlined />
                <span>Memory Limit:</span>
                <span className="font-semibold">{data.memoryLimit} MB</span>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <div
              dangerouslySetInnerHTML={{
                __html: data.description || "(No description)",
              }}
              className="text-gray-700 whitespace-pre-wrap product-content-html"
            />
          </div>
        </Card>

        {/* Samples */}
        <Card className="p-6 rounded-2xl shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">Sample Tests</h2>
          <Table
            dataSource={sampleData}
            columns={sampleColumns}
            pagination={false}
          />
        </Card>

        {/* Test Cases */}
        <Card className="p-6 rounded-2xl shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">Test Cases</h2>
          <Table
            dataSource={testCases}
            columns={testCaseColumns}
            pagination={false}
          />
        </Card>
      </div>
    </>
  );
}

// Example usage:
// <ProblemDetailPage problem={DATA_FROM_API} />
