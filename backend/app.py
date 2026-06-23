from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize Flask
app = Flask(__name__)
CORS(app)

# Configure Gemini API
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Create Gemini model
model = genai.GenerativeModel("gemini-2.5-flash")


@app.route("/")
def home():
    return "LinguaBridge AI Backend Running"


@app.route("/grammar", methods=["POST"])
def grammar_check():
    try:
        data = request.json
        text = data.get("text")

        prompt = f"""
Correct the grammar of this sentence.

Sentence:
{text}

Respond ONLY in this format:

Corrected Sentence:
<corrected sentence>

Explanation:
<short explanation>

Do not use markdown.
Do not use bullet points.
Do not use ** symbols.
"""

        response = model.generate_content(prompt)

        return jsonify({
            "result": response.text
        })

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500


@app.route("/chat", methods=["POST"])
def chat():
    try:
        data = request.json
        message = data.get("message")

        prompt = f"""
You are LinguaBridge AI Tutor.

Rules:
- Keep responses under 80 words.
- Be conversational.
- Act like a friendly language learning partner.
- Ask follow-up questions.
- Do not write essays.
- Do not use markdown.
- Do not use headings.
- Keep replies natural and concise.

User:
{message}
"""

        response = model.generate_content(prompt)

        return jsonify({
            "reply": response.text
        })

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500


@app.route("/test")
def test():
    try:
        response = model.generate_content(
            "Say hello in one sentence."
        )

        return response.text

    except Exception as e:
        return f"ERROR: {str(e)}"


if __name__ == "__main__":
    app.run(debug=True)