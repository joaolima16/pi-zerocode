package com.zecorode.infra.security;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfigurations {

    @Autowired
    private SecurityFilter securityFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf((csrf) -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(HttpMethod.POST, "/auth/login").permitAll()
                        .requestMatchers(HttpMethod.POST, "/auth/register").permitAll()
                        .requestMatchers(HttpMethod.POST, "/students/create").permitAll()
                        .requestMatchers(HttpMethod.GET, "/students/{id}").permitAll()
                        .requestMatchers(HttpMethod.PUT, "/students/update/{id}").permitAll()
                        .requestMatchers(HttpMethod.DELETE, "students/delete/{id}").permitAll()
                        .requestMatchers(HttpMethod.POST, "/teacher/create").permitAll()
                        .requestMatchers(HttpMethod.GET, "/teacher").permitAll()
                        .requestMatchers(HttpMethod.GET, "/teacher/{id}").permitAll()
                        .requestMatchers(HttpMethod.PUT, "/teacher/{id}").permitAll()
                        .requestMatchers(HttpMethod.POST,"/courses").permitAll()
                        .requestMatchers(HttpMethod.GET,"/courses/all").permitAll()
                        .requestMatchers(HttpMethod.GET,"/courses/{id}").permitAll()
                        .requestMatchers(HttpMethod.POST,"/courses/{studentId}/purchase/{courseId}").permitAll()
                        .requestMatchers(HttpMethod.POST,"/classroom").permitAll()
                        .requestMatchers(HttpMethod.GET,"/classroom/all").permitAll()
                        .requestMatchers(HttpMethod.POST,"/schedules").permitAll()      
                        .anyRequest().authenticated())
                .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
            throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://127.0.0.1:5500",
                "http://localhost:3000", "null"));

        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
