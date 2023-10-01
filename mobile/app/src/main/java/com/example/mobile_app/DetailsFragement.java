package com.example.mobile_app;

import android.content.Intent;
import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.example.mobile_app.databinding.ActivityDetailedBinding;
import com.example.mobile_app.databinding.FragmentDetailsFragementBinding;
import com.example.mobile_app.databinding.FragmentHomeFragementBinding;

public class DetailsFragement extends Fragment {

    FragmentDetailsFragementBinding binding;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        binding = FragmentDetailsFragementBinding.inflate(inflater, container, false);

        View view = binding.getRoot();

        Bundle args = getArguments();
//        Intent intent = this.getIntent();
        if(args != null){
            String trainName = args.getString("trainName");
            String model = args.getString("model");

            binding.trainName.setText(trainName);
        }

        return view;
    }
}