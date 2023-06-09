import React, { useState, useLayoutEffect, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Card from "../components/Card";
import Loader from "../components/Loader";

const HomeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [user, setUser] = useState(route.params?.user);
  const [curse, setCurse] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = route.params?.token;
  const tokenEXP = route.params?.tokenEXP;
  const phone = route.params?.phone;

  const storeToken = async (token) => {
    try {
      if (token) {
        await AsyncStorage.setItem("token", token);
        console.log("Token stored successfully: ", token);
      } else {
        console.log("Invalid token value. Token not stored.");
      }
    } catch (error) {
      console.error("Error storing token:", error);
    }
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");

        if (storedUser && isLoggedIn === "true") {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        } else {
          // User is not logged in, navigate back to the login screen
          navigation.navigate("LoginScreen");
        }
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    };

    checkLoginStatus();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const fetchData = async () => {
    try {
      const api = "https://lite.eltralogis.com/pod-api/pod/curse";

      const config = {
        headers: {
          Podauth: token,
        },
      };

      const response = await axios.get(api, config);

      setCurse(response.data || []);
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);

  const handleLogout = async () => {
    try {
      // Perform any necessary logout actions, such as clearing user data or tokens
      await AsyncStorage.removeItem("user");
      await AsyncStorage.setItem("isLoggedIn", "false");
      setCurse([]);
      navigation.navigate("LoginScreen");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <View className="w-full h-full bg-[#374755] ">
      <View className="w-full h-[180px] bg-[#374755] items-center justify-center ">
        <SafeAreaView className=" w-[360px] h-[120px] top-5 bg-white justify-center items-center rounded-[50px] flex-row">
          <Text className="text-black text-[22px]  left-[20px] font-semibold absolute bottom-11">
            Hello, {user.tu_full_name}
            <Text className="text-[22px] "> 👋</Text>
          </Text>

          {user && (
            <TouchableOpacity
              onPress={handleLogout}
              className="absolute bg-red-500 top-[46px] right-3 w-[70px] h-[30px] items-center justify-center rounded-3xl"
            >
              <Text className="text-white">Logout</Text>
            </TouchableOpacity>
          )}
        </SafeAreaView>
      </View>

      <ScrollView>
        {isLoading ? (
          <View className="flex-1 justify-center items-center">
            <Loader />
          </View>
        ) : (
          <>
            {/* Rest of your code */}
            {curse &&
            curse.collecting_transports &&
            curse.collecting_transports.length > 0 ? (
              curse.collecting_transports.map((curseItem, index) => (
                <Card
                  id={curseItem.id_collecting_group}
                  cardId={(index + 1).toString()}
                  nrCursa={(index + 1).toString()}
                  desc={
                    curseItem.collecting_group_details
                      ? curseItem.collecting_group_details
                      : "There is no description yet"
                  }
                  groupTrailer={curseItem.collecting_group_trailer}
                  groupCar={curseItem.collecting_group_car}
                  onPressDetails={() =>
                    navigation.navigate("Details", {
                      cardId: (index + 1).toString(),
                      data: "1",
                      desc: curseItem.collecting_group_details
                        ? curseItem.collecting_group_details
                        : "There is no description yet",
                      groupCar: curseItem.collecting_group_car,
                      groupTrailer: curseItem.collecting_group_trailer,
                    })
                  }
                />
              ))
            ) : (
              <></>
            )}
          </>
        )}
      </ScrollView>
      <View className="bg-[#374755] w-10 h-5"></View>
    </View>
  );
};

export default HomeScreen;
