import React from "react";
import { View, useWindowDimensions } from "react-native";
import HTML from "react-native-render-html";

const source = {
  html: `
    <div class="loader">
      <span class="bar"></span>
      <span class="bar"></span>
      <span class="bar"></span>
    </div>
  `,
};

const tagsStyles = {
  loader: {
    display: "flex",
    alignItems: "center",
  },
  bar: {
    display: "inline-block",
    width: 3,
    height: 20,
    backgroundColor: "rgba(255, 255, 255, .5)",
    borderRadius: 10,
    animation: "scale-up4 1s linear infinite",
  },
  "bar:nth-child(2)": {
    height: 35,
    margin: "0 5px",
    animationDelay: ".25s",
  },
  "bar:nth-child(3)": {
    animationDelay: ".5s",
  },
  "@keyframes scale-up4": {
    "20%": {
      backgroundColor: "#ffff",
      transform: "scaleY(1.5)",
    },
    "40%": {
      transform: "scaleY(1)",
    },
  },
};

const Loader = () => {
  const { width } = useWindowDimensions();

  return (
    <View>
      <HTML source={source} tagsStyles={tagsStyles} contentWidth={width} />
    </View>
  );
};

export default Loader;
