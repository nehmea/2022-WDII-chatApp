import React, { useState } from "react";
import { getCurrentUserInfo } from "../helpers/Utils";
import AuthLayout from "../components/AuthLayout/AuthLayout";
import { Container } from "react-bootstrap";
import parse from "html-react-parser";
import { format, parseISO } from "date-fns";
import { Link } from "react-router-dom";
import { useEffect } from "react";

function UserProfile() {
  //   const [userInfo, setUserInfo] = useState({});
  //   useEffect(() => {
  //     console.log("Hello");
  //   });
  //   getCurrentUserInfo({ setUserInfo });
  //   //   console.log(userInfo);

  //   const createdAt = format(parseISO(userInfo.createdAt), "MMM dd yyyy");
  //   const updatedAt = format(parseISO(userInfo.updatedAt), "MMM dd yyyy hh:mmaa");

  return (
    <AuthLayout>
      {/* {console.log(userInfo)} */}
      <div className="d-flex align-items-center" style={{ height: "100%" }}>
        <Container className="auth-forms rounded p-4">
          <h2>User Profile</h2>
          {/* <h4 className="text-light mb-5 mt-5">
            Username: {userInfo.username}
          </h4>
          <h4 className="text-light">Bio:</h4>
          <p className="fs-6 mb-5">{parse(userInfo.bio)}</p>
          <h4 className="text-light">Avatar Url:</h4>
          <p className="fs-6 mb-5">{userInfo.avatarUrl}</p>
          <h4 className="text-light mb-5">Member Since: {createdAt}</h4>
          <h4 className="text-light">Last Updated: {updatedAt}</h4> */}

          <div className="mt-5">
            <Link to="/profile/edit" className="mx-3">
              <button className="btn btn-outline-light">Edit Profile</button>
            </Link>
            <Link to="/profile/password/edit" className="mx-3">
              <button className="btn btn-outline-light">Edit Password</button>
            </Link>
          </div>
        </Container>
      </div>
    </AuthLayout>
  );
}

export default UserProfile;
