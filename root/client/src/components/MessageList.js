import React from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";
import {AuthContext} from '../helpers/AuthContext';
import {useNavigate} from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Message from './Message';

function MessageList() {

    let {channelId} = useParams();
    const [listOfMessages, setListOfMessages] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3001/messages/byChannel${channelId}`).then((response) => {
            setListOfMessages(response.data);
        });

    }, []);

  return (
    <div>
        {listOfMessages.map((value, key) => {
            return (
                <Message key={key} 
                    username={value.username}
                    createdAt={value.createdAt}
                    body={value.body}
                />  
            );
        })}     
    </div>
  )
}

export default MessageList
