pipeline {
    agent any

    environment { 
    FRONTEND_IMAGE:"mern-frontend:jenkins"
    BACKEND_IMAGE:"mern-backend:jenkins"
    PORT="5000"
    MONGO_URI="mongodb://mongo:27017/taskdb"
    }

    stages {
        stage("Checkout Code"){
            steps {
                git url: 'https://github.com/sujitsingh08rdm/devops-ecommerce-practice.git' , branch: 'main'
            }
        }
        stage("Prepare .env"){
            steps {
              sh '''
                mkdir -p server 
                cat > server/.env <<EOF
                PORT=$PORT
                MONGO_URI=$MONGO_URI
                CLIENT_BASE_URL=$CLIENT_BASE_URL
                CLOUDINARY_API_KEY=$CLOUDINARY_API_KEY
                CLOUDINARY_API_SCRIPT=$CLOUDINARY_API_SCRIPT
                PAYPAL_CLIENT_ID=$PAYPAL_CLIENT_ID
                PAYPAL_CLIENT_SECRET=$PAYPAL_CLIENT_SECRET
                CLOUDINARY_CLOUD_NAME=$CLOUDINARY_CLOUD_NAME
                EOF
                '''
            }
        }
        stage("Build Docker Images"){
            steps {
                sh '''
                echo "building backend image..."
                docker build -t $BACKEND_IMAGE ./server

                echo "building frontend image..."
                docker build -t $FRONTEND_IMAGE ./client --build-arg VITE_API_URL=http://localhost:5000
                '''
            }
        }
        stage("Run these images with docker compose"){
            steps {
                sh '''
                echo "starting mern app with docker compose"
                docker compose up -d
                echo "show running containers"
                docker ps
                echo "===== Backend logs ====="
                docker logs backed || true
                echo "===== Frontend logs ====="
                docker logs frontend || true
                '''
            }
        }
    }
}