

docker run -p 80:8080 -p 50000:50000 -v jenkins_home:/var/jenkins_home jenkins/jenkins:lts

pipeline {
    agent {
        docker { image 'node:latest' }
    }
    options {
        buildDiscarder(logRotator(numToKeepStr: '10')) 
    }
    stages {
        stage('Clone') {
            steps {
                checkout scm
            }
        }
        stage('Install') {
            steps {
                sh 'npm install'
            }
        }
        stage('Build') {
            steps {
                script {
                    def NPM_BUILD = ":${env.BRANCH_NAME}"

                    if(NPM_BUILD == ':master') {
                        NPM_BUILD = ''
                    }

                    sh "npm run build${NPM_BUILD}"
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    echo "Here we do the deploy"
                }
            }
        }  
    }
}
