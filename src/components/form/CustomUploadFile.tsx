import {
  CloseOutlined,
  FileDoneOutlined,
  FileSearchOutlined,
} from "@ant-design/icons";
import { Flex, Form, message, Upload, UploadFile } from "antd";
import { useTranslations } from "next-intl";
import React, { SetStateAction } from "react";

function convertToMb(size: number) {
  return (size / 1024 / 1024).toFixed(2);
}

type CustomUploadFileProps = {
  fileList: UploadFile[];
  setFileList: React.Dispatch<SetStateAction<UploadFile[]>>;
  label?: string;
  readOnly?: boolean;
};

const { Dragger } = Upload;

export default function CustomUploadFile({
  fileList,
  setFileList,
  label,
  readOnly,
}: CustomUploadFileProps) {
  const t = useTranslations("customUploadFile");

  return (
    <div className="flex flex-col gap-2">
      <Form.Item
        label={label && <span className="font-medium text-sm">{label}</span>}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        {fileList.length === 0 ? (
          <Dragger
            name="file"
            listType="text"
            onRemove={(file) => {
              const index = fileList.indexOf(file);
              const newFileList = fileList.slice();
              newFileList.splice(index, 1);
              setFileList(newFileList);
            }}
            onChange={(info) => {
              if (info.file.status !== "removed") {
                message.success(t("add_success", { fileName: info.file.name }));
              }
            }}
            beforeUpload={(file) => {
              const allowExt = /\.(cpp|js|py)$/i;
              const isAllowed = allowExt.test(file.name);
              if (!isAllowed) {
                message.error(t("invalid_type"));
                return Upload.LIST_IGNORE;
              }

              const isUnder10MB = Number(convertToMb(file.size)) < 10;
              if (!isUnder10MB) {
                message.error(t("file_too_large"));
                return Upload.LIST_IGNORE;
              }

              setFileList((prev) => [
                ...prev,
                {
                  uid: file.uid,
                  name: file.name,
                  status: "done",
                  originFileObj: file,
                },
              ]);
              return false;
            }}
          >
            <>
              <p className="ant-upload-drag-icon">
                <FileSearchOutlined />
              </p>
              <p
                className="ant-upload-text"
                style={{ fontWeight: 600, fontSize: 16, color: "#2B6BB2" }}
              >
                {t("select_or_drag")}
              </p>
              <p
                className="ant-upload-hint"
                style={{ fontWeight: 400, fontSize: 14, color: "#5A5A5A" }}
              >
                {t("file_hint")}
              </p>
            </>
          </Dragger>
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "#F5F8FD",
              padding: "8px 12px",
              borderRadius: 6,
              border: "1px solid #d9d9d9",
              width: "100%",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
              <FileDoneOutlined style={{ fontSize: 40, color: "#2B6BB2" }} />
              <Flex vertical gap="1px">
                <span
                  className="text-base font-medium cursor-pointer"
                  onClick={() => {
                    if (fileList[0]?.url) {
                      window.open(fileList[0].url, "_blank");
                    } else {
                      message.error("File không có URL để tải xuống");
                    }
                  }}
                >
                  {fileList[0]?.name}
                </span>

                {fileList[0]?.originFileObj?.size && (
                  <span style={{ fontSize: 16 }}>
                    {`${convertToMb(fileList[0]?.originFileObj?.size)} MB`}
                  </span>
                )}
              </Flex>
            </div>
            {!readOnly && (
              <CloseOutlined
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  setFileList([]);
                }}
                style={{ color: "red", cursor: "pointer", fontSize: 16 }}
              />
            )}
          </div>
        )}
      </Form.Item>
    </div>
  );
}
