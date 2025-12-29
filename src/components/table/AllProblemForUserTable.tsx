"use client";
import { difficultyConfig } from "@/app/[locale]/constants";
import useLoadingStore from "@/app/store/loadingStore";
// ExerciseTable.tsx
import { MyProblem } from "@/services/rest/problem/get-my-problems/type";
import {
    CheckCircleFilled,
    ClockCircleFilled,
    CloseCircleFilled,
    FormOutlined,
    SearchOutlined,
    TrophyOutlined,
    WarningFilled
} from "@ant-design/icons";
import { Input, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MotionRow } from "./MotionRow";
import { tableContainerVariants } from "./motion";

type Props = {
  data: MyProblem[];
  basePath?: string;
};

export default function AllProblemForUserTable({
  data,
  basePath = "/admin",
}: Props) {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [searchValue, setSearchValue] = useState<string>("");

  const router = useRouter();
  const startLoading = useLoadingStore((state) => state.startLoading);
  const columns: ColumnsType<MyProblem> = [
    {
      title: "Bài tập",
      dataIndex: "title",
      key: "title",
      render: (text, record) => (
        <span
          className="text-blue-600 hover:underline cursor-pointer"
          onClick={() => {
            startLoading();
            router.push(`${basePath}/${record.problemId}`);
          }}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Mã bài tập",
      dataIndex: "problemCode",
      key: "problemCode",
      className: "text-gray-600",
    },
    {
      title: "Mức độ",
      dataIndex: "difficultyLevel",
      key: "difficultyLevel",
      render: (difficultyLevel: string) => {
        const config = difficultyConfig[difficultyLevel] ?? {
          color: "default",
          label: difficultyLevel,
        };

        return (
          <Tag color={config.color} className="font-medium px-4 py-1">
            <span className="text-base">{config.label}</span>
          </Tag>
        );
      },
    },
    {
      title: "Điểm cao nhất",
      dataIndex: "bestScore",
      key: "bestScore",
      align: "center",
      render: (score: number) => (
        <Tag
          color="green"
          icon={<FormOutlined className="text-xl font-semibold" />}
          className="font-semibold px-3 py-1"
        >
          <span className="text-xl font-semibold">{score}</span>
        </Tag>
      ),
    }, 
    {
      title: "Điểm tối đa",
      dataIndex: "maxScore",
      key: "maxScore",
      align: "right",
      render: (score: number) => (
        <Tag
          color="yellow"
          icon={<TrophyOutlined className="text-xl font-semibold" />}
          className="font-semibold px-3 py-1"
        >
          <span className="text-xl font-semibold">{score}</span>
        </Tag>
      ),
    }, 
    {
      title: "Pass",
      dataIndex: "bestStatus",
      key: "bestStatus",
      render: (status: string) => {
  const map = {
    AC: {
      color: "green",
      icon: <CheckCircleFilled />,
      label: "Accepted",
    },
    WA: {
      color: "red",
      icon: <CloseCircleFilled />,
      label: "Wrong Answer",
    },
    TLE: {
      color: "orange",
      icon: <ClockCircleFilled />,
      label: "Time Limit",
    },
    CE: {
      color: "volcano",
      icon: <WarningFilled />,
      label: "Compile Error",
    },
  } as const;

  const s = map[status as keyof typeof map];

  if (!s) return null;

  return (
    <Tag
      color={s.color}
      className="font-medium px-4 py-1 flex items-center gap-2"
    >
      {s.icon}
      <span className="text-base">{s.label}</span>
    </Tag>
  );
}
    },
  ];


  return (
    <div className="bg-white p-4 rounded-lg flex flex-col gap-3">
      <div className="flex justify-end gap-2">
        <Input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          prefix={<SearchOutlined className="text-gray-400" />}
          className="text-base w-[220px]"
          placeholder="Tìm kiếm"
        />
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          variants={tableContainerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          key={`${page}-${pageSize}`}
          className="w-full"
        >
          <Table
            rowKey="problemId"
            columns={columns}
            dataSource={data}
            components={{
              body: {
                row: MotionRow,
              },
            }}
            pagination={{
              current: page,
              pageSizeOptions: ["5", "10", "20", "50"],
              total: data.length,
              showSizeChanger: true,
              onChange: (p, ps) => {
                setPage(p);
                setPageSize(ps);
              },
            }}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
