package com.nishy.banger.jwt;
import com.nishy.banger.Entity.Role;
import lombok.AllArgsConstructor;

import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.validation.constraints.*;
import java.util.HashSet;
import java.util.Set;
@AllArgsConstructor
public class SignUpRequest {

    @NotBlank
    @Size(min = 3, max = 15)
    private int customerId;

    @NotBlank
    @Size(min = 3, max = 15)
    private String username;

    @NotBlank
    @Size(max = 40)
    @Email
    private String email;

    @NotBlank
    @Size(min = 6, max = 20)
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

    public String getTelePhone() {
        return TelePhone;
    }

    public void setTelePhone(String telePhone) {
        TelePhone = telePhone;
    }

    public Boolean getUserStatus() {
        return UserStatus;
    }

    public void setUserStatus(Boolean userStatus) {
        UserStatus = userStatus;
    }

    public int getCustomerId() {
        return customerId;
    }

    public void setCustomerId(int customerId) {
        this.customerId = customerId;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public String getDrivingLicnese() {
        return DrivingLicnese;
    }

    public void setDrivingLicnese(String drivingLicnese) {
        DrivingLicnese = drivingLicnese;
    }

    public String getNIC() {
        return NIC;
    }

    public void setNIC(String NIC) {
        this.NIC = NIC;
    }



    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
