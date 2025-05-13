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
import com.zecorode.domain.user.SystemRole;
import com.zecorode.domain.user.User;
import com.zecorode.infra.security.TokenService;
import com.zecorode.repositories.UserRepository;
import com.zecorode.services.AuthorizationService;
import com.zecorode.services.StudentService;
import com.zecorode.services.TeacherService;

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

    @Autowired
    private StudentService studentService;

    @Autowired
    private TeacherService teacherService;

    @Autowired
    private AuthorizationService authorizationService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody @Valid AuthenticationDTO authenticationDTO) {
        Long userId = null;
        var emailPassword = new UsernamePasswordAuthenticationToken(authenticationDTO.email(),
                authenticationDTO.password());
        var auth = authenticationManager.authenticate(emailPassword);
        User authenticatedUser = (User) auth.getPrincipal();
        var token = tokenService.generateToken(authenticatedUser);

        if (authenticatedUser.getRole() == SystemRole.STUDENT) {
      
            var student = studentService.findByEmail(authenticatedUser.getEmail());
            userId = student.getId();
        }

        if (authenticatedUser.getRole() == SystemRole.TEACHER) {
          
            var teacher = teacherService.findByEmail(authenticatedUser.getEmail());
            userId = teacher.getId();
        }
        return ResponseEntity.ok(new LoginResponseDTO(userId, authenticatedUser.getRole(), token));
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody @Valid RegisterDTO registerDTO) {
        if (this.userRepository.findByEmail(registerDTO.email()) != null) {
            return ResponseEntity.badRequest().build();
        }
        String encryptPassword = new BCryptPasswordEncoder().encode(registerDTO.password());
        var newUser = new User(registerDTO.email(), encryptPassword, registerDTO.role());
        authorizationService.create(newUser);
        return ResponseEntity.ok().build();

    }
}
