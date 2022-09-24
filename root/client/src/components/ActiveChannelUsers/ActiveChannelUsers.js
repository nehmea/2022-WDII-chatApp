import React from "react";
import './ActiveChannelUsers.css'

function ActiveChannelUsers({ activeChannelUsers }) {
  return (
    <div className="d-flex flex-column m-2">
      <h2>Member List</h2>
      {activeChannelUsers.map((user, index) => {
        return (
          <div key={user.id}>
            <div className="active-channel-user d-flex align-items-center py-1 m-1 rounded">
              <div className="position-relative">
                <img
                  alt="user avatar"
                  src={user.avatarUrl}
                  width="45"
                  height="45"
                  className="rounded-circle avatar me-3"
                />

                {user.status === "online" ?
                  <div className="rounded-circle position-absolute status-icon online-green"></div>
                  :
                  user.status === "busy" ?
                    <div className="rounded-circle position-absolute status-icon busy-red"></div>
                    :
                    <div className="rounded-circle position-absolute status-icon offline-empty"></div>

                }
              </div>
              <p className="m-0">{user.username}</p>

            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ActiveChannelUsers;
