#!/bin/bash

# Usage: ./health_check.sh <health-check-url>

health_check_url=$1

# Initial delay to allow the application to start
echo "Waiting for 2 minutes to allow the app to load..."
sleep 300

# Retry logic
max_attempts=5
attempt=1
while [ $attempt -le $max_attempts ]
do
  echo "Attempt $attempt of $max_attempts: Checking health at $health_check_url..."
  if curl -f $health_check_url; then
    echo "Health check passed!"
    exit 0
  else
    echo "Health check failed!"
    if [ $attempt -eq $max_attempts ]; then
      echo "Maximum attempts reached. Exiting with error..."
      exit 1
    fi
    echo "Waiting 30 seconds before retrying..."
    sleep 30
  fi
  ((attempt++))
done
