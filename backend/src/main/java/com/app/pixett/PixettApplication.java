package com.app.pixett;



import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;

@SpringBootApplication(scanBasePackages={
"com.app.pixett"}
,exclude = {SecurityAutoConfiguration.class }
)
@EntityScan(basePackages = { "com.app.pixett.entities" })
public class PixettApplication {
	
	@Bean
	   public ModelMapper modelMapper() {
	      ModelMapper modelMapper = new ModelMapper();
	      return modelMapper;
	   }
	
	/*@Bean
	  public PasswordEncoder passwordEncoder() {
	    return new Argon2PasswordEncoder(16, 32, 8, 1 << 16, 4);
	  }*/
  public static void main(String[] args) {
    SpringApplication.run(PixettApplication.class, args);
  }

}