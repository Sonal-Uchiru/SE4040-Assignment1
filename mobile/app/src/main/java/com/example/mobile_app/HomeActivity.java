package com.example.mobile_app;

import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentTransaction;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ListAdapter;

import com.example.mobile_app.adapters.TrainAdapter;
import com.example.mobile_app.adapters.TrainScheduleAdapter;
import com.example.mobile_app.databinding.ActivityHomeBinding;
import com.example.mobile_app.models.Train;
import com.example.mobile_app.models.TrainSchedule;

import java.util.ArrayList;

public class HomeActivity extends AppCompatActivity {

    ActivityHomeBinding binding;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // Inflating the layout using view binding.
        binding = ActivityHomeBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        // Set a transparent background for the bottom navigation view.
        binding.bottomNavigationView.setBackground(null);
        if (savedInstanceState == null) {
            // If it's the first time, replace the default fragment with the HomeFragment.
            getSupportFragmentManager().beginTransaction()
                    .replace(R.id.frame_layout, new HomeFragement())
                    .commit();
        }

        // Set a listener for item selection in the bottom navigation view and replacing the necessary fragments
        binding.bottomNavigationView.setOnItemSelectedListener(item -> {
            if (item.getItemId() == R.id.home) {
                replaceFragement(new HomeFragement());
            } else if (item.getItemId() == R.id.profile) {
                replaceFragement(new ProfileFragement());
            } else if (item.getItemId() == R.id.reservations) {
                replaceFragement(new ReservationFragement());
            } else if (item.getItemId() == R.id.logout) {
                Intent intent = new Intent(this, LoginActivity.class);
                startActivity(intent);
            }
            return true;
        });
    }

    private void replaceFragement(Fragment fragment) {
        // Get the fragment manager for managing fragment transactions.
        FragmentManager fragmentManager = getSupportFragmentManager();
        FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();

        // Replace the current fragment with the new fragment in the specified layout container.
        fragmentTransaction.replace(R.id.frame_layout, fragment);
        // Commit the transaction to apply the replacement.
        fragmentTransaction.commit();
    }
}