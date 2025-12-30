import UserTable from "@/components/table/UserTable";
import { useListUser } from "@/hook/auth/useListUser";
import "./style.scss";

export default function AdminManagementMock() {
  const { listUser } = useListUser();

  console.log(listUser);

  return (
    <div className="p-6 w-full mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Admin Management</h1>
      <UserTable data={listUser} />
    </div>
  );
}
