#!/bin/bash

# Function to open Git Bash window and run npm start
function open_gitbash() {
  cmd.exe /c start "" "C:\Program Files\Git\bin\bash.exe" -c "cd '$1' && npm start"
}

# Paths to your services
services=(
  "/api-gateway"
  "/publish-services/auth-service"
  "/publish-services/Registration-service"
)

# Loop through services and open Git Bash windows
for service in "${services[@]}"; do
  open_gitbash "$service"
done

echo "Services started in separate Git Bash windows"
