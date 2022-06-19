package ru.kata.spring.boot_security.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.User;

public interface UserRepository extends JpaRepository<User,Long> {
    ru.kata.spring.boot_security.demo.models.User findByUsername(String username);
}
