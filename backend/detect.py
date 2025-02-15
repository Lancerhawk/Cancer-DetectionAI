import tensorflow as tf
from tensorflow.keras.models import Sequential, load_model
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Dropout
from tensorflow.keras.preprocessing.image import ImageDataGenerator, load_img, img_to_array
from tensorflow.keras.optimizers import Adam
import numpy as np
import os

def train_model():
    img_size = (224, 224)
    batch_size = 32
    train_dir = "./dataset"
    val_dir = "./dataset"
    
    train_datagen = ImageDataGenerator(rescale=1./255, rotation_range=20, shear_range=0.2, zoom_range=0.2, horizontal_flip=True, validation_split=0.2)
    
    train_generator = train_datagen.flow_from_directory(
        train_dir, target_size=img_size, batch_size=batch_size, class_mode='categorical', subset='training')
    
    val_generator = train_datagen.flow_from_directory(
        val_dir, target_size=img_size, batch_size=batch_size, class_mode='categorical', subset='validation')
    
    model = Sequential([
        Conv2D(32, (3, 3), activation='relu', input_shape=(224, 224, 3)),
        MaxPooling2D(2, 2),
        Conv2D(64, (3, 3), activation='relu'),
        MaxPooling2D(2, 2),
        Conv2D(128, (3, 3), activation='relu'),
        MaxPooling2D(2, 2),
        Flatten(),
        Dense(128, activation='relu'),
        Dropout(0.5),
        Dense(3, activation='softmax')
    ])
    
    model.compile(optimizer=Adam(learning_rate=0.0001), loss='categorical_crossentropy', metrics=['accuracy'])
    
    model.fit(train_generator, validation_data=val_generator, epochs=20)
    
    model.save("tumor_model.h5")
    print("Model training complete and saved as tumor_model.h5")

def detect_tumor(image_path):
    model = load_model("tumor_model.h5")
    img = load_img(image_path, target_size=(224, 224))
    img_array = img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0) / 255.0
    
    prediction = model.predict(img_array)
    confidence = np.max(prediction)
    classes = ["Benign", "Malignant", "Normal"]
    predicted_class = classes[np.argmax(prediction)]
    
    if confidence < 0.6:  # If confidence is low, assume it's Normal
        predicted_class = "Normal"
    
    print(f"Predicted Class: {predicted_class} (Confidence: {confidence:.2f})")
    return predicted_class


if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser(description='Tumor Classification')
    parser.add_argument('--train', action='store_true', help='Train the model')
    parser.add_argument('--detect', type=str, help='Detect tumor in an image')
    args = parser.parse_args()
    
    if args.train:
        train_model()
    elif args.detect:
        detect_tumor(args.detect)
