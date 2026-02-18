from flask import Flask, jsonify, request

app = Flask(__name__)

# Root endpoint
@app.route('/', methods=['GET'])
def home():
    return jsonify({"message": "Flask backend is running 🚀"})

# Health check endpoint
@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "OK"})

# Example POST endpoint
@app.route('/data', methods=['POST'])
def receive_data():
    data = request.get_json()  # Receive JSON from frontend
    # Just echo back for now
    return jsonify({
        "status": "success",
        "received": data
    })

if __name__ == '__main__':
    app.run(debug=True)
