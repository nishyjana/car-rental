package com.nishy.banger.Entity;

import lombok.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class car {
    @Id
    @GeneratedValue
    private int CarID;
    private String CarModel;
    private String CarType;
    private String fuel;
    private String price;
    private  String CarNumber;
    private Boolean Availabilty;
    private String imgURl;
}
