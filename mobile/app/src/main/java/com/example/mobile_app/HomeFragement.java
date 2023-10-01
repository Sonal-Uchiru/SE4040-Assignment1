package com.example.mobile_app;

import android.app.Dialog;
import android.content.Context;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;
import android.widget.Button;

import com.example.mobile_app.adapters.TrainScheduleAdapter;
import com.example.mobile_app.databinding.ActivityHomeBinding;
import com.example.mobile_app.databinding.FragmentHomeFragementBinding;
import com.example.mobile_app.models.TrainSchedule;
import com.google.android.material.floatingactionbutton.FloatingActionButton;

import java.util.ArrayList;

public class HomeFragement extends Fragment {

    FragmentHomeFragementBinding binding;
    TrainScheduleAdapter listAdapter;
    ArrayList<TrainSchedule> dataList = new ArrayList<>();
    TrainSchedule trainSchedule;
    FloatingActionButton bottomSheetBtn;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {

        binding = FragmentHomeFragementBinding.inflate(inflater, container, false);
        bottomSheetBtn = binding.btnDialogOpen;
        View view = binding.getRoot();

        bottomSheetBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                showDialog();
            }
        });
        trainSchedule = new TrainSchedule("1", "Sudu Manika", "ML-2020", "Akalanka", "0778899483", "Gampaha", "Galle", "7.30", "2.30", 8, 3, 200);
        dataList.add(trainSchedule);
        trainSchedule = new TrainSchedule("1", "Kalu Manika", "ML-2030", "Danushka", "077884935", "Seeduwa", "Negombo", "7.30", "2.30", 8, 3, 200);
        dataList.add(trainSchedule);
        trainSchedule = new TrainSchedule("1", "Kalu Manika", "ML-2030", "Danushka", "077884935", "Seeduwa", "Negombo", "7.30", "2.30", 8, 3, 200);
        dataList.add(trainSchedule);
        trainSchedule = new TrainSchedule("1", "Kalu Manika", "ML-2030", "Danushka", "077884935", "Seeduwa", "Negombo", "7.30", "2.30", 8, 3, 200);
        dataList.add(trainSchedule);
        trainSchedule = new TrainSchedule("1", "Kalu Manika", "ML-2030", "Danushka", "077884935", "Seeduwa", "Negombo", "7.30", "2.30", 8, 3, 200);
        dataList.add(trainSchedule);
        trainSchedule = new TrainSchedule("1", "Kalu Manika", "ML-2030", "Danushka", "077884935", "Seeduwa", "Negombo", "7.30", "2.30", 8, 3, 200);
        dataList.add(trainSchedule);
        trainSchedule = new TrainSchedule("1", "Kalu Manika", "ML-2030", "Danushka", "077884935", "Seeduwa", "Negombo", "7.30", "2.30", 8, 3, 200);
        dataList.add(trainSchedule);
        trainSchedule = new TrainSchedule("1", "Kalu Manika", "ML-2030", "Danushka", "077884935", "Seeduwa", "Negombo", "7.30", "2.30", 8, 3, 200);
        dataList.add(trainSchedule);
        trainSchedule = new TrainSchedule("1", "Kalu Manika", "ML-2030", "Danushka", "077884935", "Seeduwa", "Negombo", "7.30", "2.30", 8, 3, 200);
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

    private void showDialog() {
        Context context = requireContext();

        final Dialog dialog = new Dialog(context);
        dialog.requestWindowFeature(Window.FEATURE_NO_TITLE);
        dialog.setContentView(R.layout.search_bottom_sheet);

        dialog.show();
        dialog.getWindow().setLayout(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT);
        dialog.getWindow().setBackgroundDrawable(new ColorDrawable((Color.TRANSPARENT)));
        dialog.getWindow().getAttributes().windowAnimations = R.style.dialoglAnumation;
        dialog.getWindow().setGravity(Gravity.BOTTOM);
    }
}