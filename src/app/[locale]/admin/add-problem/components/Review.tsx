"use client";

import { ProblemFormValues } from "@/services/rest/add-problem/type.t";
import { Card } from "antd";
import { useFormContext } from "react-hook-form";
import BasicInfoStep from "./BasicInfoStep";
import StatementStep from "./StatementStep";
import TestcaseManager from "./Testcases";

export default function ReviewStep() {
  const { watch } = useFormContext<ProblemFormValues>();
  const values = watch();
  console.log(values);
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Review Problem</h3>

      {/* ===== Basic Info ===== */}
      <Card title="Basic Information" size="small">
        <BasicInfoStep />
      </Card>

      {/* ===== Description ===== */}
      <Card title="Statement" size="small">
        <StatementStep />
      </Card>

      {/* ===== Testcases ===== */}
      <Card title="Test Cases" size="small">
        <TestcaseManager />
      </Card>
      <div>{JSON.stringify(values)}</div>
    </div>
  );
}
