# Jenkins Blue Ocean CI CD Setup

## Table of Contents
- [Using Environment Variables](#using-environment-variables)
- [Jenkins Blue Ocean Parameters](#jenkins-blue-ocean-parameters)

## Required Plugins
- NodeJS
    - Update after
    - https://stackoverflow.com/questions/39896879/there-are-no-installations-for-nodejs-in-jenkins
    - https://wiki.jenkins.io/display/JENKINS/NodeJS+Plugin
    - Got to /configureTools
    - Add NodeJS & name node
    - https://stackoverflow.com/questions/45914038/jenkins-unable-to-find-npm

## Docker Build Agent
- https://jenkins.io/doc/book/pipeline/docker/#dockerfile

You can configure the Jenkinsfile to build a Dockerfile and use it as the build agent.
To do so include the Dockerfile in the root of your repository and add the following as your build.
```
  agent { dockerfile true }
```

## Using Environment Variables
Use environment variables with your jenkins blue ocean containerized build by enabling environment variables in the jenkins configure page, adding your variables then using the following in your jenkinsfile:

```
${env.YOUR_ENVIRONMENT_VARIABLE}
```

- https://stackoverflow.com/questions/48804361/jenkins-blue-ocean-environment-variables

Alternative approach to accessing secret variables:

- https://stackoverflow.com/questions/46291750/jenkins-blueocean-same-jenkinsfile-across-multiple-environments-while-passing

## Jenkins Credentials
- https://jenkins.io/doc/book/pipeline/jenkinsfile/#handling-credentials

## Jenkins Blue Ocean Parameters
- [Jenkins Blue Ocean Parameters](https://www.youtube.com/watch?v=5_tvlaIeQUQ)

- https://stackoverflow.com/questions/46659862/how-to-mask-a-password-field-in-jenkins-pipeline-project

## Building Docker And Pushing To Registry
- https://medium.com/@gustavo.guss/jenkins-building-docker-image-and-sending-to-registry-64b84ea45ee9