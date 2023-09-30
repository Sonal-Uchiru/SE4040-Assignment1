package com.example.mobile_app.adapters;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.example.mobile_app.R;
import com.example.mobile_app.models.Train;

import java.util.ArrayList;

public class TrainAdapter extends ArrayAdapter<Train> {

    public TrainAdapter(@NonNull Context context, ArrayList<Train> dataArrayList) {
        super(context, R.layout.list_item, dataArrayList);
    }

    @NonNull
    @Override
    public View getView(int position, @Nullable View view, @NonNull ViewGroup parent) {
        Train train = getItem(position);

        if(view == null){
            view = LayoutInflater.from(getContext()).inflate(R.layout.list_item, parent, false);
        }

//        ImageView listImage = view.findViewById(R.id.list_image);
        TextView listName = view.findViewById(R.id.list_name);
        TextView listTime = view.findViewById(R.id.list_time);

//        listImage.setImageResource(train.image);
        listName.setText(train.trainName);
        listTime.setText(train.startingStation);

        return view;
    }
}
