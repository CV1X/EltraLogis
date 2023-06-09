import React, { useState, useLayoutEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { logo } from "../assets";
import HomeScreen from "./HomeScreen";
import { login } from "../api/index";
import AsyncStorage from "@react-native-async-storage/async-storage";

const isEmail = (input) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(input);
};

const LoginScreen = () => {
  const navigation = useNavigation();

  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const handleLogin = async () => {
    try {
      let response;
      if (isEmail(emailOrPhone)) {
        response = await login(emailOrPhone, null, password); // Pass null as phone parameter
      } else {
        response = await login(null, emailOrPhone, password); // Pass null as email parameter
      }

      if (!response.error) {
        await AsyncStorage.setItem("user", JSON.stringify(response.user));
        await AsyncStorage.setItem("isLoggedIn", "true");
        navigation.navigate("HomeScreen", {
          user: response.user,
          phone: response.user.tu_phone,
          token: response.token,
          tokenEXP: response.token_expiration_date,
        });
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error("Login Error:", error);
      // Handle the login error
    }
  };

  return (
    <SafeAreaView className="bg-[#374755] w-full h-full items-center justify-center relative ">
      <View className="bg-slate-100 w-[350px] h-[650px] rounded-3xl shadow-3xl drop-shadow-2xl items-center justify-center">
        <View className="w-[50px] h-[50px] rounded-md items-center bottom-[80px] right-[110px]">
          <Image
            source={logo}
            className="w-full h-full rounded-xl object-cover"
          />
        </View>

        <Text className="bottom-[50px] font-semibold text-[30px]  ">
          Welcome
        </Text>

        <View className="my-7 bottom-8">
          <Text className="font-semibold text-lg left-2">Email or phone</Text>

          <TextInput
            value={emailOrPhone}
            onChangeText={(text) => setEmailOrPhone(text)}
            className="bg-white py-[15px] rounded-xl w-[290px]"
          />

          <Text className="font-semibold text-lg left-2 mt-8">Password</Text>
          <TextInput
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
            className="bg-white py-[15px] rounded-xl w-[290px]"
          />
        </View>

        <View className="items-center justify-center mt-2 w-[180px]  rounded-xl ">
          <TouchableOpacity
            onPress={handleLogin}
            className=" w-full bg-blue-600 py-4 items-center rounded-3xl "
          >
            <Text className="font-semibold  text-white text-[20px]">Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
