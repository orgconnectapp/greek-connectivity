
import React from 'react';

const EmptyConversation = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="text-center">
        <h3 className="text-lg font-medium">Select a conversation</h3>
        <p className="text-muted-foreground">
          Choose a conversation from the list to start messaging
        </p>
        <p className="text-muted-foreground mt-2 text-sm">
          Conversations with 2 or more people are treated as group chats
        </p>
      </div>
    </div>
  );
};

export default EmptyConversation;
