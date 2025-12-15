"use client";

import { students } from "@/utils/mockAuth";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Card, Collapse, Typography } from "antd";
import { useTranslations } from "next-intl";
import { useState } from "react";

const { Title, Text } = Typography;
const { Panel } = Collapse;

interface AccountListProps {
  onAccountSelect?: (email: string, password: string) => void;
}

export default function AccountList({ onAccountSelect }: AccountListProps) {
  const [showPasswords, setShowPasswords] = useState(false);
  const t = useTranslations("login.accountList");

  const handleAccountClick = (email: string, password: string) => {
    if (onAccountSelect) {
      onAccountSelect(email, password);
    }
  };

  return (
    <div style={{ marginTop: "24px" }}>
      <Collapse ghost>
        <Panel
          header={
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Text type="secondary" style={{ fontSize: "13px" }}>
                {t("title", { count: students.length })}
              </Text>
            </div>
          }
          key="1"
        >
          <Card size="small" style={{ marginTop: "8px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "12px",
              }}
            >
              <Title level={5} style={{ margin: 0, fontSize: "14px" }}>
                {t("testAccountsTitle")}
              </Title>
              <Button
                size="small"
                type="text"
                icon={
                  showPasswords ? <EyeInvisibleOutlined /> : <EyeOutlined />
                }
                onClick={() => setShowPasswords(!showPasswords)}
              >
                {showPasswords ? t("hidePassword") : t("showPassword")}
              </Button>
            </div>

            <div style={{ display: "grid", gap: "8px" }}>
              {students.map((student, index) => (
                <div
                  key={index}
                  style={{
                    padding: "8px 12px",
                    border: "1px solid #f0f0f0",
                    borderRadius: "6px",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    backgroundColor: "#fafafa",
                  }}
                  onClick={() =>
                    handleAccountClick(student.email, student.password)
                  }
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#e6f7ff";
                    e.currentTarget.style.borderColor = "#1890ff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#fafafa";
                    e.currentTarget.style.borderColor = "#f0f0f0";
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <Text
                        strong
                        style={{ color: "#1890ff", fontSize: "12px" }}
                      >
                        {student.studentId.toUpperCase()}
                      </Text>
                      <br />
                      <Text style={{ fontSize: "11px", color: "#666" }}>
                        {student.email}
                      </Text>
                    </div>
                    {showPasswords && (
                      <Text code style={{ fontSize: "11px" }}>
                        {student.password}
                      </Text>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: "12px",
                padding: "8px",
                backgroundColor: "#f6ffed",
                borderRadius: "4px",
              }}
            >
              <Text style={{ fontSize: "11px", color: "#52c41a" }}>
                {t("clickToFill")}
              </Text>
            </div>
          </Card>
        </Panel>
      </Collapse>
    </div>
  );
}
