import React from "react";
import { useAuth } from "../../Token/AuthContext";
import Chat from "./Chat";

export const ChatArea = ({ activeUser }) => {
  const { user } = useAuth();

  return (
   <Chat receiverUserName={activeUser?.userName} senderUserName={user.username} activeUser={activeUser} />
  );
};
