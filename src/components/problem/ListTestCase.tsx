import TestCaseTable from "@/components/table/TestCaseTable";
import { TestCase } from "@/services/rest/test-case/get-test-case/type";
import { Card, Typography } from "antd";
import "./style.scss";

const { Title } = Typography;

export default function ListTestCase({ testcases, visible = true }: { testcases: TestCase[]; visible?: boolean }) {

  return (
    <Card
      title={visible ? (
        <div className="flex flex-row justify-between items-center">
          <Title level={4} className="!mb-0">
            Testcases
          </Title>
        </div>
      ) : null}
      className="testcase-card"
    >
      <div className="flex flex-col gap-4">
          <TestCaseTable data={testcases} visible={visible} />
      </div>
    </Card>
  );
}
