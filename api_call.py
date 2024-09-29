import requests
import threading

# Set your OpenAI API key and endpoint URL
openai_api_key = ""
endpoint = "https://api.openai.com/v1/chat/completions"

def make_request(data):
    """Makes a POST request to the OpenAI API endpoint."""
    headers = {
        "Authorization": f"Bearer {openai_api_key}",
        "Content-Type": "application/json"
    }
    response = requests.post(endpoint, headers=headers, json=data)
    if response.status_code == 200:
        return response.json()
    else:
        print("Error:", response.status_code, response.text)
        return None

def listen_for_input():
    messages = [{"role": "system", "content": "You are an expert coder. You read through \
                code and recognize errors, and help coders understand the steps they \
                need to take to fix a large problem."}]

    # Variable to hold the next state (not used in OpenAI, can remove)
    while True:
        # Prepare the data for the initial request
        data = {
            "model": "gpt-3.5-turbo",  # Specify the model you want to use
            "messages": messages.append([
                {"role": "user", "content": input("try here")}
            ]),
            "max_tokens": 150  # Limit the number of tokens in the response
        }

        # Make the request
        response = make_request(data)
        if response:
            # Extract and print the output from the response
            output = response.choices[0].message["content"]
            messages.append([{"role": "assistant", "content": output}])
            print("Response Output:", output) # send output to X

# Start listening for input in a separate thread
thread = threading.Thread(target=listen_for_input)
thread.start()
