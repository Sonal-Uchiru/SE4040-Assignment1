package com.example.mobile_app;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;

import com.example.mobile_app.databinding.ActivityDetailedBinding;
import com.example.mobile_app.databinding.ActivityHomeBinding;

public class DetailedActivity extends AppCompatActivity {

    ActivityDetailedBinding binding;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityDetailedBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        Intent intent = this.getIntent();
        if(intent != null){
            String trainName = intent.getStringExtra("trainName");
            String model = intent.getStringExtra("model");

            binding.detailTopic.setText(trainName);
        }
    }
}