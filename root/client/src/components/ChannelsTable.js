import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import { fetchAllChannels } from "../helpers/Utils";
import parse from "html-react-parser";
import { deleteChannel } from "../helpers/Utils";
import WarningAlert from "./WarningAlert";

function ChannelsTable() {
  const [listOfChannels, setListOfChannels] = useState([]);
  const [show, setShow] = useState(false);
  const [channelToDelete, setChannelToDelete] = useState(null);

  const handleClose = () => {
    setShow(false);
    setChannelToDelete(null);
  };
  const handleShow = (channelId) => {
    setShow(true);
    setChannelToDelete(channelId);
  };

  const onHide = () => {
    deleteChannel({
      channelId: channelToDelete,
      setListOfChannels: setListOfChannels,
    });
    setShow(false);
    setChannelToDelete(null);
  };

  useEffect(() => {
    fetchAllChannels({ setListOfChannels });
  }, []);

  return (
    <div>
      <Table striped>
        <thead>
          <tr>
            <th>ID</th>
            <th>Channelname</th>
            <th>Role</th>
            <th>Bio</th>
            <th>Avatar URL</th>
            <th>Status</th>
            <th>Created On</th>
            <th>Last Modified</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {listOfChannels.map((channel, index) => {
            return (
              <tr key={index}>
                <td>{channel.id}</td>
                <td>{channel.channelname}</td>
                <td>{channel.role}</td>
                <td>{parse(channel.bio)}</td>
                <td>{channel.avatarUrl}</td>
                <td>{channel.status}</td>
                <td>{channel.createdAt}</td>
                <td>{channel.updatedAt}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={
                      () => {
                        handleShow(channel.id);
                      }

                      //   deleteChannel({
                      //     channelId: channel.id,
                      //     setListOfChannels: setListOfChannels,
                      //   });
                    }
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <WarningAlert
        text="Are you sure you want to delete this channel?"
        show={show}
        handleClose={handleClose}
        onHide={onHide}
      />
    </div>
  );
}

export default ChannelsTable;
