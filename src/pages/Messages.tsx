
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import NewDirectMessageDialog from '@/components/messages/NewDirectMessageDialog';
import { Conversation } from '@/components/messages/types';
import { Member } from '@/components/messages/NewDirectMessageDialog';
import ConversationsList from '@/components/messages/ConversationsList';
import MessageView from '@/components/messages/MessageView';
import EmptyConversation from '@/components/messages/EmptyConversation';
import RenameGroupDialog from '@/components/messages/RenameGroupDialog';
import { initialConversations, availableMembers } from '@/components/messages/data';
import { createNewConversation, formatTime } from '@/components/messages/messageUtils';

const Messages = () => {
  const location = useLocation();
  const { toast } = useToast();
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(initialConversations[0]);
  const [newMessage, setNewMessage] = useState('');
  const [allConversations, setAllConversations] = useState<Conversation[]>(initialConversations);
  const [newDirectMessageOpen, setNewDirectMessageOpen] = useState(false);
  const [renameDialogOpen, setRenameDialogOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  
  useEffect(() => {
    if (location.state?.openConversation) {
      const { id, name } = location.state.openConversation;
      
      let conversation = allConversations.find(c => 
        c.name.toLowerCase() === name.toLowerCase()
      );
      
      if (conversation) {
        setSelectedConversation(conversation);
        toast({
          title: `Conversation with ${name}`,
          description: "Ready to chat!",
        });
      } else {
        const newConversation: Conversation = {
          id: allConversations.length + 1,
          name: name,
          role: 'Member',
          lastMessage: '',
          timestamp: 'Just now',
          unread: 0,
          online: false,
          avatar: '/placeholder.svg'
        };
        
        setAllConversations(prev => [newConversation, ...prev]);
        setSelectedConversation(newConversation);
        
        toast({
          title: `New conversation with ${name}`,
          description: "Start chatting now!",
        });
      }
    }
  }, [location.state, allConversations]);
  
  const handleSendMessage = () => {
    if (newMessage.trim() === '' || !selectedConversation) return;
    
    const updatedConversations = allConversations.map(conv => {
      if (conv.id === selectedConversation.id) {
        return {
          ...conv,
          lastMessage: newMessage,
          timestamp: 'Just now'
        };
      }
      return conv;
    });
    
    setAllConversations(updatedConversations);
    setNewMessage('');
    
    toast({
      title: `Message sent`,
      description: "Your message has been sent successfully.",
    });
  };
  
  const handleCreateNewDirectMessage = (selectedMembers: Member[], initialMessage: string, groupName?: string) => {
    const newConversation = createNewConversation(selectedMembers, initialMessage, groupName);
    
    setAllConversations(prev => [newConversation, ...prev]);
    setSelectedConversation(newConversation);
    
    toast({
      title: newConversation.isGroup ? "Group chat created" : "Conversation started",
      description: `You started a conversation with ${newConversation.isGroup ? 'the group' : newConversation.name}.`,
    });
    
    setNewDirectMessageOpen(false);
  };
  
  const handleRenameGroup = () => {
    if (newGroupName.trim() === '' || !selectedConversation) return;
    
    setAllConversations(prev => 
      prev.map(conv => {
        if (conv.id === selectedConversation.id) {
          return {
            ...conv,
            name: newGroupName,
            customName: true
          };
        }
        return conv;
      })
    );
    
    setSelectedConversation({
      ...selectedConversation,
      name: newGroupName,
      customName: true
    });
    
    setRenameDialogOpen(false);
    setNewGroupName('');
    
    toast({
      title: "Group renamed",
      description: `The group has been renamed to "${newGroupName}".`,
    });
  };
  
  const openRenameDialog = () => {
    if (selectedConversation) {
      setNewGroupName(selectedConversation.name);
      setRenameDialogOpen(true);
    }
  };
  
  return (
    <div className="h-[calc(100vh-10rem)] overflow-hidden rounded-lg border bg-background shadow-sm animate-fade-in">
      <div className="flex h-full">
        <ConversationsList
          conversations={allConversations}
          selectedConversation={selectedConversation}
          setSelectedConversation={setSelectedConversation}
          onNewDirectMessage={() => setNewDirectMessageOpen(true)}
        />
        
        {selectedConversation ? (
          <MessageView
            selectedConversation={selectedConversation}
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            handleSendMessage={handleSendMessage}
            onRenameGroup={openRenameDialog}
          />
        ) : (
          <EmptyConversation />
        )}
      </div>
      
      <NewDirectMessageDialog 
        open={newDirectMessageOpen}
        onOpenChange={setNewDirectMessageOpen}
        members={availableMembers}
        onCreateConversation={handleCreateNewDirectMessage}
      />
      
      <RenameGroupDialog
        open={renameDialogOpen}
        onOpenChange={setRenameDialogOpen}
        newGroupName={newGroupName}
        setNewGroupName={setNewGroupName}
        onRename={handleRenameGroup}
      />
    </div>
  );
};

export default Messages;
