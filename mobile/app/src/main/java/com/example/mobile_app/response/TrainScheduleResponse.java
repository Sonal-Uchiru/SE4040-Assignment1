package com.example.mobile_app.response;

import com.example.mobile_app.models.TrainSchedule;

import java.util.List;

public class TrainScheduleResponse {
    private String time;
    private List<TrainSchedule> items;

    //Gets and returns the list of TrainSchedule items.
    public List<TrainSchedule> getItems() {
        return items;
    }
}
