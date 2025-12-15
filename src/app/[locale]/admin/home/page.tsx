"use client";
import {
  mockExercises,
  mockExercisesAllOff,
  mockExercisesAllOn,
} from "@/data/mock";
import { Tabs } from "antd";
import { useState } from "react";
import AllProblemTable from "../components/AllProblemTable";
import "./style.scss";

export default function AdminHomePage() {
  const [activeTab, setActiveTab] = useState<string>("1");

  return (
    <div className="p-4">
      <Tabs
        activeKey={activeTab}
        onChange={(key) => setActiveTab(key)}
        className="custom__search__tabs"
      >
        <Tabs.TabPane key="1" tab="All Problems">
          <AllProblemTable data={mockExercises} />
        </Tabs.TabPane>
        <Tabs.TabPane key="2" tab="Public Problems">
          <AllProblemTable data={mockExercisesAllOn} />
        </Tabs.TabPane>
        <Tabs.TabPane key="3" tab="Draft Problems">
          <AllProblemTable data={mockExercisesAllOff} />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}
