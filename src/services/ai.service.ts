import axios from "axios";

const API_ENDPOINT = process.env.NEXT_PUBLIC_AI_API_ENDPOINT;
const SECRET_KEY = process.env.NEXT_PUBLIC_AI_SECRET_KEY;

export const send = async (text: string) => {
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
