package com.zecorode.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zecorode.domain.user.AuthenticationDTO;
import com.zecorode.domain.user.LoginResponseDTO;
import com.zecorode.domain.user.RegisterDTO;
import com.zecorode.domain.user.User;
import com.zecorode.infra.security.TokenService;
import com.zecorode.repositories.UserRepository;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody @Valid AuthenticationDTO authenticationDTO) {
        var emailPassword = new UsernamePasswordAuthenticationToken(authenticationDTO.email(),
                authenticationDTO.password());
        var auth = authenticationManager.authenticate(emailPassword);
        var token = tokenService.generateToken((User) auth.getPrincipal());
        return ResponseEntity.ok(new LoginResponseDTO(token));
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody @Valid RegisterDTO registerDTO) {
        if (this.userRepository.findByEmail(registerDTO.email()) != null) {
            return ResponseEntity.badRequest().build();
        }
        String encryptPassword = new BCryptPasswordEncoder().encode(registerDTO.password());
        var newUser = new User(registerDTO.email(), encryptPassword, registerDTO.role());
        this.userRepository.save(newUser);
        return ResponseEntity.ok().build();

    }
}
