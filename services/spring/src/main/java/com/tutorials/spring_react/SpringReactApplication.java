package com.tutorials.spring_react;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
public class SpringReactApplication {

   public static void main(String[] args) {
      SpringApplication.run(SpringReactApplication.class, args);
   }

   @RestController
   class HelloController {

      @GetMapping("/hello")
      public String hello() {
         return "Hello, Spring Boot!!!!46653436";
      }
   }

}
