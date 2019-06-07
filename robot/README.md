#Udoo: Python Client for self-balanced-car

1. Install **virtualenv**
    - sudo apt-get install virtualenv

2. Setup **python2 enviroment**
    - virtualenv -p /usr/bin/python2.7 py2
    - cd py2/bin
    - source activate
3. Install **python package**
    1. pip3 install --index-url=https://www.piwheels.org/simple opencv-python
    2. pip3 install "python-socketio[client]"
        - If you face SyntaxError problems, just ignore it, it's normal
        - What you need to do is making sure that successfully-installed message is showed on your screen
4. Install missing dependences
    1. sudo apt-get install libatlas-base-dev
    2. sudo apt-get install libjpeg62
    3. sudo apt-get install libqtgui4 libqt4-test
    4. **libstdc++6**
        - sudo apt-get install software-properties-common
        - sudo add-apt-repository ppa:ubuntu-toolchain-r/test 
        - sudo apt-get update
        - sudo apt-get install libstdc++6
    4. https://blog.piwheels.org/how-to-work-out-the-missing-dependencies-for-a-python-package/
5. **Start** it
    - cd ~/lec_2019_uet1602/src/robot
    - python client.io.py
    - python ~/lec_2019_uet1602/src/robot/client.io.py
    - ldd /usr/local/lib/python3.4/dist-packages/cv2/cv2.cpython-34m.so | grep "not found"