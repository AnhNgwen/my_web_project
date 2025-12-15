"use client";

import { Spin } from "antd";
import React from "react";

interface RouteLoadingProps {
  message?: string;
}

const RouteLoading: React.FC<RouteLoadingProps> = ({
  message = "Đang tải nội dung, vui lòng chờ...",
}) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F5F8FD]">
      <div className="flex flex-col items-center gap-3 rounded-lg bg-white px-6 py-5 shadow">
        <Spin size="large" />
        <span className="text-sm text-gray-600">{message}</span>
      </div>
    </div>
  );
};

export default RouteLoading;
