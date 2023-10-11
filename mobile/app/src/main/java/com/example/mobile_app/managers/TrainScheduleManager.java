package com.example.mobile_app.managers;

import android.util.Log;

import com.example.mobile_app.models.Login;
import com.example.mobile_app.response.LoginResponse;
import com.example.mobile_app.response.TrainScheduleResponse;
import com.example.mobile_app.service.LoginService;
import com.example.mobile_app.service.TrainScheduleService;

import java.util.function.Consumer;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class TrainScheduleManager {

    private static TrainScheduleManager singleton;
    private TrainScheduleService trainScheduleService;

    public static TrainScheduleManager getInstance() {
        // Check if the 'singleton' instance is null
        if (singleton == null)
            singleton = new TrainScheduleManager();
        //Returing instance
        return singleton;
    }

    private TrainScheduleManager() {
        // Create an instance of the 'TrainScheduleService' by using 'NetworkManager'
        trainScheduleService = NetworkManager.getInstance().createService(TrainScheduleService.class);
    }

    public void fetchList(
            Consumer<TrainScheduleResponse> onSuccess,
            Consumer<String> onError
    ) {
        // Check if there is no internet connectivity
        if (!NetworkManager.getInstance().isNetworkAvailable()) {
            onError.accept("No internet connectivity");
            return;
        }

        // Call the 'trainScheduleService' service and handle the response
        trainScheduleService.fetch().enqueue(new Callback<TrainScheduleResponse>() {
            @Override
            public void onResponse(Call<TrainScheduleResponse> call, Response<TrainScheduleResponse> response) {
                if (response.isSuccessful()) {
                    TrainScheduleResponse trainScheduleResponse = response.body();
                    // Check if the response body is not null
                    if (trainScheduleResponse != null) {
                        onSuccess.accept(trainScheduleResponse);
                    } else {
                        onError.accept("Response is empty");
                    }
                } else {
                    onError.accept("Request failed with status code: " + response.code());
                }
            }

            @Override
            public void onFailure(Call<TrainScheduleResponse> call, Throwable t) {
                Log.d("MyApp", "This is a debug message." + t.getMessage());
                onError.accept("Network request failed: " + t.getMessage());
            }
        });
    }

}
