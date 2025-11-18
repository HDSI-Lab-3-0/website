---
title: "Robotic Flower: Interactive Machine Learning Experience"
description: "An interactive robotic flower that blooms when you smile — blending computer vision, TensorFlow, machine learning, and robotics into a real-time, expressive experience."
pubDate: 2024-11-14

heroImage: "../../assets/project-placeholder-3.jpg"
imageGif: "../../assets/project-placeholder-1.jpg"
tags:
    [
        "in classroom",
        "High School",
        "UCSD Undergraduate",
        "HDSI LAB 3.0",
        "Free",
    ]
estimated_time: 240
relevance: "This project demonstrates the practical intersection of AI, computer vision, and robotics while teaching students fundamental concepts in machine learning, facial recognition, and hardware integration through a creative, hands-on experience."
---

# Robotic Flower: Interactive Machine Learning Experience

## Project Overview

The Robotic Flower is an interactive installation that blooms when you smile — blending computer vision, TensorFlow, machine learning, and robotics into a real-time, expressive experience. Built using a Raspberry Pi, a custom-trained CNN (Convolutional Neural Network) for facial expression recognition, and the HiWonder xArm 1S, the flower reacts to human emotion in a playful, artistic way.

This project was developed at the UC San Diego HDSI Lab under the supervision of Saura Naderi and was designed to engage both technical and creative learners through a hands-on machine learning and hardware experience.

### How It Works

The concept is straightforward:

1. Position yourself in front of the Raspberry Pi camera with good lighting
2. When you smile, the facial recognition program creates a **green box** around your face
3. A **red box** appears when you're not smiling
4. When the box is green, the flower **blooms**
5. When the box is red, the flower **wilts**

**Key takeaway: KEEP SMILING!!!**

## Project Team

**Supervisor:** Saura Naderi - snaderi@ucsd.edu

