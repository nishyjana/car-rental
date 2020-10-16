package com.nishy.banger.Entity;



import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.text.DateFormat;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Booking {
    @Id
    @GeneratedValue
    private int bookingId;
    private String pickupTime;
    private String returnTime;

}
