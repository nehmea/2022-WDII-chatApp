import React from "react";

function ActiveChannelUsers({ activeChannelUsers }) {
  return (
    <div>
      <h1> Channel Users</h1>
      {activeChannelUsers.map((user, index) => {
        return (
          <div key={user.id}>
            <p>{user.username}</p>
          </div>
        );
      })}
    </div>
  );
}

export default ActiveChannelUsers;
