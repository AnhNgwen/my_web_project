"use client";
import { Typography } from "antd";
import ChallengeProblemCard from "./components/ChallengeProblemCard";
import PopularKeywordsCard from "./components/PopularKeywordsCard";
import StatCard from "./components/StartCard";
import "./style.scss";

const { Title, Text } = Typography;

export default function UserHomePage() {
  return (
    <div className="home__page">
      <div className="flex flex-col h-screen p-2 gap-4 overflow-y-auto no__scroll__width">
        <div className="flex flex-col items-center">
          <Title level={2} style={{ color: "rgb(174, 29, 44)" }}>
            HUSTack
          </Title>
          <Text className="text-base">
            Empower your programming journey and solve real-world problems
          </Text>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 items-center justify-between">
          <StatCard title="problems" number={1500} />
          <StatCard title="contests" number={1000} />
          <StatCard title="users" number={15000} />
          <StatCard title="submissions" number={1500000} />
        </div>

        <div className="grid grid-cols-3 gap-2 items-start">
          <div className="grid col-span-2">
            <ChallengeProblemCard />
          </div>
          <div className="grid col-span-1">
            <PopularKeywordsCard />
          </div>
        </div>
      </div>
    </div>
  );
}
