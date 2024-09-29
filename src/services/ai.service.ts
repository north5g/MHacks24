import axios from "axios";

const API_ENDPOINT = "http://localhost:3000";

export const send = async (text: string): Promise<any> => {
  const options = {
    url: `${API_ENDPOINT}/`,
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    params: {
      text,
    },
  };
  const response = await axios(options);
  return response.data;
};
