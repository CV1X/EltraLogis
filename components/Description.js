import { View, Text } from "react-native";
import React from "react";

const Description = ({ cardId, data, desc, groupCar, groupTrailer }) => {
  return (
    <View>
      <View className="items-center ">
        <Text className="font-bold text-[28px] text-white top-[-32px]">
          Cursa {data}
        </Text>
        <Text className="text-[15px] mt-1 mx-3  text-white">{desc}</Text>
        <Text className="top-[110px] left-4 absolute text-[15px] mt-3 font-semibold text-white">
          Group Car : {groupCar}
        </Text>
        <Text className=" text-white top-[140px] left-4 absolute top font-semibold mt-4">
          Group Trailer : {groupTrailer}
        </Text>
      </View>
    </View>
  );
};

export default Description;
