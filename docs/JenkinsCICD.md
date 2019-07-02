# Jenkins Blue Ocean CI CD Setup

## Table of Contents
- [Using Environment Variables](#using-environment-variables)
- [Jenkins Blue Ocean Parameters](#jenkins-blue-ocean-parameters)

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