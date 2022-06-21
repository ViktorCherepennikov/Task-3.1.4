package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.RestController;
import ru.kata.spring.boot_security.demo.models.User;
import ru.kata.spring.boot_security.demo.services.UserService;

import java.security.Principal;


@Controller
@RestController
public class MainController {
    private UserService userService;
    @Autowired
    public MainController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/hello")
    public String sayHello(){
        return "hello";
    }
    @GetMapping("/authenticated")
    public String pageForAuthUser(Principal principal) {
        User user = userService.findByUsername(principal.getName());
        return "secured part of web service: " + user.toString();
    }
}
