package com.example.mobile_app.managers;

import com.example.mobile_app.models.Login;
import com.example.mobile_app.response.LoginResponse;
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
        if (singleton == null)
            singleton = new TrainScheduleManager();
        return singleton;
    }

    private TrainScheduleManager() {
        trainScheduleService = NetworkManager.getInstance().createService(TrainScheduleService.class);
    }

    public void fetchList(
            Runnable onSuccess,
            Consumer<String> onError
    ){
        if (!NetworkManager.getInstance().isNetworkAvailable()){
            onError.accept("No internet connectivity");
            return;
        }

        trainScheduleService.fetch().enqueue(new Callback<Object[]>() {
            @Override
            public void onResponse(Call<Object[]> call, Response<Object[]> response) {
                if (response.isSuccessful()) {
                    Object[] objects = response.body();
                    if (objects != null && objects.length > 0) {
                        onSuccess.run();
                    } else {
                        onError.accept("Response is empty");
                    }
                } else {
                    onError.accept("Request failed with status code: " + response.code());
                }
            }

            @Override
            public void onFailure(Call<Object[]> call, Throwable t) {
                onError.accept("Network request failed: " + t.getMessage());
            }
        });
    }
}
