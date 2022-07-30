package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.models.Role;
import ru.kata.spring.boot_security.demo.models.User;
import ru.kata.spring.boot_security.demo.services.RoleService;
import ru.kata.spring.boot_security.demo.services.UserService;

import java.security.Principal;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api")
public class AdminRestController {

        private UserService userService;
        private RoleService roleService;

        public AdminRestController(UserService userService, RoleService roleService) {
            this.userService = userService;
            this.roleService = roleService;
        }
        @GetMapping("/admin")
        public ResponseEntity<List<User>> allUsers() {
            List<User> users = userService.findAll();
            return  new ResponseEntity<>(users, HttpStatus.OK);
        }

        @GetMapping("/admin/{id}")
        public ResponseEntity<User> showUser(@PathVariable Long id) {
            User user = userService.findById(id);
            return user != null
                    ? new ResponseEntity<>(user, HttpStatus.OK)
                    : new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        @PostMapping("/admin")
        public ResponseEntity<User> addUser(@RequestBody User user) {
            userService.saveUser(user);
            return new ResponseEntity<>(user, HttpStatus.CREATED);
        }

        @PatchMapping("/admin/{id}")
        public ResponseEntity<User> updateUser(@RequestBody User user,@PathVariable Long id) {
            userService.saveUser(user);
            return new ResponseEntity<>(user, HttpStatus.OK);
        }

        @DeleteMapping("/admin/{id}")
        public ResponseEntity<User> deleteUser(@PathVariable Long id) {
            userService.deleteById(id);
            return new ResponseEntity<>(HttpStatus.OK);
        }

//        @GetMapping("/viewUser")
//        public ResponseEntity<User> showUser(Authentication auth) {
//            return new ResponseEntity<>((User) auth.getPrincipal(), HttpStatus.OK);
//        }

//        @GetMapping("/roles")
//        public ResponseEntity<Set<Role>> getAllRoles() {
//            return new ResponseEntity<>(roleService.findAll(), HttpStatus.OK);
//        }


//    @GetMapping("/admin/create")
//    public String createUserForm(User user, Model model) {
//        model.addAttribute("roleAdmin", roleService.getAdminRole());
//        model.addAttribute("roleUser", roleService.getUserRole());
//        return "newUser";
//    }
//
//    @PostMapping("/admin/create")
//    public String createUser(@ModelAttribute("user") User user) {
//        userService.saveUser(user);
//        return "redirect:/admin";
//    }

//    @DeleteMapping("admin/delete")
//    public String deleteUser(@ModelAttribute("user") User user) {
//        userService.deleteById(user.getId());
//        return "redirect:/admin";
//    }
//
//    @PatchMapping("admin/edit")
//    public String editUser(@ModelAttribute("user") User user) {
//        userService.saveUser(user);
//        return "redirect:/admin";
//    }
//    @GetMapping("/")
//    public String getLoginPage() {
//        return "redirect:/login";
//    }
//
//    @GetMapping("/login")
//    public String getLoginPage2() {
//        return "login";
//    }

}
