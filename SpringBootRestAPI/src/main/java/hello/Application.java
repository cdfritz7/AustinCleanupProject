package hello;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }


    //enable global CORS - change this in development vs production
    @Bean
    public WebMvcConfigurer corsConfigurer() {
      return new WebMvcConfigurer() {
        @Override
        public void addCorsMappings(CorsRegistry registry){
          //dev
          //registry.addMapping("/austinCleanupAPI/*").allowedOrigins("http://localhost:3000");
          //production
          registry.addMapping("/austinCleanupAPI/*").allowedOrigins("https://www.sojoin.us");
        }
      };
    }

}
