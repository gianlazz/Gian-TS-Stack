pipeline {
  environment {
    registry = "gianlazzarini/ts_stack_server"
    registryCredential = 'dockerhub'
    dockerImage = ''
    ACCESS_TOKEN_SECRET = credentials('ACCESS_TOKEN_SECRET')
    EMAIL_FROM_ADDRESS = credentials('EMAIL_FROM_ADDRESS')
    EMAIL_PASSWORD = credentials('EMAIL_PASSWORD')
  }
  agent { dockerfile true }
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
          dockerImage = docker.build registry + ":$BUILD_NUMBER"
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
    stage('Deploy for production') {
      when {
        branch 'master'
      }
      steps{
        sshagent(credentials : ['fb01b444-0666-4510-a47a-99fa4df46948']){
          sh "ssh -o StrictHostKeyChecking=no -l root 104.248.70.206 uname -a"
          sh """ssh root@104.248.70.206 \
            docker ps
          """
          sh """ssh root@104.248.70.206 \
            rm -r -f Gian-TS-Stack/
          """
          sh """ssh root@104.248.70.206 \
            git clone https://github.com/gianlazz/Gian-TS-Stack.git \
            && \
            cd Gian-TS-Stack \
            && \
            docker-compose down \
            && \
            ACCESS_TOKEN_SECRET=$ACCESS_TOKEN_SECRET EMAIL_FROM_ADDRESS=$EMAIL_FROM_ADDRESS EMAIL_PASSWORD=$EMAIL_PASSWORD docker-compose pull \
            && \
            ACCESS_TOKEN_SECRET=$ACCESS_TOKEN_SECRET EMAIL_FROM_ADDRESS=$EMAIL_FROM_ADDRESS EMAIL_PASSWORD=$EMAIL_PASSWORD docker-compose up -d
          """
        }
      }
    }
  }
}