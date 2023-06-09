import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Button,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Description from "../components/Description";
import HomeScreen from "./HomeScreen";
import { larrow } from "../assets";

const Details = ({ route }) => {
  const navigation = useNavigation();
  const [imageUris, setImageUris] = useState([]);
  const { cardId, data, desc, groupCar, groupTrailer } = route.params;

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        console.log("Camera permission not granted");
      }

      const savedImageUris = await AsyncStorage.getItem(
        `savedImageUris_${cardId}`
      );
      if (savedImageUris) {
        setImageUris(JSON.parse(savedImageUris));
      }
    })();
  }, []);

  const openCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const selectedAsset = result.assets[0];
      const updatedImageUris = [...imageUris, selectedAsset.uri];
      setImageUris(updatedImageUris);
      AsyncStorage.setItem(
        `savedImageUris_${cardId}`,
        JSON.stringify(updatedImageUris)
      );
    }
  };

  const openGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const selectedAsset = result.assets[0];
      const updatedImageUris = [...imageUris, selectedAsset.uri];
      setImageUris(updatedImageUris);
      AsyncStorage.setItem(
        `savedImageUris_${cardId}`,
        JSON.stringify(updatedImageUris)
      );
    }
  };

  const deleteImage = async (index) => {
    const updatedImageUris = [...imageUris];
    updatedImageUris.splice(index, 1);
    setImageUris(updatedImageUris);
    AsyncStorage.setItem(
      `savedImageUris_${cardId}`,
      JSON.stringify(updatedImageUris)
    );
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        position: "relative",
      }}
    >
      <View className="w-full h-[400px] bg-slate-700 rounded-[40px] mb-4  ">
        <TouchableOpacity
          onPress={() => navigation.navigate("HomeScreen")}
          className="w-[50px] h-[50px] bg-white absolute items-center z-10 justify-center object-cover  top-[60px] left-[10px] rounded-full"
        >
          <Image source={larrow} className="w-[30px] h-[30px]  right-[2px]" />
        </TouchableOpacity>

        <View className="w-full h-[190px] bg-slate-700 top-[100px] relative">
          <Description
            data={data}
            desc={desc}
            groupCar={groupCar}
            groupTrailer={groupTrailer}
          />
        </View>

        <View className="flex-row">
          <TouchableOpacity
            onPress={openCamera}
            className="bottom-[-20px] bg-blue-400"
            style={{
              width: 180,
              top: 110,
              left: 25,
              height: 70,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 8,
            }}
          >
            <Text style={{ color: "black", fontSize: 20, fontWeight: "bold" }}>
              Open Camera
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={openGallery}
            className="bottom-[-20px] bg-blue-400"
            style={{
              width: 120,
              top: 110,
              left: 60,
              height: 70,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
            }}
          >
            <Text style={{ color: "black", fontSize: 20, fontWeight: "bold" }}>
              Open Gallery
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="w-full h-[500px] bg-slate-700 rounded-[40px]">
        {imageUris.map((uri, index) => (
          <View
            key={index}
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              left: 25,
              marginTop: 15,
            }}
          >
            <Image
              source={{ uri }}
              style={{
                marginTop: 5,
                width: 200,
                height: 200,
                backgroundColor: "slategray",
                borderRadius: 30,
              }}
            />
            <View className=" items-center justify-center rounded-full">
              <TouchableOpacity
                onPress={() => deleteImage(index)}
                className="items-center justify-center  bg-red-500 rounded-full w-[70px] h-[50px] left-10"
              >
                <Text className="text-white font-semibold text-[16px]">
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
        <View className="w-full h-10 bg-slate-700 "></View>
      </ScrollView>
    </View>
  );
};

export default Details;
