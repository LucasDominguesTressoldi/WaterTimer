import React, { useState, useEffect } from "react";
import * as Notify from "expo-notifications";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function Timer() {
  const time = 10;
  const [timeLeft, setTimeLeft] = useState(time);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timerInterval;

    if (isRunning) {
      timerInterval = setInterval(() => {
        if (timeLeft > 0) {
          setTimeLeft((prevTime) => prevTime - 1);
        } else {
          clearInterval(timerInterval);
          setIsRunning(false);
          setTimeLeft(time);
          sendNotification();
        }
      }, 1000);
    }

    return () => clearInterval(timerInterval);
  }, [isRunning, timeLeft]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
    setTimeLeft(time);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const sendNotification = async () => {
    const { status } = await Notify.requestPermissionsAsync();

    if (status !== "granted") {
      Alert.alert("Notificações desativadas!");
      return;
    }
    await Notify.scheduleNotificationAsync({
      content: {
        title: "WATER TIME!!",
        body: "Time to drink some water",
        data: [],
      },
      trigger: null,
    });
  };

  return (
    <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>
        {formatTime(timeLeft)}
      </Text>
      <TouchableOpacity
        style={{
          width: 100,
          height: 100,
          borderRadius: 50,
          backgroundColor: "#0000FF",
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={isRunning ? stopTimer : startTimer}
      >
        <MaterialCommunityIcons
          name={isRunning ? "stop" : "water"}
          size={50}
          color="#FFF"
        />
      </TouchableOpacity>
    </View>
  );
}
