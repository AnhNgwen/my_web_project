"use client";
import { Tabs } from "antd";
import { useState } from "react";
import "../../style.scss";
import AssignmentTab from "./components/AssignmentTab";
import SubmittedTab from "./components/SubmittedTab";

export default function ContestDetail({ params }: { params: { id: string } }) {
  const { id } = params;
  const [activeTab, setActiveTab] = useState<string>("1");

  console.log(id);

  return (
    <div className="p-4">
      <Tabs
        activeKey={activeTab}
        onChange={(key) => setActiveTab(key)}
        className="custom__search__tabs"
      >
        <Tabs.TabPane key="1" tab="Bài tập">
          <AssignmentTab />
        </Tabs.TabPane>
        <Tabs.TabPane key="2" tab="Bài nộp">
          <SubmittedTab />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}
