# Chat-Application

Chat Application (Backend: Dotnet , Frontend: Angular)

## Pre-Requisites

1. Install Docker & Docker Compose

    - If you are on Windows then simply install docker desktop ( this also includes docker compose ) 
        - ` https://www.docker.com/products/docker-desktop/ `
    - If you are on Linux then execute these commands one by one on the terminal 
        ``` 
        curl -fsSL https://get.docker.com -o get-docker.sh 
        sudo sh get-docker.sh 
        sudo apt-get install docker-compose-plugin
        ```

2. Install git and login with your account

    - If you are on Windows then download git 
      -  ` https://www.git-scm.com/downloads `
    - If you are on Ubuntu Linux then execute this command 
      - ` sudo apt-get install git `

## To Run The Project

1. Clone the project
    - ` git clone https://github.com/saquibmansuri/Chat-Application `

2. Go to the project directory
    - For windows - Open file explorer and navigate to the "Chat-Application" directory
    - For linux - ` cd Chat-Application `

3. Set environment variables in env files (if updated)
    - For frontend - "fe.env"
    - for backend  - "be.env"

4. Setup docker containers for frontend, backend and database
    - Note: For both windows and linux, open terminal and execute the following command
    - ` docker compose -f docker-compose-local.yml up -d `

## To Access The Project

1. To open frontend project, go to this URL on browser 
    - ` http://localhost:4200 `
  
2. To open backend project, go to this URL on browser 
    - ` http://localhost:7218 `
