"use client";

import React, { useState } from "react";

import { AppBar, Box, Button, List, TextField, Toolbar, Typography } from "@mui/material";

type Message = {
  user: string;
  text: string;
};


export default function Home() {
  const [data, setData] = useState<Message[]>([]);
  const [text, setText] = useState<string>("");

  const handleSend = () => {
    if (!text) return;
    setData([...data, { user: "me", text: text }]);
    setText("");
  };

  const handleChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.value) return;
    setText(event.target.value);
  };

  const renderAIResponse = (response: Message) => {
    return (
      <Box sx={{ display: "flex", alignItems: "baseline", backgroundColor: "#f4f4f4", borderRadius: 4, padding: 1 }}>
        <Typography variant="h6" sx={{ color: "black" }}>{response.user}: </Typography>
        <Typography variant="body1" sx={{ color: "black" }}>{response.text}</Typography>
      </Box>);
  };

  const renderUserMessage = (message: Message) => {
    return (
      <Box sx={{ display: "flex", alignItems: "baseline", backgroundColor: "#f4f4f4", borderRadius: 4, padding: 1 }}>
        <Typography variant="h6" sx={{ color: "black" }}>{message.user}: </Typography>
        <Typography variant="body1" sx={{ color: "black" }}>{message.text}</Typography>
      </Box>);
  };

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: "#424242" }}>
      <AppBar position="static">
        <Toolbar sx={{ gap: 1, backgroundColor: "#aaaaaa" }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 0 }}>
            👋
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            DevBuddyAI
          </Typography>
          <Typography variant="h6" component="div">MHacks 24</Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ height: "80vh", width: "100%" }}>

        {/* display chat messages */}
        <List sx={{ padding: 1, overflowY: "scroll" }}>
          {data.map((message, index) => (
            <Box key={index} sx={{ display: "flex", paddingBottom: 1 }}>
              {message.user === "me" ? renderUserMessage(message) : renderAIResponse(message)}
            </Box>
          ))}
        </List>
      </Box>

      <Box sx={{ display: "flex", padding: 2, gap: 2, backgroundColor: "#aaaaaa" }}>
        <TextField value={text} variant="outlined" fullWidth onChange={handleChangeText} />
        <Button variant="outlined" onClick={handleSend}>Send</Button>
      </Box>

    </Box>
  );
}
