//import React from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";
import {AuthContext} from '../helpers/AuthContext';
import {useNavigate} from "react-router-dom";
import Card from 'react-bootstrap/Card';
import React, { useState, useEffect, useContext } from "react";

function Message({username, createdAt, body}) {

    const [likes, setLikes] = useState([]);
    const {authState} = useContext(AuthContext);

    useEffect(() => {
        // axios.get(`http://localhost:3001/likes/${id}`).then((response) => {
        //     setLikes(response.data);
        // });

    }, []);  

  return (
    <div>
      <Card>
        <Card.Header>
            <div>{username}</div>
            <div>{createdAt}</div>
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
