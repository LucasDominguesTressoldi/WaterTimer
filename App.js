import Timer from "./src/components/Timer";
import { StatusBar } from "expo-status-bar";
import * as Notify from "expo-notifications";
import { SafeAreaView, StyleSheet } from "react-native";

Notify.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldShowAlert: true,
    shouldSetBadge: true,
  }),
});

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Timer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFAFA",
    alignItems: "center",
    justifyContent: "center",
  },
  startButton: {
    width: 100,
    height: 100,
    backgroundColor: "#0000FF",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});
