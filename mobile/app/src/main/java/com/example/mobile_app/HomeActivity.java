package com.example.mobile_app;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ListAdapter;

import com.example.mobile_app.adapters.TrainAdapter;
import com.example.mobile_app.databinding.ActivityHomeBinding;
import com.example.mobile_app.models.Train;

import java.util.ArrayList;

public class HomeActivity extends AppCompatActivity {

    ActivityHomeBinding binding;
    TrainAdapter listAdapter;
    ArrayList<Train> dataList = new ArrayList<>();
    Train train;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityHomeBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        train = new Train("1", "Kalu Manika", "MP-2020", "Akalanka", "0778899485", "Udawalawe", "Gampaha", 4);
        dataList.add(train);
        train = new Train("2", "Rosa Manika", "MP-2020", "Akalanka", "0778899485", "Udawalawe", "Gampaha", 4);
        dataList.add(train);
        train = new Train("3", "Sudu Manika", "MP-2020", "Akalanka", "0778899485", "Udawalawe", "Gampaha", 4);
        dataList.add(train);

        listAdapter = new TrainAdapter(HomeActivity.this, dataList);
        binding.listView.setAdapter(listAdapter);
        binding.listView.setClickable(true);

        binding.listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
                Intent intent = new Intent(HomeActivity.this, DetailedActivity.class);
                intent.putExtra("trainName", "Sudu Manika");
                intent.putExtra("model", "MP-2020");
                startActivity(intent);

            }
        });
    }
}