package com.staged.spring.infrastructure;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class InfrastructureApplication {

	public static void main(String[] args) {
		if(args.length == 0) {
			System.out.println("Starting Staged with no args");
		}
		SpringApplication.run(InfrastructureApplication.class, args);
	}

}
