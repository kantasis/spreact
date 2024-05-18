package com.tutorials.spring_react;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
public class SpringReactApplication {

   public static void main(String[] args) {
      System.out.println("--- GK> Starting the application");
      SpringApplication.run(SpringReactApplication.class, args);
      System.out.println("--- GK> Started the application");

   }

   @RestController
   class HelloController {

      @GetMapping("/hello")
      // TODO: The port should be referenced here: HOST_NODE_PORT
      @CrossOrigin(origins = "http://localhost:9080")
      public String hello() {
         System.out.println("--- GK> Someone said hi!");
         return "Hello, Spring Boot!!!!";
      }
   }

}
