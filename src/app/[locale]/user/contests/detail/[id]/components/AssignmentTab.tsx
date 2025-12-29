import RouteLoading from "@/components/shared/RouteLoading";
import AllProblemForUserTable from "@/components/table/AllProblemForUserTable";
import { useListActiveProblem } from "@/hook/problem/useActiveProblem";
import { Card } from "antd";
import "../../../style.scss";

export default function AssignmentTab() {


  const { listActiveProblem } = useListActiveProblem("http://localhost:8080/problems");

  if (!listActiveProblem) return <RouteLoading />;

  return (  
    <Card>
        <AllProblemForUserTable data={listActiveProblem || []} basePath="/user/contests/assignment/"/>
    </Card>
  );
}
