"use client";
import ConfirmModal from "@/components/form/ConfirmModal";
import CustomUploadFile from "@/components/form/CustomUploadFile";
import FormHeader from "@/components/form/FormHeader";
import { Card, Divider, Tag, Typography, UploadFile } from "antd";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CodeEditor } from "./components/CodeEditor";
import SubmissionTable from "./components/SubmissionTable";

const { Title, Text, Paragraph } = Typography;

const CODE_TEMPLATES = {
  cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    cin >> n;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];

    // Your code here

    return 0;
}
`,
  js: `const fs = require('fs');

const input = fs.readFileSync(0, 'utf8').trim().split(/\\s+/);
let idx = 0;

const n = Number(input[idx++]);
const a = [];
for (let i = 0; i < n; i++) a.push(Number(input[idx++]));

// Your code here
`,
  python: `import sys

data = list(map(int, sys.stdin.read().split()))
idx = 0
n = data[idx]; idx += 1
a = data[idx:idx+n]

# Your code here
`,
};

export default function AssignmentPage({ params }: { params: { id: string } }) {
  const { id } = params;
  console.log(id);

  const t = useTranslations("sidebar");
  const router = useRouter();

  const [language, setLanguage] = useState<string>("cpp");
  const [code, setCode] = useState<string>(CODE_TEMPLATES.cpp);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [confirmModalLink, setConfirmModalLink] = useState<string>("#");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("===== SUBMIT CODE =====");
    console.log("Language:");
    console.log("Code:");
    console.log("File:");
  };

  const breadCrumbs = [
    {
      label: t("home"),
      link: "/user/home",
    },
    {
      label: t("programmingContests"),
      link: "/user/contests",
    },
    {
      label: "Class",
      link: "/user/contests/detail/1",
    },
    {
      label: "Current Assignment",
      link: "#",
    },
  ];

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormHeader
          setOpenDialog={setOpenDialog}
          title="Assignment"
          breadcrumbs={breadCrumbs}
          setConfirmModalLink={setConfirmModalLink}
          publicButtonTitle="Submit"
        />
        <Card
          className="max-w-4xl mx-auto rounded-2xl shadow-md"
          bodyStyle={{ padding: 24 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <Tag color="green" className="px-3 py-1 rounded-full">
              Dễ
            </Tag>
          </div>

          {/* Description */}
          <Title level={4}>Count Equal Pairs</Title>
          <Paragraph className="text-gray-700">
            Given a sequence of <Text strong>n</Text> integers a[1], a[2], ...,
            a[n]. Count the number <Text strong>Q</Text> of pairs of indices
            <Text code>1 ≤ i &lt; j ≤ n</Text> such that{" "}
            <Text code>a[i] = a[j]</Text>.
          </Paragraph>

          <Divider />

          {/* Input */}
          <Title level={5}>Input</Title>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li>Line 1: positive integer n (1 ≤ n ≤ 100000)</li>
            <li>Line 2: n integers a[i] (1 ≤ a[i] ≤ 100000)</li>
          </ul>

          {/* Output */}
          <Title level={5} className="mt-4">
            Output
          </Title>
          <Paragraph className="text-gray-700">
            Write the value <Text strong>Q</Text> modulo{" "}
            <Text code>10^9 + 7</Text>.
          </Paragraph>

          <Divider />

          {/* Example */}
          <Title level={5}>Example</Title>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-900 text-gray-100 rounded-xl p-4 text-sm">
              <div className="font-semibold mb-2">Input</div>
              <pre className="whitespace-pre-wrap">6 1 2 2 1 3 1</pre>
            </div>
            <div className="bg-gray-900 text-gray-100 rounded-xl p-4 text-sm">
              <div className="font-semibold mb-2">Output</div>
              <pre>4</pre>
            </div>
          </div>

          <Divider />

          {/* Source code placeholder */}
          <div className="flex flex-col gap-3">
            <CodeEditor
              code={code}
              setCode={setCode}
              language={language}
              setLanguage={setLanguage}
              CODE_TEMPLATES={CODE_TEMPLATES}
            />
            <CustomUploadFile
              fileList={fileList}
              setFileList={setFileList}
              label="Select or drag your file code in here: "
            />
          </div>
          <Divider />
          <SubmissionTable />
        </Card>
      </form>
      <ConfirmModal
        open={openDialog}
        onOk={() => router.replace(confirmModalLink)}
        onCancel={() => setOpenDialog(false)}
      />
    </>
  );
}
