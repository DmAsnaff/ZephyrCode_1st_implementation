#baldness_detector.py

import cv2
import numpy as np

def preprocess_image(image_path):
    image = cv2.imread(image_path)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    blurred = cv2.GaussianBlur(gray, (5, 5), 0)
    return blurred

def apply_threshold(image):
    _, thresholded = cv2.threshold(image, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
    return thresholded

def extract_roi(image, face_orientation='side'):
    height, width = image.shape
    if face_orientation == 'side':
        roi = image[height//4:height//2, width//2:width]
    elif face_orientation == 'front':
        roi = image[height//4:3*height//4, width//4:3*width//4]
    else:
        raise ValueError("Unsupported face orientation. Supported values are 'side' and 'front'.")
    return roi

def analyze_roi(roi):
    white_pixels = np.sum(roi == 255)
    black_pixels = np.sum(roi == 0)
    if black_pixels > white_pixels:
        return "No Bald"
    else:
        return "Bald"

def detect_baldness(image_path, face_orientation='side'):
    preprocessed_image = preprocess_image(image_path)
    thresholded_image = apply_threshold(preprocessed_image)
    roi = extract_roi(thresholded_image, face_orientation)
    result = analyze_roi(roi)
    return result

if __name__ == "__main__":
    import sys
    # import os

    # currnet_dir = os.getcwd()
    # print(currnet_dir)
    image_path = sys.argv[1]
    face_orientation = sys.argv[2]
    result = detect_baldness(image_path, face_orientation)
    print(result)