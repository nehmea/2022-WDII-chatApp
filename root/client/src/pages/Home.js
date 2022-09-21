import React from "react";
import ChannelsList from "../components/ChannelsList/ChannelsList";
import MessageList from "../components/MessageList/MessageList";

function Home() {
  return (
    <div>
      Home

      <ChannelsList />
      <MessageList />

    </div>
  );
}

export default Home;
