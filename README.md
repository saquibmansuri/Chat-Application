# Chat-Application
Chat Application (Backend: Dotnet , Frontend: Angular)

# Pre-requisites
1. Install Docker & Docker Compose
  - If you are on Windows then simply install docker desktop ( this also includes docker compose )
  - If you are on Linux then execute these commands one by one on the terminal
        curl -fsSL https://get.docker.com -o get-docker.sh
        sudo sh get-docker.sh
        sudo apt-get install docker-compose-plugin
2. Install git and login with your account
  - If you are on Windows then download git
  - If you are on Linux then execute this command
        sudo apt-get install git
      
# To run the project
1. Clone the project - git clone https://github.com/saquibmansuri/Chat-Application
2. Go to the project directory - cd Chat-Application
3. Setup docker containers for frontend, backend and database - docker compose -f docker-compose-local.yml up -d

# To access the project
1. To open frontend project, go to this URL on browser - http://localhost:4200
2. To open backend project, go to this URL on browser - http://localhost:7218