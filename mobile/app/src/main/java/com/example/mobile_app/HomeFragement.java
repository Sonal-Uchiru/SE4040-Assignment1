package com.example.mobile_app;

import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.example.mobile_app.adapters.TrainScheduleAdapter;
import com.example.mobile_app.databinding.ActivityHomeBinding;
import com.example.mobile_app.databinding.FragmentHomeFragementBinding;
import com.example.mobile_app.models.TrainSchedule;

import java.util.ArrayList;

public class HomeFragement extends Fragment {

    FragmentHomeFragementBinding binding;
    TrainScheduleAdapter listAdapter;
    ArrayList<TrainSchedule> dataList = new ArrayList<>();
    TrainSchedule trainSchedule;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {

        binding = FragmentHomeFragementBinding.inflate(inflater, container, false);
        View view = binding.getRoot();

        trainSchedule = new TrainSchedule("1", "Sudu Manika", "ML-2020", "Akalanka", "0778899483", "Gampaha", "Galle", "7.30", "2.30", 8, 3, 200);
        dataList.add(trainSchedule);
        trainSchedule = new TrainSchedule("1", "Kalu Manika", "ML-2030", "Danushka", "077884935", "Seeduwa", "Negombo", "7.30", "2.30", 8, 3, 200);
        dataList.add(trainSchedule);

        listAdapter = new TrainScheduleAdapter(requireContext(), dataList);
        binding.listView.setAdapter(listAdapter);
//        binding.listView.setClickable(true);

//        binding.listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
//            @Override
//            public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
//                Intent intent = new Intent(HomeActivity.this, DetailedActivity.class);
//                intent.putExtra("trainName", "Sudu Manika");
//                intent.putExtra("model", "MP-2020");
//                startActivity(intent);
//
//            }
//        });
        return view;
    }
}