from flask import Flask, request, jsonify
from transformers import pipeline
from flask_cors import CORS  # ✅ Add this

app = Flask(__name__)
CORS(app)  # ✅ Enable CORS for all routes

# Load your local model with pipeline
model_path = "../model/my_model"
qa_pipeline = pipeline("question-answering", model=model_path, tokenizer=model_path)

@app.route('/ask', methods=['POST'])
def ask():
    data = request.get_json()  # ✅ safer than request.json
    question = data.get('question')
    context = data.get('context')

    if not question or not context:
        return jsonify({'error': 'Missing question or context'}), 400

    try:
        pred = qa_pipeline({"context": context, "question": question})
        pred_text = pred.get("answer", "No answer found.")
        return jsonify({'answer': pred_text})
    except Exception as e:
        return jsonify({'error': str(e)}), 500  # ✅ better error visibility

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)


#source ../.venv/Scripts/activate
# python app.py