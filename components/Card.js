import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { arrow } from "../assets";

const Card = ({ nrCursa, desc, loc1, loc2, price, cardId, onPressDetails }) => {
  const navigation = useNavigation();
  return (
    <View className="items-center">
      <View className="w-[370px] h-[190px] bg-white rounded-2xl top my-2">
        {/* DESCRIERE CARD */}
        <View>
          <View className="w-full h-[130px]  rounded-2xl flex-col">
            <View className="w-[350px] h-full mx-4 mt-3">
              <Text className="font-bold text-[18px]">Cursa {nrCursa}</Text>
              <Text className="text-[14px] mt-3">{desc}</Text>
            </View>
          </View>

          {/* BUTON DETALII */}

          <View className="w-[350px]  h-[60px] bg-slate-300 rounded-2xl flex-row relative bottom-2 left-2">
            <Text className="top-2 left-4 absolute text-[16px]">
              From {loc1} to {loc2}
            </Text>

            <Text className="top-8 left-4 absolute top font-bold">
              Price : {price}
            </Text>

            <TouchableOpacity
              onPress={onPressDetails}
              className="left-[255px] w-[100px] bg-blue-600 py-4 items-center rounded-3xl "
            >
              <Text className="font-semibold text-base text-[18px] text-white">
                Details
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Card;
