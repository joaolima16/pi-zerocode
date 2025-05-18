package com.zecorode.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zecorode.domain.schedule.CreateScheduleDTO;
import com.zecorode.services.ScheduleService;

@RestController
@RequestMapping("/schedules")

public class ScheduleController {

    @Autowired
    private ScheduleService scheduleService;
    
    @PostMapping
    public ResponseEntity<String> createSchedule(@RequestBody CreateScheduleDTO createScheduleDTO) {
        scheduleService.createSchedule(createScheduleDTO);
        return ResponseEntity.ok("Schedule created successfully");
    }
}
