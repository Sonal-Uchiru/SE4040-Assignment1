package com.example.mobile_app;

import android.content.Intent;
import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.example.mobile_app.databinding.FragmentDetailsFragementBinding;
import com.example.mobile_app.databinding.FragmentProfileFragementBinding;
import com.example.mobile_app.managers.TrainScheduleManager;
import com.example.mobile_app.managers.UserManager;
import com.example.mobile_app.models.TrainSchedule;
import com.example.mobile_app.models.User;
import com.example.mobile_app.utilities.TokenManager;

import org.json.JSONException;

import java.util.List;

public class ProfileFragement extends Fragment {

    TokenManager tokenManager;
    private UserManager userManager;
    FragmentProfileFragementBinding binding;
    Button updateBtn, deactivateBtn;
    User user;


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
            Bundle savedInstanceState) {
        // Inflating the profile fragment layout using data binding.
        binding = FragmentProfileFragementBinding.inflate(inflater, container, false);
        View view = binding.getRoot();

        // Initialize TokenManager to manage user authentication tokens.
        tokenManager = new TokenManager(requireContext());
        // Find and reference the update and deactivate buttons in the layout.
        updateBtn = view.findViewById(R.id.p_update_btn);
        deactivateBtn = view.findViewById(R.id.p_deactivate_btn);

        // To Do - Uncomment this
        String userId = tokenManager.getUserId();
        // String userId = "8a8703e0-87cb-4681-802b-6177fc5b4c93";


        // Initialize UserManager for handling user-related operations.
        userManager = UserManager.getInstance();
        // Load the user details based on the provided user ID.
        loadUserDetails(userId);

        updateBtn.setOnClickListener(v -> {
            updateUser(userId);
        });

        deactivateBtn.setOnClickListener(v -> {
            toggleUserAccountStatus(userId);
        });

        return view;
    }

    private void updateUser(String userId) {
        String firstName = String.valueOf(binding.pEdFirstname.getText());
        String lastName = String.valueOf(binding.pEdLastname.getText());
        String mobileString = String.valueOf(binding.pEdMobile.getText());
        int mobile = Integer.parseInt(mobileString);

        userManager.updateUser(
                userId,
                firstName,
                lastName,
                mobile,
                () -> handleSuccess(),
                error -> handleFailed(error));
    }

    private void toggleUserAccountStatus(String userId) {
        userManager.toggleUserAccount(
                userId,
                () -> handleToggleSuccess(),
                error -> handleFailed(error));
    }

    private void loadUserDetails(String id) {
        userManager.getUserDetails(
                id,
                trainScheduleResponse -> {
                    user = trainScheduleResponse.item;
                    binding.pEdFirstname.setText(user.getFirstName());
                    binding.pEdLastname.setText(user.getLastName());

                    int mobile = user.getMobile();

                    binding.pEdMobile.setText(String.valueOf(mobile));
                    binding.pNic.setText(user.getNic());
                    binding.pEmail.setText(user.getEmail());

                },
                error -> handleFailed(error)
        );
    }
    private void handleFailed(String error){
        Toast.makeText(requireContext(), error, Toast.LENGTH_LONG).show();
    }

    private void handleSuccess(){
        Toast.makeText(requireContext(), "User updated sucessfully", Toast.LENGTH_LONG).show();
    }

    private void handleToggleSuccess(){
        Toast.makeText(requireContext(), "User account status updated sucessfully", Toast.LENGTH_LONG).show();
        Intent intent = new Intent(requireContext(), LoginActivity.class);
        startActivity(intent);
    }
}