package com.example.mobile_app.utilities;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DatabaseTypeConverters {
    static DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
    public static String dateToString(Date value){
        return value == null ? null : df.format(value);
    }

    public static String stringDateFormatter(String originalDate) {

        try {
            SimpleDateFormat originalFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm");
            Date date = originalFormat.parse(originalDate);

            SimpleDateFormat targetFormat = new SimpleDateFormat("yyyy-MM-dd");

            String formattedDate = targetFormat.format(date);

            return formattedDate;
        } catch (ParseException e) {
            e.printStackTrace();
            return "";
        }
    }

}
