pipeline {
  environment {
    registry = "gianlazzarini/ts_stack_server"
    registryCredential = 'dockerhub'
    dockerImage = ''
  }
  agent { dockerfile true }
  stages {
    stage('Deploy') {
      steps{
        sshagent(credentials : ['fb01b444-0666-4510-a47a-99fa4df46948']){
          sh "ssh -o StrictHostKeyChecking=no -l root 104.248.70.206 uname -a"
          sh """ssh root@104.248.70.206 \
            docker ps
          """
          // sh "ssh root@104.248.70.206 \"rm -r Gian-TS-Stack && git clone https://github.com/gianlazz/Gian-TS-Stack.git\""
          // sh "scp $(pwd)/docker-compose.yml root@104.248.70.206:/root/Gian-TS-Stack/docker-compose.yml"
          // sh "ssh root@104.248.70.206 \"docker-compose -f /root/Gian-TS-Stack/docker-compose.yml down"
          // sh "ssh root@104.248.70.206 \"docker-compose -f /root/Gian-TS-Stack/docker-compose.yml pull\""
          // sh "ssh root@104.248.70.206 \"docker-compose -f /root/Gian-TS-Stack/docker-compose.yml up -d\""
        }
      }
    }
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
    // stage('Deploy') {
    //   steps{
    //     sshagent(credentials : ['StackExampleServerKey']){
    //       sh "ssh root@104.248.70.206"
    //       // sh "ssh root@104.248.70.206 \"rm -r Gian-TS-Stack && git clone https://github.com/gianlazz/Gian-TS-Stack.git\""
    //       // sh "scp $(pwd)/docker-compose.yml root@104.248.70.206:/root/Gian-TS-Stack/docker-compose.yml"
    //       // sh "ssh root@104.248.70.206 \"docker-compose -f /root/Gian-TS-Stack/docker-compose.yml down"
    //       // sh "ssh root@104.248.70.206 \"docker-compose -f /root/Gian-TS-Stack/docker-compose.yml pull\""
    //       // sh "ssh root@104.248.70.206 \"docker-compose -f /root/Gian-TS-Stack/docker-compose.yml up -d\""
    //     }
    //   }
    // }

  }
}