**Main Contributor:** Wan-Rong (Emma) Leung - [LinkedIn](https://www.linkedin.com/in/wan-rong-leung-228650271/)

**Other Contributors:**

-   Adrian Apsay - [LinkedIn](https://www.linkedin.com/in/adrianapsay/)
-   Ethan Flores - [LinkedIn](https://www.linkedin.com/in/etflores1/)

## Code File Descriptions

| File Name                  | Purpose                                                                  |
| -------------------------- | ------------------------------------------------------------------------ |
| `smile_training.py`        | Trains the custom CNN model for smile detection                          |
| `test_train_model.py`      | Tests the trained model on example images                                |
| `CameraTest.py`            | Verifies the camera is functioning correctly and displays real-time feed |
| `smile_detection_robot.py` | Runs smile detection using the trained model and controls the xArm       |
| `roboticflower.py`         | Contains high-level robotic flower behavior logic and servo positioning  |

## Requirements

### Hardware Components

To build your own robotic flower, you will need:

-   **Raspberry Pi 5** (Operating System: Raspberry Pi OS 64-bit)
-   **Webcam** (USB A)
-   **HiWonder xArm 1S** (Note: Other robotic arms may not translate well with the code due to constraints and limitations)
-   **Monitor** (any kind that displays output)
-   **Mouse and Keyboard** (optional)
-   **USB Micro B Cable** (to connect xArm to Raspberry Pi)

### Software Dependencies

Install the following packages (recommended: use virtual environment):

**Python:**

```bash
pip install python
# OR
pip install python3
```

**OpenCV:**

```bash
pip install opencv-python
```

**xArm:**

```bash
pip install xarm
```

**TensorFlow:**

```bash
pip install tensorflow
```

> **Note:** Run these installs via the terminal, then import these packages in your text editor.

## Setting Up a Virtual Environment

Due to the amount of packages and imports, using a virtual environment is strongly recommended for this project.

### Step 1: Update Your System

```bash
sudo apt update
sudo apt upgrade
```

### Step 2: Install Python3 and venv

```bash
sudo apt install python3 python3-venv
```

### Step 3: Create Your Virtual Environment

Navigate to your project directory:

```bash
cd /path/to/project
python3 -m venv myenv
```

### Step 4: Activate the Virtual Environment

```bash
source myenv/bin/activate
```

If you're already in your virtual environment directory:

```bash
source bin/activate
```

### Step 5: Install Dependencies

Install all required libraries within your virtual environment as specified in the Requirements section.

### Step 6: Retrieve Source Code

Run the git clone command in terminal using the project repository.

## Running the Code

### Step 1: Activate Virtual Environment

```bash
cd /path/to/your/project
source myenv/bin/activate
```

### Step 2: Check Webcam (Optional)

```bash
python CameraTest.py
```

### Step 3: Train the CNN Model

Make sure your dataset is prepared in two folders: `smile/` and `no_smile/`.

When you run the code, it will allow you to collect smiling and not smiling images through the webcam. Take at least 100 photos for both categories:

-   Press **'s'** to capture a smiling photo
-   Press **'n'** to capture a not smiling photo
-   Press **'q'** when finished — the model will start training based on your photos

```bash
python smile_training.py
```

### Step 4: Test the Trained Model (Optional)

This step ensures the model works as expected before connecting it with the robotic flower.

```bash
python test_train_model.py
```

### Step 5: Run Smile Detection + Robotic Flower

Make sure:

-   Your xArm is connected via USB
-   Webcam has good lighting
-   You're using the trained smile_model

```bash
python smile_detection_robot.py
```

## Allowing Code to Run on Startup

Follow the steps in the PowerPoint found in the Automation Start Folder for detailed instructions on configuring automatic startup.

## Troubleshooting

### Error: ModuleNotFoundError: No module named 'hidapi'

**Solution:**

1. Create a udev rules file:

```bash
sudo nano /etc/udev/rules.d/99-usbarm.rules
```

2. Add the following code:

```
SUBSYSTEM=="usb", ATTR{idVendor}=="0483", ATTR{idProduct}=="5750", MODE="0666", GROUP="plugdev"
```

3. Save (Ctrl+S) and close the window

4. Reload udev rules:

```bash
sudo udevadm control --reload-rules
sudo udevadm trigger
```

5. Install hidapi:

```bash
pip install hidapi
```

6. Reboot the Raspberry Pi:

```bash
sudo reboot
```

### Other Solutions

**Verify Device Connection:**

Ensure the device is properly connected via USB:

```bash
lsusb
```

## Educational Curriculum

This project includes three comprehensive assignments designed to teach robotics and machine learning concepts progressively.

### Assignment 1: Learning to Control the Robotic Arm with Code

**Objectives:**

-   Understand servo motor control
-   Learn basic Python robotics programming
-   Identify and label each servo in the xArm

**Key Activities:**

-   Testing individual servo movements
-   Controlling multiple servos simultaneously
-   Creating multi-step movement sequences
-   Filming a demonstration video

### Assignment 2: Controlling the Arm Using Code with Keyboard

**Objectives:**

-   Implement keyboard-controlled robotics
-   Simulate smile detection behavior
-   Understand conditional servo positioning

**Key Activities:**

-   Setting initial servo positions
-   Creating an input loop for user commands
-   Simulating "smile detected" with the 'u' key
-   Simulating "not smiling" with the 'd' key
-   Understanding position boundary conditions

### Assignment 3: How to Create Your Own Facial Recognition Model

**Objectives:**

-   Understand Convolutional Neural Networks (CNNs)
-   Learn image collection and preprocessing
-   Train a custom facial expression recognition model
-   Evaluate model performance

**Key Activities:**

-   Collecting training data with webcam
-   Building a CNN architecture
-   Training on smile/no-smile dataset
-   Testing and saving the model

**Recommended Background Videos:**

-   OpenCV and Facial Recognition
-   Convolution Neural Networks

## Technical Details

### CNN Model Architecture

The smile detection model uses the following architecture:

1. **First Convolutional Layer:** 32 filters, 3x3 kernel, ReLU activation
2. **Max Pooling Layer:** 2x2 pool size
3. **Second Convolutional Layer:** 64 filters, 3x3 kernel, ReLU activation
4. **Max Pooling Layer:** 2x2 pool size
5. **Third Convolutional Layer:** 64 filters, 3x3 kernel, ReLU activation
6. **Max Pooling Layer:** 2x2 pool size
7. **Flatten Layer**
8. **Dense Layer:** 128 neurons, ReLU activation
9. **Dropout Layer:** 0.5 rate
10. **Output Layer:** 1 neuron, Sigmoid activation

### Training Parameters

-   Input shape: 64x64x1 (grayscale images)
-   Epochs: 20
-   Batch size: 32
-   Optimizer: Adam
-   Loss function: Binary crossentropy
-   Train/test split: 80/20

## Learning Outcomes

By completing this project, students will:

-   Understand the fundamentals of computer vision and facial recognition
-   Gain hands-on experience with machine learning model training
-   Learn to integrate hardware and software systems
-   Develop skills in Python programming for robotics
-   Experience the creative applications of AI and robotics
-   Build confidence in troubleshooting technical issues

## Best Practices

1. **Lighting:** Ensure good, consistent lighting for facial recognition
2. **Camera Position:** Position the camera at eye level for best detection
3. **Data Collection:** Collect diverse training data with varying angles and lighting
4. **Testing:** Always test the model before full integration
5. **Documentation:** Keep notes on servo positions and model performance

## Future Enhancements

Potential improvements to the project:

-   Multi-emotion detection (happiness, surprise, sadness)
-   Multiple flower control for group interactions
-   Mobile app integration
-   Custom flower designs and behaviors
-   Advanced ML models for better accuracy
-   Real-time emotion tracking and visualization

## Resources

For more information and support:

-   **UC San Diego HDSI Lab:** Contact Saura Naderi (snaderi@ucsd.edu)
-   **TensorFlow Documentation:** [tensorflow.org](https://www.tensorflow.org/)
-   **OpenCV Documentation:** [opencv.org](https://opencv.org/)
-   **HiWonder xArm Documentation:** Check manufacturer's website

## Acknowledgments

This project was made possible through the support of the HDSI Lab 3.0 program at UC San Diego. Special thanks to all contributors and students who have participated in building and improving this interactive experience.

---

**Happy Building! Remember: Keep Smiling! 😊**
