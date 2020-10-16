package com.nishy.banger.Entity;


import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Utilities {
    @Id
    @GeneratedValue
    @Column(name = "utilityID")
    private int utilityID;
    @Column(name = "Itemname")
    private String ItemName;
    @Column(name = "pickupdate")
    private String pickupdate;
    @Column(name = "qunantity")
    private int qunantity;
    @Column(name = "bookingId")
    private int bookingId;
}
