# Usage Setup

# Quick Start
1. Install Postgresql
    - brew install postgresql
    - brew services start postgresql
    - [Create user with password](https://www.codementor.io/engineerapart/getting-started-with-postgresql-on-mac-osx-are8jcopb)
        - psql postgres
        - \du
        - CREATE ROLE test WITH LOGIN PASSWORD 'Password123';
        - ALTER ROLE test CREATEDB;
        - \du
        - exit
    - createdb -U test postgres
    - createdb -U test postgres-test
2. Run `npm install` in server/ googleAssistant/function /ionic/Face & /client
3. Modify the server/.env
    - cd server/
    - touch .env
    - copy over and modify values in the .env.sample
4. Launch server and it will also run the db migrations
    - F5
5. Launch ionic front end
    - cd ionic/face
    - ionic serve
    - Or for mobile:
    - ionic cordova prepare
    - ionic serve --devapp
6. Enable Typeorm CLI for migrations
    - npm i -g typeorm

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

# VSCode Automated Tasks & Debugging
A number of build tasks have been automated in .vscode/tasks.json by opening this repo in VSCode you'll have access to them by typing cmd + shift + p then typing in Run Task and hitting enter.

You'll then see a list of task options including npm installing all of the projects, various build and launching options for the project and also tasks for managing typeorm migrations.