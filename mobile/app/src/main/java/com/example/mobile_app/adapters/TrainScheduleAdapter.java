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
import com.example.mobile_app.models.Train;
import com.example.mobile_app.models.TrainSchedule;
import com.example.mobile_app.utilities.DatabaseTypeConverters;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;

public class TrainScheduleAdapter extends ArrayAdapter<TrainSchedule> {

    Calendar calendar = Calendar.getInstance();

    Date currentDate = calendar.getTime();
    String formattedDate = DatabaseTypeConverters.dateToString(currentDate);

    public TrainScheduleAdapter(@NonNull Context context, ArrayList<TrainSchedule> dataArrayList) {
        super(context, R.layout.list_item, dataArrayList);
    }

    @NonNull
    @Override
    public View getView(int position, @Nullable View view, @NonNull ViewGroup parent) {
        TrainSchedule trainSchedule = getItem(position);

        if(view == null){
            view = LayoutInflater.from(getContext()).inflate(R.layout.list_item, parent, false);
        }

        TextView trainName = view.findViewById(R.id.list_train_name);
        TextView personPrice = view.findViewById(R.id.list_person_price);
        TextView availableSeats = view.findViewById(R.id.list_available_seats);
        TextView startingStation = view.findViewById(R.id.list_starting_station);
        TextView endingStation = view.findViewById(R.id.list_ending_station);

        trainName.setText(trainSchedule.getName());
        personPrice.setText("Rs." + String.valueOf(trainSchedule.getPrice()));
        availableSeats.setText(String.valueOf(trainSchedule.getNoOfSeats()));
        startingStation.setText(trainSchedule.getStartingStation());
        endingStation.setText(trainSchedule.getEndingStation());

//        price.setText(trainSchedule.trainName);

        return view;
    }
}
