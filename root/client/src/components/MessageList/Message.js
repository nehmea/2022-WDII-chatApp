//import React from 'react';
import axios from "axios";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../helpers/AuthContext";
import { useNavigate } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import React, { useState, useEffect, useContext } from "react";
import { format, parseISO } from 'date-fns';
import './Message.css'


function Message({ username, createdAt, body, avatar }) {

  let formattedDate = format((parseISO(createdAt)), 'MMM dd yyyy hh:mmaa');

  const [likes, setLikes] = useState([]);
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    // axios.get(`http://localhost:3001/likes/${id}`).then((response) => {
    //     setLikes(response.data);
    // });

  }, []);

  return (
    // <div>
    //   <Card className="messageContainer">
    //     <Card.Header>
    //       <div>{username}</div>
    //       <div>{formattedDate}</div>
    //     </Card.Header>
    //     <Card.Body>
    //       <Card.Text>{body}</Card.Text>
    //     </Card.Body>
    //     <Card.Footer>Likes Here</Card.Footer>
    //   </Card>
    // </div>
    <div className="my-4">
      <div className="d-flex">
        <img
          alt="user avatar"
          src={avatar}
          width="50"
          height="50"
          className="rounded-circle avatar me-3"
        />
        <div className="d-flex flex-column" >
          <div className="d-flex">
            <p className="me-3">{username}</p>
            <p>{formattedDate}</p>
          </div>
          <div>
            <p>{body}</p>
          </div>
          <div>
            <span>👍</span>
            <span>2</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Message
