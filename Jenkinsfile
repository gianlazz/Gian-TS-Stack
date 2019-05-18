
pipeline {
  agent {
    docker {
      image 'tiangolo/docker-with-compose'
    }
  }
  stages {
    stage('Docker-compose build') {
      steps {
        sh 'docker-compose build --no-cache'
      }
    }
    stage('compose up') {
      steps {
        sh 'docker-compose up'
      }
    }
    stage('compose down') {
      steps {
        sh 'docker-compose down'
      }
    }
    // stage('Deploy to cluster') {
    //     when {
    //         branch 'deploy-to-cluster'
    //     }
    //     steps {
    //         sh './ci-cd/deploy-to-cluster.sh'
    //         input message: 'Finished using the web site? (Click "Proceed" to continue)'
    //     }
    // }
  }
}