pipeline {
    agent any
    tools{
        nodejs "Node20"
    }
    environment {
        REGISTRY = "docker.io"
        DOCKERHUB_CREDENTIALS = "dockerhub-creds"   // Jenkins credential ID
        DOCKER_IMAGE = "your-dockerhub-username/express-app"
        SONARQUBE_ENV = "SonarQube"  
        BACKEND_DIR = "server"
        FRONTEND_DIR = "client"               // Jenkins SonarQube installation name
    }

    stages {
        stage('Checkout') {
            steps {
                 git branch: 'main',
                    url: 'https://github.com/khalid21456/Anime-Frog.git/'
            }
        }

        // stage('Dependency Check') {
        //     steps {
        //         dir("${BACKEND_DIR}") {
        //             echo "Running OWASP Dependency Check..."
        //             dependencyCheck additionalArguments: '--scan ./ --format HTML', odcInstallation: 'db-check'
        //             dependencyCheckPublisher pattern: '**/dependency-check-report.html'
        //         }
        //     }
        // }

   stage('Sonarqube Analysis') {
    steps {
        dir("${BACKEND_DIR}") {
            sh 'npm install'
            sh 'npm run sonar:sonar'
        }
    }
}


        stage('Run Tests') {
            steps {
                dir("${BACKEND_DIR}") {
                    echo "Running npm tests..."
                    sh 'npm install'
                    sh 'npm test'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                dir("${BACKEND_DIR}") {
                    echo "Building Docker image..."
                    sh "docker build -t $DOCKER_IMAGE:\${BUILD_NUMBER} ."
                }
            }
        }

        stage('Push to DockerHub') {
            steps {
                echo "Pushing Docker image to Docker Hub..."
                withCredentials([usernamePassword(credentialsId: "${DOCKERHUB_CREDENTIALS}", usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh """
                        echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                        docker push $DOCKER_IMAGE:\${BUILD_NUMBER}
                        docker tag $DOCKER_IMAGE:\${BUILD_NUMBER} $DOCKER_IMAGE:latest
                        docker push $DOCKER_IMAGE:latest
                    """
                }
            }
        }
    }

}
