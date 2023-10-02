package com.example.mobile_app.adapters;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.example.mobile_app.R;
import com.example.mobile_app.models.TrainSchedule;
import com.example.mobile_app.models.UserReservation;

import java.util.ArrayList;

public class UserReservationAdapter extends ArrayAdapter<UserReservation> {
    public UserReservationAdapter(@NonNull Context context, ArrayList<UserReservation> dataArrayList) {
        super(context, R.layout.list_item, dataArrayList);
    }

    public View getView(int position, @Nullable View view, @NonNull ViewGroup parent) {
        UserReservation userReservation = getItem(position);

        if(view == null){
            view = LayoutInflater.from(getContext()).inflate(R.layout.list_item, parent, false);
        }

//        TextView trainName = view.findViewById(R.id.list_train_name);
//        TextView scheduleDate = view.findViewById(R.id.list_schedule_date);
//        TextView availableSeats = view.findViewById(R.id.list_available_seats);
//        TextView price = view.findViewById(R.id.list_train_name);

//        trainName.setText(userReservation.getTrainName());
//        scheduleDate.setText(userReservation);
//        availableSeats.setText(String.valueOf(userReservation));
//        price.setText(trainSchedule.trainName);

        return view;
    }
}
