package com.example.mobile_app.service;

import com.example.mobile_app.models.Login;
import com.example.mobile_app.models.TrainSchedule;
import com.example.mobile_app.response.TrainScheduleResponse;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.POST;

public interface TrainScheduleService {
    @GET("schedules/list")
    Call<TrainScheduleResponse> fetch();
}
