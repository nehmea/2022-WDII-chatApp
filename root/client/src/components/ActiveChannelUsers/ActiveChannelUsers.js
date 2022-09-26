import React, { useContext } from "react";
import { AuthContext } from "../../helpers/AuthContext";
import "./ActiveChannelUsers.css";

function ActiveChannelUsers({ activeChannelUsers }) {
  const { authState } = useContext(AuthContext);
  return (
    <>
      {/* Header */}
      <div className='home-nav-header channel-users-nav p-2'>
        {/* <div className="position-relative">
          <img
            alt="user avatar"
            src={user.avatarUrl}
            width="45"
            height="45"
            className="rounded-circle avatar me-3"
          />

          {user.status === "online" ? (
            <div className="rounded-circle position-absolute status-icon online-green"></div>
          ) : user.status === "busy" ? (
            <div className="rounded-circle position-absolute status-icon busy-red"></div>
          ) : (
            <div className="rounded-circle position-absolute status-icon offline-empty"></div>
          )}
        </div>*/}
      </div>
      <div className="d-flex flex-column m-2">
        <h2>Member List</h2>
        {activeChannelUsers.map((user, index) => {
          return (
            <div key={user.id}>
              <div className="active-channel-user d-flex align-items-center p-1 m-1 rounded">
                <div className="position-relative">
                  <img
                    alt="user avatar"
                    src={user.avatarUrl}
                    width="45"
                    height="45"
                    className="rounded-circle avatar me-3"
                  />

                  {user.status === "online" ? (
                    <div className="rounded-circle position-absolute status-icon online-green"></div>
                  ) : user.status === "busy" ? (
                    <div className="rounded-circle position-absolute status-icon busy-red"></div>
                  ) : (
                    <div className="rounded-circle position-absolute status-icon offline-empty"></div>
                  )}
                </div>
                <p className="m-0">{user.username}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default ActiveChannelUsers;
