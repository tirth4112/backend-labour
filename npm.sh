#!/bin/bash

# Change to the directory of the api-gateway service
cd ./api-gateway
echo "Installing Node modules for api-gateway"
npm install

# Check if the installation was successful
if [ $? -eq 0 ]; then
  echo "Node modules installed successfully for api-gateway"
else
  echo "Error installing Node modules for api-gateway"
fi

# Change to the directory of the auth-service
cd ../publish-services/auth-service
echo "Installing Node modules for auth-service"
npm install

# Check if the installation was successful
if [ $? -eq 0 ]; then
  echo "Node modules installed successfully for auth-service"
else
  echo "Error installing Node modules for auth-service"
fi

# Change to the directory of the Registration-service
cd ../Registration-service
echo "Installing Node modules for Registration-service"
npm install

# Check if the installation was successful
if [ $? -eq 0 ]; then
  echo "Node modules installed successfully for Registration-service"
else
  echo "Error installing Node modules for Registration-service"
fi

echo "Node modules installation completed for all services"
