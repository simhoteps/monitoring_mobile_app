import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Button, View, Text } from "react-native";
import * as Notifications from "expo-notifications";

export async function requestPermissionsAsync() {
  const result = await Notifications.requestPermissionsAsync({
    ios: {
      allowAlert: true,
      allowBadge: true,
      allowSound: true,
      allowAnnouncements: true,
    },
  });

  return result;
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function AlarmNotifications() {
  const [data, setdata] = useState("");

  useEffect(() => {
    const alertForPermission = () => {
      Notifications.getPermissionsAsync().then((statusobj) => {
        if (statusobj.status !== "granted") {
          /* if (statusobj.status === "denied") {
            Alert.alert(
              "İzin Gerekli",
              "Ayarlara gidip Bildirimler için izin vermeniz gerekiyor",
              alertForPermission
            );
          }*/
          requestPermissionsAsync();
        }
      });
    };
    alertForPermission();
  }, []);

  useEffect(() => {
    const backgroundsubscription =
      Notifications.addNotificationResponseReceivedListener((response) => {
        let data = response.notification.request.content.data.MyData;
        setdata(data);
      });

    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log(notification);
      }
    );

    return () => {
      subscription.remove();
      backgroundsubscription.remove();
    };
  }, []);

  const triggerNotification = () => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: "Merhaba Notifcation",
        body: "Bu yarattığımız ilk local bildirim",
        data: { MyData: "Kendimize Ait Data" },
      },
      trigger: {
        seconds: 10,
      },
    });
  };

  return (
    <View style={styles.container}>
      <Button onPress={triggerNotification} title="Bildirimi Tetikle"></Button>
      <Text>{data}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
