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
      <Table striped bordered hover responsive variant="dark" className="mt-3">
        <thead className="text-center">
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Role</th>
            <th>Bio</th>
            <th>Avatar</th>
            <th>Status</th>
            <th>Created On</th>
            <th>Last Modified</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {listOfUsers.map((user, index) => {
            return (
              <tr key={index}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.role}</td>
                <td>{parse(user.bio)}</td>
                {/* <td>{user.avatarUrl}</td> */}
                <td>
                  {user.avatarUrl ?
                    <>
                      <img
                        alt="user avatar"
                        src={user.avatarUrl}
                        width="35"
                        height="35"
                        className="rounded-circle avatar"
                      />
                    </>
                    :
                    "None"
                  }

                </td>
                <td>{user.status}</td>
                <td>{user.createdAt.split('T')[0]}</td>
                <td>{user.updatedAt.split('T')[0]}</td>
                <td
                  className="pointer"
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
                  <i class="bi bi-trash"></i>

                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <WarningAlert
        text="You're about to permanently delete a user."
        show={show}
        handleClose={handleClose}
        onHide={onHide}
      />
    </div>
  );
}

export default UsersTable;
