import React from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";

const LOGO_PLACEHOLDER = require("../assets/logoBPA.png");

function LoginScreen({ navigation }) {
  const [isChecked, setIsChecked] = React.useState(false);
  const [userId, setUserId] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const handleLogin = async () => {
  setError("");

  if (!userId.trim() || !password.trim()) {
    setError("Please enter User ID and Password");
    return;
  }

  try {
    const res = await fetch("http://127.0.0.1:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.msg);
      return;
    }

    navigation.reset({
      index: 0,
      routes: [{ name: "Home" }],
    });

  } catch (err) {
    console.log(err);
    setError("Something went wrong");
  }
};

 const handleRegister = () => {
  navigation.navigate("Register");
};

  return (
    <ImageBackground 
      source={require("../assets/bg_cows.png")} 
      style={styles.bgImage}
    >
      <View style={styles.overlay}>
        {/* Header and Logo Section */}
        <Text style={styles.departmentTitle}>
          Department of Animal Husbandry and Dairying
        </Text>

        <Image source={LOGO_PLACEHOLDER} style={styles.logo} />

        <Text style={styles.loginTitle}>Login</Text>

        {/* Input Fields */}
        <TextInput 
          placeholder=" User ID" 
          placeholderTextColor="#000"
          style={styles.input} 
          value={userId}
          onChangeText={setUserId}
          editable={true}
          selectTextOnFocus={true}
        />
        <TextInput
          placeholder=" Password"
          placeholderTextColor="#000"
          secureTextEntry={true}
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          editable={true}
          selectTextOnFocus={true}
        />

        {/* Remember Me & Forgot Password */}
        <View style={styles.rememberForgotContainer}>
          <TouchableOpacity 
            style={styles.checkboxContainer}
            onPress={() => setIsChecked(prev => !prev)}
          >
            {/* Checkbox View */}
            <View style={[styles.checkbox, isChecked && styles.checkboxChecked]}>
              {isChecked && <Text style={styles.tick}>✔</Text>}
            </View>

            <Text style={styles.rememberText}>Remember Me</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>LOGIN</Text>
        </TouchableOpacity>

        {/* Register New Account Button */}
        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.registerButtonText}>REGISTER NEW ACCOUNT</Text>
        </TouchableOpacity>

        {/* Version and Policy Information */}
        <View style={styles.infoContainer}>
          <Text style={styles.versionText}>Version No.X</Text>
          <Text style={styles.versionText}>Version Date: X</Text>
          <Text style={styles.privacyPolicyText}>Privacy Policy</Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E407A', 
    alignItems: "center",
    paddingHorizontal: 25,
  },
  departmentTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 55,
    marginBottom: 25,
    textAlign: 'center',
  },
  logoContainer: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    marginBottom: 20,
  },
  loginTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 30,
  },
  input: {
    width: "100%",
    padding: 15,
    borderWidth: 0,
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  rememberForgotContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
    paddingHorizontal: 5,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1.5,
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
    backgroundColor: "transparent",
  },
  checkboxChecked: {
    backgroundColor: "#fff",
  },
  tick: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  rememberText: {
    color: "#fff",
    fontSize: 14,
  },
  forgotPasswordText: {
    color: "#fff",
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: '#2834a0ff', 
    padding: 15,
    borderRadius: 5,
    width: "100%",
    marginBottom: 15,
  },
  loginButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  registerButton: {
    backgroundColor: '#2834a0ff', 
    padding: 15,
    borderRadius: 5,
    width: "100%",
    marginBottom: 40,
  },
  registerButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  infoContainer: {
    width: '100%',
    alignItems: 'flex-start',
    paddingHorizontal: 5,
  },
  versionText: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 5,
  },
  bgImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(35, 93, 218, 0.4)",
    alignItems: "center",
    paddingHorizontal: 25,
  },
  privacyPolicyText: {
    color: '#fff',
    fontSize: 14,
    marginTop: 10,
    textDecorationLine: 'underline',
  }
});

export default LoginScreen;