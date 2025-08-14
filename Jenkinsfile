pipeline {
    //agent any
    agent {
        docker {
		 //image 'node:22' 
		 //https://github.com/didier-mycontrib/jenkins-dind build-docker-images/node_ts_cypress
		 //prepared image with node:24, typescript, cypress , ...
		 image 'didierdefrance69/node_ts_cypress:1'  
		}
    }
	environment{
	    //NB: credential_dockerhub_didierdefrance69 is ID of credential
		//prepared in "Admin Jenkins / Credentials / system /global"
		dockerhub_credential_id='credential_dockerhub_didierdefrance69'
		
		//dockerRegistry is dockerhub
		docker_registry= 'https://registry.hub.docker.com'
		
		docker_image_name='didierdefrance69/qcm_app:1'
	}
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
		stage('unit-tests') {
            steps {
				echo 'run angular unit tests'
				//sh 'npm run test'
            }
        }
		stage('build') {
            steps {
				echo 'build angular app with ssr'
				sh 'npm run build'
            }
        }
		stage('ic-tests') {
            steps {
				echo 'run ic script of package.json (start-server-and-test(ssr-qcm-app-server,4000,cypress))'
				sh 'npm run ic'
            }
        }
		stage('build_docker_image') {
	     steps {
		     script{ 
			      dockerImage = docker.build(docker_image_name)
			    }
		    } 
		}
		stage('push_docker_image') {
            steps {
			  script{
					echo "docker_registry=" + docker_registry
					echo "dockerhub_credential_id=" +dockerhub_credential_id
					docker.withRegistry( docker_registry, dockerhub_credential_id ) { 
					     dockerImage.push() 
						 }
					  }
				  }
		}
    }
}
