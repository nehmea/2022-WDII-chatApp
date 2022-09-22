import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import { fetchAllUsers } from "../helpers/Utils";
import parse from "html-react-parser";
import { deleteUser } from "../helpers/Utils";
import WarningAlert from "./WarningAlert";

function UsersTable() {
  const [listOfUsers, setListOfUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const handleClose = () => {
    setShow(false);
    setUserToDelete(null);
  };
  const handleShow = (userId) => {
    setShow(true);
    setUserToDelete(userId);
  };

  const onHide = () => {
    deleteUser({
      userId: userToDelete,
      setListOfUsers: setListOfUsers,
    });
    setShow(false);
    setUserToDelete(null);
  };

  useEffect(() => {
    fetchAllUsers({ setListOfUsers });
  }, []);

  return (
    <div>
      {console.log(listOfUsers)}
      <Table striped>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Role</th>
            <th>Bio</th>
            <th>Avatar URL</th>
            <th>Status</th>
            <th>Created On</th>
            <th>Last Modified</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {listOfUsers.map((user, index) => {
            return (
              <tr key={index}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.role}</td>
                <td>{parse(user.bio)}</td>
                <td>{user.avatarUrl}</td>
                <td>{user.status}</td>
                <td>{user.createdAt}</td>
                <td>{user.updatedAt}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={
                      () => {
                        handleShow(user.id);
                      }

                      //   deleteUser({
                      //     userId: user.id,
                      //     setListOfUsers: setListOfUsers,
                      //   });
                    }
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <WarningAlert
        text="Are you sure you want to delete this user?"
        show={show}
        handleClose={handleClose}
        onHide={onHide}
      />
    </div>
  );
}

export default UsersTable;
