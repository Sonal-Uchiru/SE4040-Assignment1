package com.example.mobile_app.utilities;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DatabaseTypeConverters {
    static DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    public static String dateToString(Date value){
        return value == null ? null : df.format(value);
    }

}
