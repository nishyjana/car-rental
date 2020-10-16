package com.nishy.banger.jwt;
import com.nishy.banger.Entity.Customers;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

public class UserPrincipal implements UserDetails {
    private int customerID;



    private String userName;

    @JsonIgnore
    private String email;

    @JsonIgnore
    private String password;

    private Collection<? extends GrantedAuthority> authorities;

    public UserPrincipal(int customerID, String userName, String email, String password, Collection<? extends GrantedAuthority> authorities) {
        this.customerID = customerID;

        this.userName = userName;
        this.email = email;
        this.password = password;
        this.authorities = authorities;
    }

    public static UserPrincipal create(Customers user) {
        List<GrantedAuthority> authorities = user.getRoles().stream().map(Role ->
                new SimpleGrantedAuthority(Role.getName().name())
        ).collect(Collectors.toList());

        return new UserPrincipal(
                user.getCustomerID(),

                user.getUsername(),
                user.getEmail(),
                user.getPassword(),
                authorities
        );
    }

    public int getId() {
        return customerID;
    }



    public String getEmail() {
        return email;
    }

    @Override
    public String getUsername() {
        return userName;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserPrincipal that = (UserPrincipal) o;
        return Objects.equals(customerID, that.customerID);
    }

    @Override
    public int hashCode() {

        return Objects.hash(customerID);
    }
}