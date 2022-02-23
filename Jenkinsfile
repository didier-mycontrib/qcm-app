pipeline {
    agent any

    stages {
        stage('Hello') {
            steps {
                echo 'qcm-app with dist/qcm-app already built in this V1 '
            }
		}
		stage('Checkout code') {
			steps {
			   ws("/conf-docker/frontends-angular/my-frontends/qcm-app") {
				  checkout scm
			   }
			}
		}
		stage('copy ddc-app from ./qcm-app/dist to ./frontends-content') {
			steps {
			    ws("/conf-docker/frontends-angular/my-frontends") {
				     sh('rm -r ./frontends-content/qcm-app')
				     sh('cp -r ./qcm-app/dist/qcm-app ./frontends-content')
				}
			}
		}
    }
}
