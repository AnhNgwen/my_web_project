import { Submission, submissions } from "@/data/mock";
import { CheckOutlined, ReloadOutlined } from "@ant-design/icons";
import { Button, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useState } from "react";

export default function SubmissionTable() {
  const [data, setData] = useState<Submission[]>(submissions);
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    setLoading(true);
    // fake fetch
    setTimeout(() => {
      setData(submissions);
      setLoading(false);
    }, 500);
  };

  const columns: ColumnsType<Submission> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (id) => (
        <a style={{ color: "#722ed1", fontWeight: 500 }}>
          {id.toString().padStart(6, "0")}
        </a>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        if (status === "Hoàn thành") {
          return <Tag color="green">Accepted</Tag>;
        }
        return <Tag color="orange">Partial</Tag>;
      },
    },
    {
      title: "Điểm",
      dataIndex: "score",
      key: "score",
      render: (score) => (score !== null ? score : "--"),
    },
    {
      title: "Đạt",
      key: "passed",
      render: (_, record) =>
        record.score !== null ? (
          <span>{record.passed ? "6 / 6" : "5 / 6"}</span>
        ) : (
          "--"
        ),
    },
    {
      title: "Ngôn ngữ",
      dataIndex: "language",
      key: "language",
    },
    {
      title: "Thời gian tạo",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Bài nộp cuối",
      key: "last",
      align: "center",
      render: (_, record) =>
        record.passed ? (
          <CheckOutlined style={{ color: "green", fontSize: 18 }} />
        ) : (
          <span
            style={{
              border: "1px solid #d9d9d9",
              width: 16,
              height: 16,
              display: "inline-block",
            }}
          />
        ),
    },
  ];

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <h3 style={{ margin: 0 }}>Bài nộp</h3>
        <Button
          type="primary"
          icon={<ReloadOutlined />}
          onClick={fetchData}
          loading={loading}
          className="!shadow-none"
        >
          Làm mới
        </Button>
      </div>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={false}
      />
    </div>
  );
}
