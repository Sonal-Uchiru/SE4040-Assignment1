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

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

public class UserReservationAdapter extends ArrayAdapter<UserReservation> {
    public UserReservationAdapter(@NonNull Context context, ArrayList<UserReservation> dataArrayList) {
        super(context, R.layout.reservation_list_item, dataArrayList);
    }

    public View getView(int position, @Nullable View view, @NonNull ViewGroup parent) {
        UserReservation userReservation = getItem(position);

        if(view == null){
            view = LayoutInflater.from(getContext()).inflate(R.layout.reservation_list_item, parent, false);
        }

        TextView scheduleDate = view.findViewById(R.id.r_list_schedule_date);
        TextView trainName = view.findViewById(R.id.r_list_train_name);
        TextView totalPrice = view.findViewById(R.id.l_list_total_price);
        TextView reservations = view.findViewById(R.id.r_list_reservations);

        Date departureDate = userReservation.getDepartureDate();
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        String formattedDate = dateFormat.format(departureDate);

        scheduleDate.setText(formattedDate);
        trainName.setText(userReservation.getTrainName());
        totalPrice.setText(String.valueOf(userReservation.getTotalPrice()));
        reservations.setText(String.valueOf(userReservation.getReservedSeats()));

        return view;
    }
}
