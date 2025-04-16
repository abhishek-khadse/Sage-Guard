import torch
import torch.nn as nn
import torchvision.transforms as transforms
import numpy as np
from PIL import Image
import cv2
import os
from loguru import logger

class AccidentDetector(nn.Module):
    def __init__(self, model_path: str = "models/accident_detector.pt"):
        super(AccidentDetector, self).__init__()
        self.model = None
        self.model_path = model_path
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        self.load_model()
        
        # Define image transforms
        self.transform = transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
        ])

    def load_model(self):
        """Load the pre-trained CNN model"""
        try:
            # Create a simple CNN model if no pre-trained model exists
            if not os.path.exists(self.model_path):
                self.model = nn.Sequential(
                    nn.Conv2d(3, 32, kernel_size=3, padding=1),
                    nn.ReLU(),
                    nn.MaxPool2d(2),
                    nn.Conv2d(32, 64, kernel_size=3, padding=1),
                    nn.ReLU(),
                    nn.MaxPool2d(2),
                    nn.Conv2d(64, 128, kernel_size=3, padding=1),
                    nn.ReLU(),
                    nn.MaxPool2d(2),
                    nn.Flatten(),
                    nn.Linear(128 * 28 * 28, 512),
                    nn.ReLU(),
                    nn.Dropout(0.5),
                    nn.Linear(512, 1),
                    nn.Sigmoid()
                )
                logger.warning(f"No pre-trained model found at {self.model_path}. Using default model.")
            else:
                self.model = torch.load(self.model_path, map_location=self.device)
            
            self.model = self.model.to(self.device)
            self.model.eval()
            logger.info(f"Model loaded successfully on {self.device}")
        except Exception as e:
            logger.error(f"Error loading model: {str(e)}")
            raise

    def preprocess_image(self, image: np.ndarray) -> torch.Tensor:
        """Preprocess the image for model input"""
        try:
            # Convert to RGB if needed
            if len(image.shape) == 2:
                image = cv2.cvtColor(image, cv2.COLOR_GRAY2RGB)
            elif image.shape[2] == 4:
                image = cv2.cvtColor(image, cv2.COLOR_RGBA2RGB)
            
            # Convert to PIL Image
            image = Image.fromarray(image)
            
            # Apply transforms
            image = self.transform(image)
            
            # Add batch dimension
            image = image.unsqueeze(0)
            
            return image.to(self.device)
        except Exception as e:
            logger.error(f"Error preprocessing image: {str(e)}")
            raise

    def predict(self, image: np.ndarray) -> dict:
        """Make prediction on the input image"""
        try:
            # Preprocess the image
            processed_image = self.preprocess_image(image)
            
            # Make prediction
            with torch.no_grad():
                prediction = self.model(processed_image)
                confidence = float(prediction[0][0])
            
            # Determine if it's an accident
            is_accident = confidence > 0.5
            label = "Accident" if is_accident else "Normal"
            
            return {
                "isAccident": is_accident,
                "confidence": confidence,
                "label": label
            }
        except Exception as e:
            logger.error(f"Error making prediction: {str(e)}")
            raise

    def process_video_frame(self, frame: np.ndarray) -> dict:
        """Process a single frame from a video stream"""
        return self.predict(frame)

# Initialize the detector
detector = AccidentDetector() 