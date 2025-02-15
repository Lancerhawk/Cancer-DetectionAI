from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import load_img, img_to_array
import numpy as np
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Load the trained AI model
MODEL_PATH = "./tumor_model.h5"
model = load_model(MODEL_PATH)
classes = ["Benign", "Malignant", "Normal"]

def predict_tumor(image_path):
    img = load_img(image_path, target_size=(224, 224))
    img_array = img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0) / 255.0
    
    prediction = model.predict(img_array)
    confidence = np.max(prediction)
    predicted_class = classes[np.argmax(prediction)]
    
    if confidence < 0.6:
        predicted_class = "Normal"
    
    return {"class": predicted_class, "confidence": float(confidence)}

@app.route("/predict", methods=["POST"])
def upload_file():
    if "file" not in request.files:
        return jsonify({"error": "No file provided"}), 400
    
    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400
    
    filename = secure_filename(file.filename)
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    file.save(filepath)
    
    result = predict_tumor(filepath)
    os.remove(filepath)  # Delete the file after prediction to save space
    
    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
