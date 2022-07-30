package ru.kata.spring.boot_security.demo.services;

import org.springframework.stereotype.Service;
import ru.kata.spring.boot_security.demo.models.Role;
import ru.kata.spring.boot_security.demo.repositories.RoleRepository;

import javax.transaction.Transactional;
import java.util.HashSet;
import java.util.Set;

@Service
public class RoleServiceImpl implements RoleService {
    private final RoleRepository roleRepository;

    public RoleServiceImpl(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }
    @Override
    @Transactional
    public Role getAdminRole() {
        return roleRepository.findByName("ROLE_ADMIN")
                .orElseGet(() ->roleRepository.save(new Role("ROLE_ADMIN")));
    }
    @Override
    @Transactional
    public Role getUserRole() {
        return roleRepository.findByName("ROLE_USER")
                .orElseGet(() ->roleRepository.save(new Role("ROLE_USER")));
    }
//    @Override
//    @Transactional
//    public Set<Role> findAll() {
//        return new HashSet<>(roleRepository.findAll());
//    }
}
