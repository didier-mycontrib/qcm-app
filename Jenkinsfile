pipeline {
    agent any
    stages {
	    //stage('from_git') {
        //    steps {
        //          git url : 'https://github.com/didier-mycontrib/qcm-app' , branch : 'main'
        //    }
        //}
        stage('npm_install') {
            steps {
				echo 'npm install'
				sh 'npm install'
            }
        }
		stage('tests') {
            steps {
				echo 'run ic script of package.json (start-server-and-test(http-server,3000,cypress))'
				//sh 'npm run ic'
            }
        }
    }
}
