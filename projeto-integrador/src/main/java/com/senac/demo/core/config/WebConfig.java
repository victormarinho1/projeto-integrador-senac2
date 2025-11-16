package com.senac.demo.core.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Configura o Spring para servir imagens do diretório /static/images/
        registry.addResourceHandler("/images/**")
                .addResourceLocations("file:/app/uploads/images/");
    }
}
