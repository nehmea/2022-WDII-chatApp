import React from "react";
import AuthLayout from "../components/AuthLayout/AuthLayout";
import UsersTable from "../components/UsersTable";

function AdminUsers() {
  return (
    <AuthLayout>
      <div>
        <h2>Users</h2>
        <UsersTable />
      </div>
    </AuthLayout>
  );
}

export default AdminUsers;
