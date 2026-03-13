package com.healthmonitor.diseasemonitor.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.healthmonitor.diseasemonitor.model.Patient;

public interface PatientRepository extends JpaRepository<Patient, Long> {
}