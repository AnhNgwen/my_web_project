"use client";

import { Divider, Modal, Typography } from "antd";
import CodeBlock from "./CodeBlock";

const { Text } = Typography;

type ResultModalProps = {
  open: boolean;
  onClose: () => void;
  input: string;
  output: string;
  expectedOutput: string;
};

export default function ResultModal({
  open,
  onClose,
  input,
  output,
  expectedOutput,
}: ResultModalProps) {
  return (
    <Modal
    centered
      open={open}
      onCancel={onClose}
      footer={null}
      width={900}
      title={<span className="text-2xl font-semibold">Xem chi tiết</span>}
    >
      <Divider style={{borderWidth: 2, borderColor: '#E5E7EB'}}/>
      <div className="space-y-4">
        {/* Outputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <Text strong>Kết quả mong muốn</Text>
            <CodeBlock value={expectedOutput} />
          </div>

          <div className="flex flex-col gap-2">
            <Text strong>Kết quả thực tế</Text>
            <CodeBlock value={output || '--'} />
          </div>
        </div>

        {/* Input */}
        <div className="flex flex-col gap-2">
          <Text strong>Đầu vào</Text>
          <CodeBlock value={input} />
        </div>
      </div>
    </Modal>
  );
}
