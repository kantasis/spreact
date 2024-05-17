https://www.bezkoder.com/react-spring-boot-mongodb/
# TODO:

# Initialize deployment
```bash

# Run the init script
docker exec -it \
   spreact_spring_container \
   bash


```

## React

Initialization of a react project
```bash
docker exec -it \
   spreact_ubuntu_container \
   bash

cd /app
npm create vite@latest spreact_react_app -- --template react-ts
cd spreact_react_app
npm install bootstrap
npm install axios
npm install @types/react-router-dom


npm install react-auth-kit
npm install @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome@latest

sudo chown george:george -R *

npm install

npm run dev -- --host 0.0.0.0

```



# SpringBoot - React - JWT - H2 
https://www.bezkoder.com/spring-boot-security-login-jwt/


# General
