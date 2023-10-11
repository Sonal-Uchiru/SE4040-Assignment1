package com.example.mobile_app.utilities;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;
import java.util.TimeZone;

public class DatabaseTypeConverters {
    static DateFormat df = new SimpleDateFormat("yyyy-MM-dd");

    public static String dateToString(Date value){
        // @return The formatted date string, or null if the input Date is null.
        return value == null ? null : df.format(value);
    }

    // Converts a string date in the format "yyyy-MM-dd'T'HH:mm" to "yyyy-MM-dd".
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


    // Converts a string date in the format "dd-MM-yyyy" to "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'".
    public static String formatToDateTime(String inputDateStr) {
        String outputDatePattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'";
        try {
            SimpleDateFormat inputDateFormat = new SimpleDateFormat("dd-MM-yyyy", Locale.US);
            inputDateFormat.setTimeZone(TimeZone.getTimeZone("UTC"));
            Date inputDate = inputDateFormat.parse(inputDateStr);

            SimpleDateFormat outputDateFormat = new SimpleDateFormat(outputDatePattern);
            outputDateFormat.setTimeZone(TimeZone.getTimeZone("UTC"));
            String outputDateStr = outputDateFormat.format(inputDate);

            return outputDateStr;
        } catch (ParseException e) {
            e.printStackTrace();
            return "";
        }
    }

}
