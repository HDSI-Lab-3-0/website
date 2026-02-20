---
title: "AI-Driven Robotic Flower"
description: "Students build a smile-recognition model in Python and use it to control a robotic arm they assemble and design."
pubDate: 2026-02-02
status: "Ongoing"
audience: "High school"
engagementType: "Hands-on workshop or activity"
location: "In classroom or lunch-time program"
sponsor: "TILOS"
heroImage: "../../assets/project-placeholder-3.webp"
imageGif: "../../assets/project-placeholder-1.webp"
tags:
    [
        "in classroom",
        "High School",
        "UCSD Undergraduate",
        "TILOS",
        "Free",
    ]
estimated_time: 240
---

# AI-Driven Robotic Flower

## Summary

Students build a smile-recognition model in Python and use it to control a robotic arm they assemble and design.

## K-12 Learning Goals

Basics of ML + human-centered AI; training/testing models and using AI to control physical systems.

## Undergraduates Learning

Prototype build + ongoing curriculum development/support.

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

- Adrian Apsay - [LinkedIn](https://www.linkedin.com/in/adrianapsay/)
- Ethan Flores - [LinkedIn](https://www.linkedin.com/in/etflores1/)

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

- **Raspberry Pi 5** (Operating System: Raspberry Pi OS 64-bit)
- **Webcam** (USB A)
- **HiWonder xArm 1S** (Note: Other robotic arms may not translate well with the code due to constraints and limitations)
- **Monitor** (any kind that displays output)
- **Mouse and Keyboard** (optional)
- **USB Micro B Cable** (to connect xArm to Raspberry Pi)

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

- Press **'s'** to capture a smiling photo
- Press **'n'** to capture a not smiling photo
- Press **'q'** when finished — the model will start training based on your photos

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

- Your xArm is connected via USB
- Webcam has good lighting
- You're using the trained smile_model

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

- Understand servo motor control
- Learn basic Python robotics programming
- Identify and label each servo in the xArm

**Requirements (before you begin):**

- Raspberry Pi with Python installed (This was done with Saura)
- xArm connected via USB (connect the Robot Arm to the Raspberry Pi board (it's a USB A to USB Micro)
- Installed xarm Python package (on your raspberry pi - If not, get in your virtual environment and use code below)

```bash
pip install xarm
```

#### Step 0: Create a file

Enter the the virtual environment and Cd all the way into your robotic arm folder
Create a file and name it: `assignment1.py`

#### Step 1: Checking the assigned number label for each servo

Each servo should have a number label. However, the label is not written on the servo. Therefore, the first step would be running the code using different servo labels and making a note on the assigned number label for each servo.

Hint: There are a total of 5 servos, and they are labeled 1 through 5. Also note, we used position 700 assuming it's not in that position currently so make sure at least one servo is moving per label.

**Starter Code (Template):**

```python
import xarm
import time

# Connect to the xArm
arm = xarm.Controller('USB')

# Initial position (.setPostion([[servo label number, angle degree]]))
# try changing the servo label number (first digit) and run the code
xarm.setPosition([[1, 700]], wait=True)

print("Arm moved")
```

**Reminder:** To run the code, in your terminal type the following code:

```bash
python assignment1.py
```

**Question 1:** Write 2-4 words for each servo label for your own future reference:
(ex: servo #1: most bottom servo)

Servo #1:
Servo #2:
Servo #3:
Servo #4:
Servo #5:

#### Step 2: Moving More Than One Servo at a Time

Replace the line of code (`xarm.setPosition([[1, 700]], wait=True)`) with the following:

```python
arm.setPosition([[1, 200], [2, -60], [3, 30], [4, -30], [5, 10]], wait=True)

print("Arm moved")
```

You can play around with this and see how the direction of the servo changes (ex: angle being positive and negative and how it would change the direction the servo moves).

**Question 2:** Fill in the blanks below with the position (angle degree) for each servo, to make the robotic arm standing straight up and the clamps are fully open.

| Servo # | Angle # |
| ------- | ------- |
| Servo 1 |         |
| Servo 2 |         |
| Servo 3 |         |
| Servo 4 |         |
| Servo 5 |         |

#### Step 3: Creating Multiple Movement by Running the Code Once

Change the numbers and add more steps if you like.

**Code (template):**

```python
# Move to first position
arm.setPosition([[1, 200], [2, -60], [3, 30], [4, -30], [5, 10]], wait=True)
time.sleep(1)

# Move to second position
arm.setPosition([[1, 800], [2, -30], [3, 50], [4, -60], [5, 20]], wait=True)
time.sleep(1)

# Return to home
arm.setPosition([[1, 500], [2, 0], [3, 0], [4, 0], [5, 0]], wait=True)
```

#### Step 4: Film a Short Video

Film a short video of the robot moving with multiple different steps. Download this document as a PDF or take pictures of the filled-out worksheet if you printed it out and upload it along with your video to Google Classroom. And last but not least, congratulations on finishing the first assignment.

**Key Activities:**

- Testing individual servo movements
- Controlling multiple servos simultaneously
- Creating multi-step movement sequences
- Filming a demonstration video

### Assignment 2: Controlling the Arm Using Code with Keyboard

**Objectives:**

- Implement keyboard-controlled robotics
- Simulate smile detection behavior
- Understand conditional servo positioning

#### Step 0: Create the python file

Enter the enviroment and Cd all the way into your robotic arm folder
Create a file and name it: `assignment2.py`

#### Step 1: Import Libraries and Connect to the xArm

```python
import xarm
import time
```

#### Step 2: Connect to the xArm

```python
arm = xarm.Controller('USB')
```

#### Step 3: Set Initial Positions for All Servos

For this part, I will provide you all with the initial starting position of the servos.

```python
# Initial angles for servos
a = 800     # Servo 1 (base)
b = -90.25  # Servo 2 (fixed in this activity)
c = 51.49   # Servo 3
d = -81.75  # Servo 4
e = 8.25    # Servo 5

# Move to starting pose
arm.setPosition([[1, a], [2, b], [3, c], [4, d], [5, e]], wait=True)
print("Set to Original Position")
```

#### Step 4: Start an Input Loop to Read User Commands

We will start by creating an infinite loop where your program waits for keyboard input.

```python
while True:
    cmd = input("Command (u/d/q): ").strip().lower()
```

#### Step 5: Simulate "Smile Detected" with 'u' Key

When the user presses 'u', this simulates a smile detection and adjusts servos to a "smiling pose" using your original logic.

Even if you didn't assign the a and c variables to numbers, this code would still run. So you can take a look at step 6 and after pasting the code from step 6 you can come back to change the numbers that would best represent a movement of a flower.

```python
    if cmd == 'u':  # Simulate "smile"
        if a > 200 and c > -2.25 and d < 2.25 and e > 8.25:
            a -= #replace this with numbers
            c -= #replace this with numbers
            d += 4.08*2
            e -= 0.98*2
            arm.setPosition([[1, a], [2, b], [3, c], [4, d], [5, e]], wait=False)
            print("Smiling pose")
        else:
            arm.setPosition([[1, 200], [2, b], [3, -2.75], [4, 2.25], [5, 8.25]], wait=False)
```

#### Step 6: Simulate "Not Smiling" with 'd' Key

Pressing 'd' simulates a neutral expression — servos move back to the default position.

Hint: the replace number for variable a and c should be the same as step 5

```python
    elif cmd == 'd':  # Simulate "not smiling"
        if a < 800 and c < 51.49 and d > -81.75 and e < 25.75:
            a += #replace this with numbers
            c += #replace this with numbers
            d -= 4.08*2
            e += 0.98*2
            arm.setPosition([[1, a], [2, b], [3, c], [4, d], [5, e]], wait=False)
            print("Neutral pose")
        else:
            arm.setPosition([[1, 800], [2, b], [3, 51.49], [4, -81.75], [5, 25.7499]], wait=False)
```

#### Step 7: Quit with the 'q' Key

Pressing 'q' ends the loop and the program.

```python
    elif cmd == 'q':
        print("Quitting program.")
        break
```

#### Step 8: Handle Invalid Keys

This gives helpful feedback if the user presses a wrong key.

```python
    else:
        print("Invalid input. Use 'u', 'd', or 'q'.")
    time.sleep(0.15)
```

#### Step 9: Discussion Question

**Which servos changed when the arm was "smiling"?**

- Servo 5
- Servo 1

**Why are there conditions like if a > 200 before updating positions?**
So it stays in a certain range for better movement

**What would happen if we removed those checks?**
The flower arm could break

**Key Activities:**

- Setting initial servo positions
- Creating an input loop for user commands
- Simulating "smile detected" with the 'u' key
- Simulating "not smiling" with the 'd' key
- Understanding position boundary conditions

### Assignment 3: How to Create Your Own Facial Recognition Model

**What You Will Build:**

In this assignment, you will write Python code to:

- Collect facial expression images using your webcam
- Train a CNN (Convolutional Neural Network) to recognize smiles
- Evaluate and save your model

**Before we begin making our own facial recognition**

Here is a little background information about OpenCV, facial recognition, and image processing.

Please watch the following videos:

- OpenCV and Facial Recognition
- Convolution

#### Step 0: Creating File

In your folder create a file called `smile_training.py`, make sure you are in your virtual environment and in the correct folder.

#### Step 1: Setup and Imports

```python
import tensorflow as tf
from tensorflow.keras import layers, models
import numpy as np
import cv2
import os
from sklearn.model_selection import train_test_split

# Set random seed for reproducibility
tf.random.set_seed(42)
np.random.seed(42)
```

#### Step 2: Create CNN Model

Paste this block and read the comments:

```python
# Part 2: Create CNN Model
def create_model():
    """Create a CNN model for smile detection"""
    model = models.Sequential([
        # First Convolutional Layer
        layers.Conv2D(32, (3, 3), activation='relu', input_shape=(64, 64, 1)),
        layers.MaxPooling2D((2, 2)),

        # Second Convolutional Layer
        layers.Conv2D(64, (3, 3), activation='relu'),
        layers.MaxPooling2D((2, 2)),

        # Third Convolutional Layer
        layers.Conv2D(64, (3, 3), activation='relu'),
        layers.MaxPooling2D((2, 2)),

        # Flatten layer
        layers.Flatten(),

        # Dense layers
        layers.Dense(128, activation='relu'),
        layers.Dropout(0.5),
        layers.Dense(1, activation='sigmoid')
    ])
    return model
```

#### Step 3: Collect Training Data

```python
def collect_training_data():
    """Collect training data using webcam"""
    cap = cv2.VideoCapture(0)
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

    # Create directories for storing images
    os.makedirs('smile_data/smiling', exist_ok=True)
    os.makedirs('smile_data/not_smiling', exist_ok=True)

    smiling_count = 0
    not_smiling_count = 0

    print("Press 's' to capture smiling images")
    print("Press 'n' to capture not smiling images")
    print("Press 'q' to quit")

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = face_cascade.detectMultiScale(gray, 1.3, 5)

        for (x, y, w, h) in faces:
            cv2.rectangle(frame, (x, y), (x+w, y+h), (255, 0, 0), 2)
            face_roi = gray[y:y+h, x:x+w]

        cv2.imshow('Capture Training Data', frame)
        key = cv2.waitKey(1) & 0xFF

        if key == ord('s') and len(faces) > 0:
            face_roi = cv2.resize(face_roi, (64, 64))
            cv2.imwrite(f'smile_data/smiling/smile_{smiling_count}.webp', face_roi)
            smiling_count += 1
            print(f"Captured smiling image {smiling_count}")

        elif key == ord('n') and len(faces) > 0:
            face_roi = cv2.resize(face_roi, (64, 64))
            cv2.imwrite(f'smile_data/not_smiling/not_smile_{not_smiling_count}.webp', face_roi)
            not_smiling_count += 1
            print(f"Captured not smiling image {not_smiling_count}")

        elif key == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()
    return smiling_count, not_smiling_count
```

#### Step 4: Prepare Dataset

Paste this block and think about the TODO question. (TODO question is in the second to last line in the following code block.)

```python
def prepare_dataset():
    """Prepare the dataset for training"""
    X = []
    y = []

    smile_dir = 'smile_data/smiling'
    for img_name in os.listdir(smile_dir):
        img_path = os.path.join(smile_dir, img_name)
        img = cv2.imread(img_path, cv2.IMREAD_GRAYSCALE)
        img = img / 255.0  # Normalize pixel values
        X.append(img)
        y.append(1)

    not_smile_dir = 'smile_data/not_smiling'
    for img_name in os.listdir(not_smile_dir):
        img_path = os.path.join(not_smile_dir, img_name)
        img = cv2.imread(img_path, cv2.IMREAD_GRAYSCALE)
        img = img / 255.0  # Normalize pixel values
        X.append(img)
        y.append(0)

    X = np.array(X)
    y = np.array(y)

    # Reshape for CNN input
    X = X.reshape(-1, 64, 64, 1)

    # TODO: What would happen if we changed test_size from 0.2 to 0.5?
    return train_test_split(X, y, test_size=0.2, random_state=42)
```

#### Step 5: Train and Save the Model

```python
def train_model():
    """Train the smile detection model"""
    print("Let's collect training data...")
    smiling_count, not_smiling_count = collect_training_data()
    print(f"\nCollected {smiling_count} smiling images and {not_smiling_count} not smiling images")

    print("\nPreparing dataset...")
    X_train, X_test, y_train, y_test = prepare_dataset()

    print("\nCreating and compiling model...")
    model = create_model()
    model.compile(optimizer='adam',
                 loss='binary_crossentropy',
                 metrics=['accuracy'])

    print("\nTraining model...")
    history = model.fit(X_train, y_train,
                       epochs=20,
                       batch_size=32,
                       validation_data=(X_test, y_test))

    model.save('smile_detector.h5')
    print("\nModel saved as 'smile_detector.h5'")

    test_loss, test_acc = model.evaluate(X_test, y_test)
    print(f"\nTest accuracy: {test_acc:.4f}")

    return model, history
```

#### Step 6: Main Function

```python
if __name__ == "__main__":
    model, history = train_model()
```

#### Final Step: How to Run the Code

**Important:** Remember to save your code

After pasting all the code parts together into one file (`smile_training.py`), follow these steps:

Run the script from the terminal:

```bash
python smile_training.py
```

**Follow the on-screen instructions:**

- Press 's' to capture smiling images
- Press 'n' to capture not-smiling images
- Press 'q' to quit the data collection

Take around 100 photos each for both smiling and not smiling, you can move your face around (move left, move right, closer to the camera, farther away from the camera, under different lighting, etc). You can also have your friends or classmates take pictures of their faces. Repeated faces are okay in this case (in real life, you probably would want more diverse data), but since you are the one testing the actual code, it will be okay. Personally, I took 100 pictures of myself smiling and not smiling.

After you finish collecting the data, press 'q' and your model will start to train itself using all the photos you've taken.

#### Testing your model

Open this Google Doc on your Raspberry Pi and download a test file I've created for you all onto your Raspberry Pi. The testing file will be in this [Google Drive](https://drive.google.com/drive/folders/136ffYBGpYN-eNK8oHrabOGXliYurQCfr?usp=sharing) folder. The file is called `test_train_model.py`. Save this file into the folder where the `smile_training.py` is located.

Run the script from the terminal:

```bash
python test_train_model.py
```

And smile at your camera :D

**Objectives:**

- Understand Convolutional Neural Networks (CNNs)
- Learn image collection and preprocessing
- Train a custom facial expression recognition model
- Evaluate model performance

**Key Activities:**

- Collecting training data with webcam
- Building a CNN architecture
- Training on smile/no-smile dataset
- Testing and saving the model

**Recommended Background Videos:**

- OpenCV and Facial Recognition
- Convolution Neural Networks

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

- Input shape: 64x64x1 (grayscale images)
- Epochs: 20
- Batch size: 32
- Optimizer: Adam
- Loss function: Binary crossentropy
- Train/test split: 80/20

## Learning Outcomes

By completing this project, students will:

- Understand the fundamentals of computer vision and facial recognition
- Gain hands-on experience with machine learning model training
- Learn to integrate hardware and software systems
- Develop skills in Python programming for robotics
- Experience the creative applications of AI and robotics
- Build confidence in troubleshooting technical issues

## Best Practices

1. **Lighting:** Ensure good, consistent lighting for facial recognition
2. **Camera Position:** Position the camera at eye level for best detection
3. **Data Collection:** Collect diverse training data with varying angles and lighting
4. **Testing:** Always test the model before full integration
5. **Documentation:** Keep notes on servo positions and model performance

## Future Enhancements

Potential improvements to the project:

- Multi-emotion detection (happiness, surprise, sadness)
- Multiple flower control for group interactions
- Mobile app integration
- Custom flower designs and behaviors
- Advanced ML models for better accuracy
- Real-time emotion tracking and visualization

## Resources

For more information and support:

- **UC San Diego HDSI Lab:** Contact Saura Naderi (snaderi@ucsd.edu)
- **TensorFlow Documentation:** [tensorflow.org](https://www.tensorflow.org/)
- **OpenCV Documentation:** [opencv.org](https://opencv.org/)
- **HiWonder xArm Documentation:** Check manufacturer's website

## Acknowledgments

This project was made possible through the support of the HDSI Lab 3.0 program at UC San Diego. Special thanks to all contributors and students who have participated in building and improving this interactive experience.

---

**Happy Building! Remember: Keep Smiling! 😊**
