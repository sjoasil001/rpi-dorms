from flask import Flask, request, render_template, jsonify
import requests
import os

# Initialize Flask app
app = Flask(__name__)

# Securely fetch OpenAI API Key from environment variables
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

def chat(prompt):
    """Function to send user input to OpenAI API and return the chatbot's response."""
    try:
        headers = {
            "Authorization": f"Bearer {OPENAI_API_KEY}",
            "Content-Type": "application/json"
        }

        data = {
            "model": "gpt-4o",
            "messages": [
                {"role": "system", "content": "You are a helpful chatbot."},
                {"role": "user", "content": prompt}
            ],
            "temperature": 0.7
        }

        response = requests.post("https://api.openai.com/v1/chat/completions", json=data, headers=headers)
        response_json = response.json()

        # Handle API errors
        if "choices" not in response_json:
            return f"Error: {response_json.get('error', {}).get('message', 'Unknown error occurred')}"

        # Extract and return chatbot response
        return response_json["choices"][0]["message"]["content"].strip()

    except Exception as e:
        return f"Error: {str(e)}"

@app.route("/")
def home():
    return render_template("chatbox.html")  # Renders frontend HTML

@app.route("/chat", methods=["POST"])
def chatbox():
    """Handles API chat requests."""
    user_message = request.json.get("message")
    
    if not user_message:
        return jsonify({"error": "No message provided"}), 400

    bot_response = chat(user_message)
    return jsonify({"response": bot_response})

if __name__ == "__main__":
    app.run(debug=True)
