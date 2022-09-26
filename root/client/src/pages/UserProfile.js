import React, { useState, useEffect } from "react";
import { getCurrentUserInfo } from "../helpers/Utils";
import AuthLayout from "../components/AuthLayout/AuthLayout";
import { Container } from "react-bootstrap";
import parse from "html-react-parser";
import { format, parseISO } from "date-fns";
import { Link } from "react-router-dom";

function UserProfile() {
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    getCurrentUserInfo({ setUserInfo });
  }, []);

  // const createdAt = userInfo.createdAt
  //   ? format(parseISO(userInfo.createdAt), "MMM dd yyyy")
  //   : "";
  // const updatedAt = userInfo.updatedAt
  //   ? format(parseISO(userInfo.updatedAt), "MMM dd yyyy hh:mmaa")
  //   : "";

  if (userInfo) {
    return (
      <AuthLayout>
        <div className="d-flex align-items-center" style={{ height: "100%" }}>
          <Container className="auth-forms rounded p-4">
            <h2>User Profile</h2>
            <h4 className="text-light mb-5 mt-5">
              Username: {userInfo.username}
            </h4>
            <h4 className="text-light">Bio:</h4>
            <p className="fs-6 mb-5">{parse(userInfo.bio)}</p>
            <h4 className="text-light">Avatar Url:</h4>
            <p className="fs-6 mb-5">{userInfo.avatarUrl}</p>
            <h4 className="text-light mb-5">
              Member Since:{" "}
              {format(parseISO(userInfo.createdAt), "MMM dd yyyy")}
            </h4>
            <h4 className="text-light">
              Last Updated:{" "}
              {format(parseISO(userInfo.updatedAt), "MMM dd yyyy hh:mmaa")}
            </h4>

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
}

export default UserProfile;
