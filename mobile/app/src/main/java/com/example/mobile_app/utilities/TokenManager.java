package com.example.mobile_app.utilities;

import android.content.Context;
import android.content.SharedPreferences;

import com.example.mobile_app.response.LoginResponse;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureException;

public class TokenManager {
    private SharedPreferences sharedPreferences;
    private String secretKey = "8V7n5phLLJj0GYbJHHkqhs2iNlvAvpPp4q9iutGwj24PDDcYK2";
    private SharedPreferences.Editor editor;


    public TokenManager(Context context) {
        sharedPreferences = context.getSharedPreferences("TrainPrefs", Context.MODE_PRIVATE);
        editor = sharedPreferences.edit();
    }

    public void saveToken(LoginResponse loginResponse) {
        editor.putString("token", loginResponse.token);
        // To Do - Uncomment this
//        editor.putString("userId", loginResponse.userId);

        editor.apply();
    }

    public String getToken() {
        return sharedPreferences.getString("token", "");
    }
    public String getUserId() {
        return sharedPreferences.getString("userId", "");
    }
}
