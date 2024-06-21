pipeline{
    agent {label "aws"}
    environment {
    TEST_RESULT_FILE = 'test_result.txt'
    }

 stages{
        stage('Testing Environment'){
            steps{
              sh 'ssh -T -oStrictHostKeyChecking=no -i "$TOKENAWS" ec2-user@35.170.50.195 " sudo dnf update; sudo dnf install git -y; sudo dnf install -y httpd; sudo systemctl start httpd; sudo rm -Rf /var/www/html/; sudo git clone https://github.com/Voloshynb/FinalExam-SQAC114 /var/www/html"'
              script{
                try{
                    sh 'npm install selenium-webdriver'
                    
                    def output = sh(script: 'node test/test1.js', returnStdout: true).trim()

                    echo "Test Output: ${output}"


                    if(output.contains('Test Success')){
                        writeFile file: env.TEST_RESULT_FILE, text: 'true'
                    }else{
                        writeFile file: env.TEST_RESULT_FILE, text: 'false'
                    }
                }catch (Exception e) {
                    echo "Test failed: ${e.message}"
                    writeFile file: env.TEST_RESULT_FILE, text: 'false'
                }
            }
             }
        } 
            stage('Staging Environment'){
                when{
                  expression {
                   def testResult = readFile(env.TEST_RESULT_FILE).trim()
                   return testResult == 'true'
                   }           
             }
            steps{
                sh 'ssh -T -oStrictHostKeyChecking=no -i "$TOKENAWS" ec2-user@35.170.50.195 " sudo dnf update; sudo dnf install git -y; sudo dnf install -y httpd; sudo systemctl start httpd; sudo rm -Rf /var/www/html/; sudo git clone https://github.com/Voloshynb/FinalExam-SQAC114 /var/www/html"'
         } 
        }
        stage('Production Environment 1'){
              when{
               expression {
                def testResult = readFile(env.TEST_RESULT_FILE).trim()
                return testResult == 'true'
                }           
             }
            steps{
             sh 'ssh -T -oStrictHostKeyChecking=no -i "$TOKENAWS" ec2-user@35.170.50.195 " sudo dnf update; sudo dnf install git -y; sudo dnf install -y httpd; sudo systemctl start httpd; sudo rm -Rf /var/www/html/; sudo git clone https://github.com/Voloshynb/FinalExam-SQAC114 /var/www/html"'
            }
        } 
        stage('Production Environment 2'){
             when{
               expression {
                def testResult = readFile(env.TEST_RESULT_FILE).trim()
                return testResult == 'true'
                    }           
                }
                steps{
                sh 'ssh -T -oStrictHostKeyChecking=no -i "$TOKENAWS" ec2-user@35.170.50.195 " sudo dnf update; sudo dnf install git -y; sudo dnf install -y httpd; sudo systemctl start httpd; sudo rm -Rf /var/www/html/; sudo git clone https://github.com/Voloshynb/FinalExam-SQAC114 /var/www/html"'
                    }
                }
            }

 }