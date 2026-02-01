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

    /* 🔧 NEW: Install dependencies */
    stage('NPM Install') {
      steps {
        dir('frontend-react') {
          sh 'npm install'
        }
      }
    }

    /* 🔧 NEW: Build React App */
    stage('NPM Build') {
      steps {
        dir('frontend-react') {
          sh 'npm run build'
        }
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
          sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --pa
