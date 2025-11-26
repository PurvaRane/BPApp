
import React, { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";

const LandingPage = ({ navigation }) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      if (navigation) {
        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }],
        });
      }
    }, 2000); 

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image 
        source={require("../assets/splash.png")}  
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

export default LandingPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff", 
  },
  logo: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});