package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.models.User;
import ru.kata.spring.boot_security.demo.services.RoleService;
import ru.kata.spring.boot_security.demo.services.RoleServiceImpl;
import ru.kata.spring.boot_security.demo.services.UserService;
import ru.kata.spring.boot_security.demo.services.UserServiceImpl;

import java.security.Principal;

@Controller
public class AdminController {
    private final UserService userService;
    private final RoleService roleService;

    public AdminController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping("/admin")
    public String pageForAdmin(Model model, Principal principal, User user) {
        User admin = userService.findByUsername(principal.getName());
        model.addAttribute("user", user);
        model.addAttribute("admin", admin);
        model.addAttribute("users", userService.findAll());
        model.addAttribute("roleAdmin", roleService.getAdminRole());
        model.addAttribute("roleUser", roleService.getUserRole());
        return "admin";
    }

    @GetMapping("/admin/admin-user")
    public String pageForAuthUser(Model model, Principal principal) {
        User user = userService.findByUsername(principal.getName());
        model.addAttribute("user", user);
        return "admin-user";
    }

    @GetMapping("/admin/create")
    public String createUserForm(User user, Model model) {
        model.addAttribute("roleAdmin", roleService.getAdminRole());
        model.addAttribute("roleUser", roleService.getUserRole());
        return "newUser";
    }

    @PostMapping("/admin/create")
    public String createUser(@ModelAttribute("user") User user) {
        userService.saveUser(user);
        return "redirect:/admin";
    }

    @DeleteMapping("admin/delete")
    public String deleteUser(@ModelAttribute("user") User user) {
        userService.deleteById(user.getId());
        return "redirect:/admin";
    }

    @PatchMapping("admin/edit")
    public String editUser(@ModelAttribute("user") User user) {
        userService.saveUser(user);
        return "redirect:/admin";
    }
    @GetMapping("/")
    public String getLoginPage() {
        return "redirect:/login";
    }

    @GetMapping("/login")
    public String getLoginPage2() {
        return "login";
    }

}
