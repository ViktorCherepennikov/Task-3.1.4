package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.kata.spring.boot_security.demo.models.User;
import ru.kata.spring.boot_security.demo.services.UserServiceImpl;

import java.security.Principal;

@RestController
@RequestMapping("/api")
public class UserRestController {
    private UserServiceImpl userService;
    public UserRestController(UserServiceImpl userService) {
        this.userService = userService;
    }
        @GetMapping("/user")
        public ResponseEntity<User> showUser(Authentication auth) {
            return new ResponseEntity<>((User) auth.getPrincipal(), HttpStatus.OK);
        }


}
