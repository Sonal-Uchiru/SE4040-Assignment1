package com.example.mobile_app;

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
    Button updateBtn, deactivateBtn, activateBtn;
    User user;


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
            Bundle savedInstanceState) {
        binding = FragmentProfileFragementBinding.inflate(inflater, container, false);
        View view = binding.getRoot();

        tokenManager = new TokenManager(requireContext());
        updateBtn = view.findViewById(R.id.p_update_btn);
        deactivateBtn = view.findViewById(R.id.p_deactivate_btn);
        activateBtn = view.findViewById(R.id.p_activate_btn);

//        String userId = tokenManager.getUserId();
        String userId = "8a8703e0-87cb-4681-802b-6177fc5b4c93";
//        Log.d("MyApp", "Activity created." + userId); // Debug message


        userManager = UserManager.getInstance();
        loadUserDetails(userId);

        updateBtn.setOnClickListener(v -> {
            updateUser(userId);
        });

        deactivateBtn.setOnClickListener(v -> {
            toggleUserAccountStatus(userId);
        });

        activateBtn.setOnClickListener(v -> {
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
                    handleButtonVisiblity(user.isEnabled());

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
        String userId = "8a8703e0-87cb-4681-802b-6177fc5b4c93";
        loadUserDetails(userId);
        Toast.makeText(requireContext(), "User account status updated sucessfully", Toast.LENGTH_LONG).show();
    }

    private void handleButtonVisiblity(boolean status){
        if (status) {
            deactivateBtn.setVisibility(View.VISIBLE);
            activateBtn.setVisibility(View.INVISIBLE);

        } else {
            activateBtn.setVisibility(View.VISIBLE);
            deactivateBtn.setVisibility(View.INVISIBLE);
        }
    }
}