"use client";

import React, { useEffect, useRef, useState } from "react";

import {
  AppBar,
  Box,
  Button,
  List,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";

import ArrowCircleUpRoundedIcon from "@mui/icons-material/ArrowCircleUpRounded";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import GrainIcon from "@mui/icons-material/Grain";
import { send } from "@/services/ai.service";

type Message = {
  sender: string;
  text: string;
};

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState<string>("");

  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (user: string) => {
    if (!text) return;

    // Add user message to the list
    const sender = user === "me" ? "me" : "ai";
    const response = { sender: sender, text: text };
    setMessages([...messages, response]);
    setText("");

    // Send message to the AI
    try {
      const response = await send(text);
      console.log("[DEBUG] response", response);

      // Add AI response to the list
      const aiResponse = { sender: "ai", text: response.text };
      setMessages([...messages, aiResponse]);
    } catch (error) {
      console.error(error as string);
    }
  };

  const handleChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (setText) setText(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      handleSend("ai");
    }
  };

  const renderAIResponse = (response: Message) => {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#f4f4f4",
          borderRadius: 4,
          padding: 1,
          gap: 1,
        }}
      >
        <GrainIcon />
        <Typography variant="body1" sx={{ color: "black" }}>
          {response.text}
        </Typography>
      </Box>
    );
  };

  const renderUserMessage = (message: Message) => {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#f4f4f4",
          borderRadius: 4,
          padding: 1,
          gap: 1,
        }}
      >
        <AccountCircleIcon />
        <Typography variant="body1" sx={{ color: "black" }}>
          {message.text}
        </Typography>
      </Box>
    );
  };

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: "#212121" }}>
      <AppBar position="static">
        <Toolbar sx={{ gap: 1, backgroundColor: "#aaaaaa" }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 0 }}>
            👋
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            DevBuddyAI
          </Typography>
          <Typography variant="h6" component="div">
            MHacks 24
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ height: "80vh", width: "100%", overflowY: "scroll" }}>
        {/* display messages */}
        <List sx={{ padding: 2 }}>
          {messages.map((message, index) => (
            <Box key={index} sx={{ display: "flex", paddingBottom: 1 }}>
              {message.sender === "me"
                ? renderUserMessage(message)
                : renderAIResponse(message)}
            </Box>
          ))}
        </List>
        <div ref={messagesEndRef} />
      </Box>

      <Box
        sx={{
          display: "flex",
          padding: 2,
          gap: 2,
          backgroundColor: "#e3e3e3",
          boxShadow: 3,
        }}
      >
        <TextField
          value={text}
          variant="outlined"
          fullWidth
          onChange={handleChangeText}
          onKeyPress={handleKeyPress}
        />
        <Button variant="outlined" onClick={() => handleSend("me")}>
          <ArrowCircleUpRoundedIcon />
        </Button>
      </Box>
    </Box>
  );
}
