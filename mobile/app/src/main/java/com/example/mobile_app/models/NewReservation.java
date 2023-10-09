package com.example.mobile_app.models;

import java.util.Date;

public class NewReservation {
    private String trainId, trainName, startingStation, endingStation, departureDate, departureTime, arrivalTime, reservationDate;
    private int noOfPassengers;
    private double  perPersonPrice;

    public NewReservation(String trainId, String trainName, String startingStation, String endingStation, String departureDate, String departureTime, String arrivalTime, int noOfPassengers, String reservationDate, double perPersonPrice) {
        this.trainId = trainId;
        this.trainName = trainName;
        this.startingStation = startingStation;
        this.endingStation = endingStation;
        this.departureDate = departureDate;
        this.departureTime = departureTime;
        this.arrivalTime = arrivalTime;
        this.noOfPassengers = noOfPassengers;
        this.reservationDate = reservationDate;
        this.perPersonPrice = perPersonPrice;
    }

    public String getTrainId() {
        return trainId;
    }

    public String getTrainName() {
        return trainName;
    }

    public String getStartingStation() {
        return startingStation;
    }

    public String getEndingStation() {
        return endingStation;
    }

    public String getDepartureDate() {
        return departureDate;
    }

    public String getDepartureTime() {
        return departureTime;
    }

    public String getArrivalTime() {
        return arrivalTime;
    }

    public int getNoOfPassengers() {
        return noOfPassengers;
    }

    public String getReservationDate() {
        return reservationDate;
    }

    public double getPerPersonPrice() {
        return perPersonPrice;
    }

    @Override
    public String toString() {
        return "NewReservation{" +
                "trainId='" + trainId + '\'' +
                ", trainName='" + trainName + '\'' +
                ", startingStation='" + startingStation + '\'' +
                ", endingStation='" + endingStation + '\'' +
                ", departureDate='" + departureDate + '\'' +
                ", departureTime='" + departureTime + '\'' +
                ", arrivalTime='" + arrivalTime + '\'' +
                ", noOfPassengers=" + noOfPassengers +
                ", price=" + perPersonPrice +
                '}';
    }
}
