package ru.kata.spring.boot_security.demo.services;

import org.springframework.stereotype.Service;
import ru.kata.spring.boot_security.demo.models.Role;
import ru.kata.spring.boot_security.demo.repositories.RoleRepository;

@Service
public class RoleService {
    private final RoleRepository roleRepository;

    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }
    public Role getAdminRole() {
        return roleRepository.findByName("ROLE_ADMIN")
                .orElseGet(() ->roleRepository.save(new Role("ROLE_ADMIN")));
    }
    public Role getUserRole() {
        return roleRepository.findByName("ROLE_USER")
                .orElseGet(() ->roleRepository.save(new Role("ROLE_USER")));
    }
}
