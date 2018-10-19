pipeline {
    agent {
        docker { image 'node:latest' }
    }
    options {
        buildDiscarder(logRotator(numToKeepStr: '10')) 
    }
    stages {
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
