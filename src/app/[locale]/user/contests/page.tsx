"use client";
import { Tabs } from "antd";
import { useState } from "react";
import PublicContestTab from "./components/PublicContestTab";
import PublicRegistedTab from "./components/PublicRegistedTab";
import "./style.scss";

export default function ContestPage() {
  const [activeTab, setActiveTab] = useState<string>("1");

  return (
    <div className="p-4">
      <Tabs
        activeKey={activeTab}
        onChange={(key) => setActiveTab(key)}
        className="custom__search__tabs"
      >
        <Tabs.TabPane key="1" tab="Công khai">
          <PublicContestTab />
        </Tabs.TabPane>
        <Tabs.TabPane key="2" tab="Đã đăng ký">
          <PublicRegistedTab />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}
