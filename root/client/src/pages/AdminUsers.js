import React from "react";
import { Container } from "react-bootstrap";
import AuthLayout from "../components/AuthLayout/AuthLayout";
import UsersTable from "../components/UsersTable";

function AdminUsers() {
  return (
    <AuthLayout>
      <div>
        <Container className="admin-table rounded p-4 mt-5">
          <h2>Users</h2>
          <UsersTable />
        </Container>
      </div>
    </AuthLayout>
  );
}

export default AdminUsers;
