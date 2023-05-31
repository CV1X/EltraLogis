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
import { logo } from "../assets";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Card from "../components/Card";

const HomeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [user, setUser] = useState(route.params?.user);
  const token = route.params?.token;
  const tokenEXP = route.params?.tokenEXP;
  const phone = route.params?.phone;

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
    console.log(token, tokenEXP);

    checkLoginStatus();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const handleLogout = async () => {
    try {
      // Perform any necessary logout actions, such as clearing user data or tokens
      await AsyncStorage.removeItem("user");
      await AsyncStorage.setItem("isLoggedIn", "false");
      navigation.navigate("LoginScreen");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <View className="w-full h-full bg-[#374755] ">
      <View className="w-full h-[180px] bg-[#374755] items-center justify-center ">
        <SafeAreaView className=" w-[360px] h-[120px] top-5 bg-white justify-center items-center rounded-[50px] flex-row">
          <Text className="text-black text-[22px]  left-[20px] font-bold absolute bottom-10">
            Hello, <Text className="text-[22px] "> 👋</Text>
          </Text>
          <View className="w-10 h-10 right-8 absolute bottom-5">
            <Image source={logo} className="w-full h-full rounded-xl" />
          </View>
          {user && (
            <TouchableOpacity
              onPress={handleLogout}
              className="absolute bg-red-500 top-3 right-5 w-[80px] h-[30px] items-center justify-center rounded-3xl"
            >
              <Text className="text-white">Logout</Text>
            </TouchableOpacity>
          )}
        </SafeAreaView>
      </View>
      <ScrollView>
        <Card
          cardId={"1"}
          nrCursa={"1"}
          desc={
            "The food truck delivery: A delicious assortment of gourmet treats delivered right to your doorstep, satisfying your culinary cravings."
          }
          loc1={"Paris"}
          loc2={"Romania"}
          price={"2200$"}
          onPressDetails={() =>
            navigation.navigate("Details", {
              cardId: "1",
              data: "1",
              desc: "The food truck delivery: A delicious assortment of gourmet treats delivered right to your doorstep, satisfying your culinary cravings.",
              loc1: "Paris",
              loc2: "Romania",
              price: "2200$",
            })
          }
        />

        <Card
          cardId={"2"}
          nrCursa={"2"}
          desc={
            "The package delivery truck: Prompt and reliable, this truck ensures your parcels reach their destination safely and on time."
          }
          loc1={"Romania"}
          loc2={"Germany"}
          price={"2800$"}
          onPressDetails={() =>
            navigation.navigate("Details", {
              cardId: "2",
              data: "2",
              desc: "The package delivery truck: Prompt and reliable, this truck ensures your parcels reach their destination safely and on time.",
              loc1: "Romania",
              loc2: "Germany",
              price: "2800$",
            })
          }
        />
      </ScrollView>
      <View className="bg-[#374755] w-10 h-5"></View>
    </View>
  );
};

export default HomeScreen;
