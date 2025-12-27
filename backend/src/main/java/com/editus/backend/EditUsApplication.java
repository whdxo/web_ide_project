package com.editus.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class EditUsApplication {

    public static void main(String[] args) {
        SpringApplication.run(EditUsApplication.class, args);
    }

}
