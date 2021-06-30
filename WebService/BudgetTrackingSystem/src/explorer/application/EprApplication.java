package explorer.application;

import org.springframework.boot.SpringApplication;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import explorer.application.bean.FileStorageProperties;





@SpringBootApplication
@EnableJpaAuditing
@EnableConfigurationProperties({
        FileStorageProperties.class
})
public class EprApplication extends SpringBootServletInitializer{

	public static void main(String[] args) {
		SpringApplication.run(EprApplication.class, args);
	}
	
	@Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
        return builder.sources(EprApplication.class);
    }
}
