package com.nishy.banger.Entity;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class upload {
    @Id
    @GeneratedValue
    private int fileID;
    private byte file;
    private byte photoCrd;

    private int CustomeID;
}
