package com.nishy.banger.Repo;

import com.nishy.banger.Entity.Role;
import com.nishy.banger.Entity.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface RoleRepo extends JpaRepository<Role, Integer> {
    Optional<Role> findByName(RoleName roleName);
}
