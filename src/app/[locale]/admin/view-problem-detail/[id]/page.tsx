"use client";
import ConfirmModal from "@/components/form/ConfirmModal";
import FormHeader from "@/components/form/FormHeader";
import { problem } from "@/data/mock";
import { Card, Table, Tag } from "antd";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProblemDetailPage() {
  const sampleColumns = [
    { title: "Input", dataIndex: "input", key: "input" },
    { title: "Output", dataIndex: "output", key: "output" },
  ];

  const testCaseColumns = [
    { title: "Input", dataIndex: "input", key: "input" },
    { title: "Output", dataIndex: "output", key: "output" },
    { title: "Score", dataIndex: "score", key: "score" },
  ];

  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [confirmModalLink, setConfirmModalLink] = useState<string>("#");
  const router = useRouter();
  const t = useTranslations("sidebar");

  const breadCrumbs = [
    {
      label: t("home"),
      link: "/admin/home",
    },
    {
      label: "Problem Detail",
      link: "#",
    },
  ];

  return (
    <>
      <FormHeader
        setOpenDialog={setOpenDialog}
        title="Assignment"
        breadcrumbs={breadCrumbs}
        setConfirmModalLink={setConfirmModalLink}
        has_button={false}
      />
      <div className="p-6 space-y-6">
        <Card className="p-6 rounded-2xl shadow-sm border">
          <h1 className="text-xl font-semibold mb-2">
            <span className="text-2xl font-semibold mb-2">Problem Title:</span>{" "}
            {problem.title}
          </h1>
          <div className="flex items-center gap-4 text-gray-600 mb-4">
            <span className="font-medium">Difficulty:</span>
            <span
              className={
                problem.difficulty === "EASY"
                  ? "text-green-600"
                  : problem.difficulty === "HARD"
                  ? "text-red-600"
                  : "text-orange-500"
              }
            >
              {problem.difficulty}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="font-medium text-gray-600 mr-2">Tags:</span>
            {problem.tags.map((tag, index) => (
              <Tag key={index} color="blue">
                {tag}
              </Tag>
            ))}
          </div>
          <div className="flex gap-6 mb-4 text-gray-700">
            <div>
              <span className="font-medium">Visibility:</span>{" "}
              {problem.visibility ? "Public" : "Private"}
            </div>
            <div>
              <span className="font-medium">Time Limit: </span>
              {problem.timeLimit} ms
            </div>
            <div>
              <span className="font-medium">Memory Limit: </span>
              {problem.memoryLimit} MB
            </div>
          </div>

          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-gray-700 whitespace-pre-wrap">
              {problem.description || "(No description)"}
            </p>
          </div>
        </Card>

        {/* Samples */}
        <Card className="p-6 rounded-2xl shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">Sample Tests</h2>
          <Table
            dataSource={problem.samples}
            columns={sampleColumns}
            pagination={false}
          />
        </Card>

        {/* Test Cases */}
        <Card className="p-6 rounded-2xl shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">Test Cases</h2>
          <Table
            dataSource={problem.testCases}
            columns={testCaseColumns}
            pagination={false}
          />
        </Card>
      </div>
      <ConfirmModal
        open={openDialog}
        onOk={() => router.replace(confirmModalLink)}
        onCancel={() => setOpenDialog(false)}
      />
    </>
  );
}

// Example usage:
// <ProblemDetailPage problem={DATA_FROM_API} />
