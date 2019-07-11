# Ionic Framework

5. Launch ionic front end
    - cd ionic/face
    - ionic serve
    - Or for mobile:
    - ionic cordova prepare
    - ionic serve --devapp


# Configure Ionic To Appflow Deployment for live udpates
- Add user permissions for global npm installs
    - sudo chown -R $(whoami) ~/.npm*
    - sudo chown -R $USER /usr/local/lib/node_modules
- Install cordova package globally
    - npm i -g cordova
- Prepare Cordova dependencies
    - ionic cordova platform add android
    - ionic integrations enable cordova --add

- https://dashboard.ionicframework.com/
    - Select your app
    - Deploy
        - Channels
        - Click Install Instructions
        - Run the command
        Example
        ```
        cordova plugin add cordova-plugin-ionic --save \
        --variable APP_ID="YourAppId" \
        --variable CHANNEL_NAME="Master" \
        --variable UPDATE_METHOD="background"
        ```
    - Commit
    - Push