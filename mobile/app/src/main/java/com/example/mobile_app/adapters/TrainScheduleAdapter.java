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

import java.util.ArrayList;

public class TrainScheduleAdapter extends ArrayAdapter<TrainSchedule> {

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

//        ImageView listImage = view.findViewById(R.id.list_image);
        TextView listName = view.findViewById(R.id.list_train_name);
        TextView listTime = view.findViewById(R.id.list_train_name);

//        listImage.setImageResource(trainSchedule.image);
        listTime.setText("SUDU MANIKA");
//        listTime.setText("20 20");

        return view;
    }
}
