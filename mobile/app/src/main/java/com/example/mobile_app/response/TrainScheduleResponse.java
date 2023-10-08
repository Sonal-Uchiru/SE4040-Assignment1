package com.example.mobile_app.response;

import com.example.mobile_app.models.TrainSchedule;

import java.util.List;

public class TrainScheduleResponse {
    private String time;
    private List<TrainSchedule> items;

    public List<TrainSchedule> getItems() {
        return items;
    }
}
