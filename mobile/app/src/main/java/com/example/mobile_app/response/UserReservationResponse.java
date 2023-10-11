package com.example.mobile_app.response;

import com.example.mobile_app.models.TrainSchedule;
import com.example.mobile_app.models.UserReservation;

import java.util.List;

public class UserReservationResponse {
    private String time;
    private List<UserReservation> items;

    //Gets and returns the list of UserReservation items.
    public List<UserReservation> getItems() {
        return items;
    }
}
