import { useContext, useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../helpers/AuthContext";
import { getCurrentUserInfo } from "../../helpers/Utils";
import "./ActiveChannelUsers.css";

function UserAvatar() {
  const [userInfo, setUserInfo] = useState(null);
  const { setAuthSate } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    getCurrentUserInfo({ setUserInfo });
  }, []);

  const logout = () => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      localStorage.removeItem("accessToken");
      setAuthSate(null);
      navigate("/");
    }
  };


  return (
    <>
      <Dropdown>

        {userInfo &&
          <>
            <Dropdown.Toggle variant="" className="avatar-toggle channel-title-heading-wrapper d-flex ">
              <div className="position-relative">
                <img
                  alt="user avatar"
                  src={userInfo.avatarUrl}
                  width="45"
                  height="45"
                  className="rounded-circle avatar me-3"
                />

                {userInfo.status === "online" ? (
                  <div className="rounded-circle position-absolute status-icon online-green"></div>
                ) : userInfo.status === "busy" ? (
                  <div className="rounded-circle position-absolute status-icon busy-red"></div>
                ) : (
                  <div className="rounded-circle position-absolute status-icon offline-empty"></div>
                )}
              </div>
            </Dropdown.Toggle>

            <Dropdown.Menu align="end" variant="light">
              <Dropdown.Item>
                Change status
              </Dropdown.Item>

              <Dropdown.Item onClick={() => { navigate('/profile') }}>
                Edit profile
              </Dropdown.Item>

              <Dropdown.Item onClick={logout}>
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </>

        }
      </Dropdown>
    </>
  )
}

export default UserAvatar
