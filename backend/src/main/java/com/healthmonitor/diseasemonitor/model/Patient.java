package com.healthmonitor.diseasemonitor.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String disease;

    private String location;

    private String hospital;

    public Patient() {}

    public Patient(String name, String disease, String location, String hospital) {
        this.name = name;
        this.disease = disease;
        this.location = location;
        this.hospital = hospital;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDisease() {
        return disease;
    }

    public String getLocation() {
        return location;
    }

    public String getHospital() {
        return hospital;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDisease(String disease) {
        this.disease = disease;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public void setHospital(String hospital) {
        this.hospital = hospital;
    }
}