from flask import Flask, render_template, request, jsonify
import g4f

app = Flask(__name__, static_folder='static', template_folder='templates')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.json.get("message")

    if not user_input:
        return jsonify({"error": "No input provided"}), 400

    try:
        bot_reply = g4f.ChatCompletion.create(
            model=g4f.models.default,  # Fix: Automatically select a working model
            messages=[{"role": "user", "content": user_input}]
        )
    except Exception as e:
        bot_reply = "Error: Unable to get a response."
        print("GPT4Free API Error:", e)

    return jsonify({"reply": bot_reply})

if __name__ == '__main__':
    app.run(debug=True)
