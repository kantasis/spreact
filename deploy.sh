#!/bin/bash

# . .env
docker compose stop

docker compose up --build -d 
# --remove-orphans
