import { Button, Typography } from "antd";
import React, { SetStateAction } from "react";

const { Title, Text } = Typography;

type Props = {
  code: string;
  setCode: React.Dispatch<SetStateAction<string>>;
  language: string;
  setLanguage: React.Dispatch<SetStateAction<string>>;
  CODE_TEMPLATES: {
    cpp: string;
    js: string;
    python: string;
  };
};

export function CodeEditor({
  code,
  setCode,
  language,
  setLanguage,
  CODE_TEMPLATES,
}: Props) {
  return (
    <>
      <Title level={5}>Mã nguồn</Title>

      {/* Language selector */}
      <select
        value={language}
        onChange={(e) => {
          const lang = e.target.value as "cpp" | "js" | "python";
          setLanguage(lang);
          setCode(CODE_TEMPLATES[lang]);
        }}
        className="mb-3 w-48 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="cpp">C++</option>
        <option value="js">JavaScript</option>
        <option value="python">Python</option>
      </select>

      {/* Editor */}
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        spellCheck={false}
        className="w-full min-h-[280px] rounded-xl bg-gray-900 text-gray-100 font-mono text-sm p-4 leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500"
        onKeyDown={(e) => {
          if (e.key === "Tab") {
            e.preventDefault();
            const start = e.currentTarget.selectionStart;
            const end = e.currentTarget.selectionEnd;

            const newCode = code.slice(0, start) + "    " + code.slice(end);

            setCode(newCode);

            requestAnimationFrame(() => {
              e.currentTarget.selectionStart = e.currentTarget.selectionEnd =
                start + 4;
            });
          }
        }}
      />

      <div className="flex justify-between items-center gap-2">
        <div>
          <Text type="secondary" className="text-xs">
            Editor cơ bản: đổi ngôn ngữ, Tab để indent, chưa compile.
          </Text>
        </div>

        <div>
          <Button type="primary" htmlType="submit" className="!shadow-none">
            Nộp bài
          </Button>
        </div>
      </div>
    </>
  );
}
