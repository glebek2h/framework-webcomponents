// @ts-nocheck
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const SENDER = 'React';

// Styled Components
const ChatContainer = styled.div`
  width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
`;

const MessagesContainer = styled.div`
  height: 300px;
  overflow-y: auto;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const MessageContainer = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-direction: ${(props) => (props.isOur ? 'row-reverse' : 'row')};
`;

const Avatar = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${(props) => (props.isOur ? '#007bff' : '#ccc')};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: white;
`;

const MessageBubble = styled.div`
  max-width: 70%;
  padding: 10px;
  border-radius: 10px;
  background-color: ${(props) => (props.isOur ? '#007bff' : '#e1e1e1')};
  color: ${(props) => (props.isOur ? 'white' : 'black')};
`;

const InputContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

// Chat Component
export const ReactChat = ({ messages: messagesProp = [] }: any) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    console.log(messagesProp);
    if (typeof messagesProp === 'string') {
      try {
        const parsedMessages = JSON.parse(messagesProp);
        if (Array.isArray(parsedMessages)) {
          setMessages(parsedMessages);
        } else {
          console.error('Parsed messages is not an array:', parsedMessages);
        }
      } catch (error) {
        console.error('Failed to parse messages:', error);
      }
    } else if (Array.isArray(messagesProp)) {
      setMessages(messagesProp);
    } else {
      //console.error('Invalid messages prop:', messagesProp);
      setMessages([]);
    }
  }, [messagesProp]);

  // Handle sending a message
  const handleSendMessage = () => {
    if (inputValue.trim() !== '') {
      const newMessage = {
        id: `msg-${Date.now()}`,
        message: inputValue,
        sender: SENDER,
      };
      setMessages([...messages, newMessage]);
      const event = new CustomEvent('messageSent', { detail: newMessage });
      document.dispatchEvent(event);
      setInputValue('');
    }
  };

  return (
    <ChatContainer>
      <h2>React чат</h2>
      <MessagesContainer>
        {messages?.map((msg) => (
          <MessageContainer key={msg.id} isOur={msg.sender === SENDER}>
            <div>{msg.sender}</div>
            <MessageBubble isOur={msg.sender === SENDER}>
              {msg.message}
            </MessageBubble>
          </MessageContainer>
        ))}
      </MessagesContainer>
      <InputContainer>
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Введите сообщение..."
        />
        <Button onClick={handleSendMessage}>Отправить</Button>
      </InputContainer>
    </ChatContainer>
  );
};
