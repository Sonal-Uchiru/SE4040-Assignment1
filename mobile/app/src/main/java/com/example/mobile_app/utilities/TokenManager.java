package com.example.mobile_app.utilities;

import android.content.Context;
import android.content.SharedPreferences;

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

    public void saveToken(String token) {
        editor.putString("token", token);
        editor.apply();
    }

    public String getToken() {
        return sharedPreferences.getString("token", "");
    }
    public String getUserId() {
        try {
            String token = getToken();

            Claims claims = Jwts.parser()
                    .setSigningKey(secretKey)
                    .parseClaimsJws(token)
                    .getBody();

            String userId = claims.get("user_id", String.class);
            return userId;

        }catch (ExpiredJwtException eje) {
            return "ExpiredJwtException" + eje.getMessage();
        } catch (SignatureException se) {
            String token = getToken();

            return token + "SignatureException" + se.getMessage();
        }  catch (Exception e) {
            return "Exception" + e.getMessage();

        }
    }
}
