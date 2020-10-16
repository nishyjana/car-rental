package com.nishy.banger.Entity;

import lombok.*;


import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString

public class Customers {
    @Id
    @GeneratedValue
    private int customerID;
    private String username;

    private String email;
    private String password;



    private String TelePhone;
    private Boolean UserStatus;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            joinColumns = @JoinColumn(),
            inverseJoinColumns = @JoinColumn())
    private Set<Role> roles = new HashSet<>();
    private String DrivingLicnese;
    private String NIC;



}
