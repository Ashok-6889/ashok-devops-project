pipeline {
  agent any

  environment {
    IMAGE_NAME = "ashok6889/ashok-ui:latest"
  }

  stages {

    stage('Checkout Code') {
      steps {
        checkout scm
      }
    }

    stage('Docker Build') {
      steps {
        dir('frontend-react') {
          sh "docker build -t ${IMAGE_NAME} ."
        }
      }
    }

    stage('Docker Login') {
      steps {
        withCredentials([usernamePassword(
          credentialsId: 'docker-cre',
          usernameVariable: 'DOCKER_USER',
          passwordVariable: 'DOCKER_PASS'
        )]) {
          sh '''
            echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
          '''
        }
      }
    }

    stage('Docker Push') {
      steps {
        sh "docker push ${IMAGE_NAME}"
      }
    }

    stage('Deploy to EKS') {
      steps {
        sh 'kubectl apply -f kubernetes/'
      }
    }

    stage('Verify Deployment') {
      steps {
        sh 'kubectl get pods'
        sh 'kubectl get svc'
      }
    }
  }
}
