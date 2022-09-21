//import React from 'react';
import axios from "axios";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../helpers/AuthContext";
import { useNavigate } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import React, { useState, useEffect, useContext } from "react";
import { format, parseISO } from 'date-fns';


function Message({ username, createdAt, body }) {

  let formattedDate = format((parseISO(createdAt)), 'MMM dd yyyy hh:mmaa');

  const [likes, setLikes] = useState([]);
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    // axios.get(`http://localhost:3001/likes/${id}`).then((response) => {
    //     setLikes(response.data);
    // });

  }, []);

  return (
    <div>
      <Card className="messageContainer">
        <Card.Header>
          <div>{username}</div>
          <div>{formattedDate}</div>
        </Card.Header>
        <Card.Body>
          <Card.Text>{body}</Card.Text>
        </Card.Body>
        <Card.Footer>Likes Here</Card.Footer>
      </Card>
    </div>
  )
}

export default Message
