import axios from "axios";

// const API_ENDPOINT = "http://localhost:3000";
const API_ENDPOINT =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent";

const SECRET_KEY = "AIzaSyCY2TWacfM4DbyMQNKLuSrdyH9e_p3K44c";

export const send = async (text: string): Promise<any> => {
  const options = {
    url: `${API_ENDPOINT}?key=${SECRET_KEY}`,
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    data: {
      contents: [
        {
          parts: [
            {
              text: text,
            },
          ],
        },
      ],
    },
  };
  const response = await axios(options);
  return response.data;
};
