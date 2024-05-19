https://www.bezkoder.com/react-spring-boot-mongodb/
# TODO:

# Initialize deployment
```bash

# Run the init script
docker exec -it \
   spreact_spring_container \
   bash


```


```sql
INSERT INTO ROLES_TBL(name) VALUES('ROLE_USER');
INSERT INTO ROLES_TBL(name) VALUES('ROLE_MODERATOR');
INSERT INTO ROLES_TBL(name) VALUES('ROLE_ADMIN');


show columns from roles_tbl;
INSERT INTO ROLES_TBL("name") VALUES('ROLE_USER');
INSERT INTO "ROLES_TBL" (id) VALUES(1);
select * from ROLES_TBL;

INSERT INTO ROLES_TBL(LABEL) VALUES('ROLE_USER');
INSERT INTO ROLES_TBL(LABEL) VALUES('ROLE_MODERATOR');
INSERT INTO ROLES_TBL(LABEL) VALUES('ROLE_ADMIN');

ALTER TABLE example_table DROP CONSTRAINT constraint_name


select * from ROLES_TBL;


```
##
https://medium.com/@ak123aryan/how-and-where-you-can-use-preauthorize-annotation-springboot-048751193b6f
This dude said that I can use @EnableMethodSecurity in the main class of my application

```java
@SpringBootApplication
@EnableMethodSecurity
public class StackApplication {
   public static void main(String[] args) {
      SpringApplication.run(StackApplication.class, args);
   }
}
```

Or use something like this
```java

@Controller
public class ResourceController {

    @GetMapping("/resource/{resourceId}")
    @PreAuthorize("@mySecurityService.isResourceOwner(authentication, #resourceId, ..anyOtherParametersIFpresent)")
    public String getResource(@PathVariable String resourceId) {
        // Your code here
        return "resource";
    }
}


@PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER') and @mySecurityService.isResourceOwner(authentication, #resourceId)")
```

hasAnyRole instead of hasRole

For more on how @PreAuthorize and @PostAuthorize annotations work see:
https://www.baeldung.com/spring-security-method-security
https://www.baeldung.com/spring-expression-language

@PreAuthorize("#username == authentication.principal.username")


george=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnZW9yZ2UiLCJpYXQiOjE3MTYxMTgyODUsImV4cCI6MTcxNjIwNDY4NX0.yw5vynV2iO3nyJI4K1a0KJfQqSrPLAH75kT7lysXfpo; Path=/api; HttpOnly; Expires=Mon, 20 May 2024 11:31:24 GMT;

george=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnZW9yZ2UiLCJpYXQiOjE3MTYxMTgyODUsImV4cCI6MTcxNjIwNDY4NX0.yw5vynV2iO3nyJI4K1a0KJfQqSrPLAH75kT7lysXfpo; Path=/api; HttpOnly; Expires=Mon, 20 May 2024 11:31:24 GMT;

george=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnZW9yZ2UiLCJpYXQiOjE3MTYxMTgyODUsImV4cCI6MTcxNjIwNDY4NX0.yw5vynV2iO3nyJI4K1a0KJfQqSrPLAH75kT7lysXfpo

eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnZW9yZ2UiLCJpYXQiOjE3MTYxMTgyODUsImV4cCI6MTcxNjIwNDY4NX0.yw5vynV2iO3nyJI4K1a0KJfQqSrPLAH75kT7lysXfpo

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

```bash

docker restart spreact_spring_container 
docker logs --follow spreact_spring_container 
```


