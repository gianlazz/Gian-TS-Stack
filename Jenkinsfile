pipeline {
  environment {
    registry = "gianlazzarini/ts_stack_server"
    registryCredential = 'dockerhub'
    dockerImage = ''
  }
  agent {
      docker {
          image 'gianlazzarini/ts_face_server'
          args '-p 3000:3000'
      }
  }
  stages {
    stage('Cloning Git') {
      steps {
        git 'https://github.com/gianlazz/Gian-TS-Stack.git'
      }
    }
    stage('Build') {
      steps {
        sh 'cd server/ && npm install'
      }
    }
    // stage('Test') {
    //   steps {
    //     sh 'cd server/ && npm test'
    //   }
    // }
    stage('Building image') {
      steps{
        script {
          docker.build registry + ":$BUILD_NUMBER"
        }
      }
    }
    stage('Deploy Image') {
      steps{
        script {
          docker.withRegistry( '', registryCredential ) {
            dockerImage.push()
          }
        }
      }
    }
    stage('Remove Unused docker image') {
      steps{
        sh "docker rmi $registry:$BUILD_NUMBER"
      }
    }
  }
}