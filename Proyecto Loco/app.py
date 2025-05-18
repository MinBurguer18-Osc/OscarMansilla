from flask import Flask, jsonify
from flask_cors import CORS
import cv2
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Create 'imagenes' folder in the same directory as the script
IMAGES_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'imagenes')
os.makedirs(IMAGES_DIR, exist_ok=True)

@app.route('/capture', methods=['POST'])
def capture():
    try:
        cap = cv2.VideoCapture(0)
        
        if cap.isOpened():
            ret, frame = cap.read()
            
            if ret:
                timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
                filename = os.path.join(IMAGES_DIR, f"foto_{timestamp}.jpg")
                cv2.imwrite(filename, frame)
            
            cap.release()
            
        return jsonify({"status": "ok"}), 200
    except Exception as e:
        return jsonify({"status": "error"}), 200

if __name__ == '__main__':
    app.run(port=3000, debug=True)