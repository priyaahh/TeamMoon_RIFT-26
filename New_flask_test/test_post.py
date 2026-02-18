import requests

# Flask backend URL
url = "http://127.0.0.1:5000/data"

# JSON data to send
data = {"name": "Mounika", "role": "backend"}

# Send POST request
response = requests.post(url, json=data)

# Print response from backend
print(response.json())
