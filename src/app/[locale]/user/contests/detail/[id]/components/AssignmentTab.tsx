import { Exercise, exerciseTableData } from "@/data/mock";
import { formatNumberSpace } from "@/utils/format";
import { SearchOutlined } from "@ant-design/icons";
import { Card, Input, Table, Typography } from "antd";
import Link from "next/link";
import { useState } from "react";

const { Text } = Typography;

export default function AssignmentTab() {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [searchValue, setSearchValue] = useState<string>("");

  console.log(pageSize);

  const exerciseTableColumns = [
    {
      title: "Bài tập",
      dataIndex: "title",
      key: "title",
      sorter: (a: Exercise, b: Exercise) => a.title.localeCompare(b.title),
      render: (text: string) => (
        <Link
          href="/user/contests/assignment/1"
          className="text-blue-600 hover:underline"
        >
          {text}
        </Link>
      ),
    },
    {
      title: "Mã bài tập",
      dataIndex: "code",
      key: "code",
      sorter: (a: Exercise, b: Exercise) => a.code.localeCompare(b.code),
    },
    {
      title: "Mức độ",
      dataIndex: "level",
      key: "level",
      sorter: (a: Exercise, b: Exercise) => a.level.localeCompare(b.level),
    },
    {
      title: "Điểm đạt được",
      dataIndex: "score",
      key: "score",
      sorter: (a: Exercise, b: Exercise) => a.score - b.score,
    },
    {
      title: "Điểm tối đa",
      dataIndex: "maxScore",
      key: "maxScore",
      sorter: (a: Exercise, b: Exercise) => a.maxScore - b.maxScore,
    },
    {
      title: "Hoàn thành",
      dataIndex: "completed",
      key: "completed",
      sorter: (a: Exercise, b: Exercise) =>
        a.completed.localeCompare(b.completed),
    },
  ];

  return (
    <Card>
      <div className="flex flex-col gap-3">
        <div>
          <Text className="!text-red-500 text-base">
            Điểm đạt được: 0 / Điểm tối đa: {formatNumberSpace(3500)}
          </Text>
        </div>
        <div className="flex justify-end">
          <Input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            prefix={<SearchOutlined className="text-gray-400" />}
            className="text-base w-[220px]"
            placeholder="Tìm kiếm"
          />
        </div>

        <Table
          dataSource={exerciseTableData}
          columns={exerciseTableColumns}
          pagination={{
            current: page,
            pageSizeOptions: ["5", "10", "20", "50"],
            total: exerciseTableData.length,
            showSizeChanger: true,
            onChange: (page, pageSize) => {
              setPage(page);
              setPageSize(pageSize);
            },
          }}
        />
      </div>
    </Card>
  );
}
