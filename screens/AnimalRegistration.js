import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  Alert,
  StatusBar,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";

function AnimalRegistration({ onBack }) {
  const [imageUri, setImageUri] = useState(null);
  const [earTagNo, setEarTagNo] = useState("");
  const [ownerId, setOwnerId] = useState("123456123456");
  const [selectedSpecies, setSelectedSpecies] = useState("");
  const [predictedSpecies, setPredictedSpecies] = useState("N/A");
  const [predictedBreed, setPredictedBreed] = useState("N/A");
  const [isProcessing, setIsProcessing] = useState(false);


  const handleSelectImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert("Permission Required", "Please allow access to your photo library");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      setPredictedSpecies("N/A");
      setPredictedBreed("N/A");
    }
  };

  // Handle species prediction via API
  const handlePredictSpecies = async () => {
    if (!imageUri) {
      Alert.alert("No Image", "Please select an animal image first");
      return;
    }

    setIsProcessing(true);

    try {
      

      // Simulated prediction for demo
      setTimeout(() => {
        setPredictedSpecies("Cattle - Holstein");
        setPredictedBreed("Holstein Friesian");
        setIsProcessing(false);
        Alert.alert("Success", "Species and breed predicted successfully!");
      }, 2000);

    } catch (error) {
      console.error("Prediction error:", error);
      Alert.alert("Error", "Failed to predict species and breed");
      setIsProcessing(false);
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!earTagNo.trim()) {
      Alert.alert("Required Field", "Please enter Ear Tag Number");
      return;
    }

    if (!selectedSpecies.trim()) {
      Alert.alert("Required Field", "Please select species");
      return;
    }

    Alert.alert(
      "Success", 
      "Animal registration submitted successfully!",
      [{ text: "OK", onPress: onBack }]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#1E88E5" barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={26} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Animal Registration</Text>
        <View style={{ width: 26 }} />
      </View>

      <ScrollView 
  style={styles.scrollView}
  contentContainerStyle={{ paddingBottom: 60 }}
  showsVerticalScrollIndicator={false}
>

        {/* Image Recognition Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Cattle/Buffalo Species and Breed Recognition
          </Text>

          {/* Image Preview */}
          <View style={styles.imageContainer}>
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={styles.imagePreview} />
            ) : (
              <View style={styles.imagePlaceholder}>
                <Ionicons name="image-outline" size={64} color="#BDBDBD" />
                <Text style={styles.placeholderText}>No image selected</Text>
              </View>
            )}
          </View>

          {/* Select Image Button */}
          <TouchableOpacity 
            style={styles.selectImageButton}
            onPress={handleSelectImage}
            activeOpacity={0.8}
          >
            <Ionicons name="images-outline" size={22} color="#fff" />
            <Text style={styles.selectImageButtonText}>SELECT ANIMAL IMAGE</Text>
          </TouchableOpacity>

          {/* Predict Button */}
          <TouchableOpacity 
            style={styles.predictButton}
            onPress={handlePredictSpecies}
            disabled={isProcessing || !imageUri}
            activeOpacity={0.8}
          >
            <Ionicons name="flash-outline" size={22} color="#fff" />
            <Text style={styles.predictButtonText}>
              {isProcessing ? "PROCESSING..." : "PREDICT SPECIES AND BREED (VIA PYTHON MODEL API)"}
            </Text>
          </TouchableOpacity>

          {/* Prediction Results */}
          <View style={styles.predictionBox}>
            <View style={styles.predictionRow}>
              <Text style={styles.predictionLabel}>Predicted Species:</Text>
              <Text style={styles.predictionValue}>{predictedSpecies}</Text>
            </View>
            <View style={[styles.predictionRow, { marginTop: 10 }]}>
              <Text style={styles.predictionLabel}>Predicted Breed:</Text>
              <Text style={styles.predictionValue}>{predictedBreed}</Text>
            </View>
          </View>
        </View>

        {/* Registration Form */}
        <View style={styles.section}>
          {/* Ear Tag Number */}
          <Text style={styles.inputLabel}>
            Ear Tag No. <Text style={styles.required}>(Required)</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter ear tag number"
            placeholderTextColor="#9E9E9E"
            value={earTagNo}
            onChangeText={setEarTagNo}
          />

          {/* Owner ID */}
          <Text style={styles.inputLabel}>Owner ID</Text>
          <View style={styles.readOnlyInput}>
            <Text style={styles.readOnlyText}>{ownerId}</Text>
          </View>

          {/* Select Species */}
          <Text style={styles.inputLabel}>Select Species</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter species"
            placeholderTextColor="#9E9E9E"
            value={selectedSpecies}
            onChangeText={setSelectedSpecies}
          />

          {/* Submit Button */}
          <TouchableOpacity 
            style={styles.submitButton}
            onPress={handleSubmit}
            activeOpacity={0.8}
          >
            <Text style={styles.submitButtonText}>SUBMIT ANIMAL REGISTRATION</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1E88E5",
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingTop: 40,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
  },
  scrollView: {
    flex: 1,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "400",
    color: "#BDBDBD",
    fontStyle: "italic",
    marginBottom: 16,
  },
  imageContainer: {
    width: "100%",
    height: 220,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#1E1E1E",
    marginBottom: 16,
  },
  imagePreview: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  imagePlaceholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2A2A2A",
  },
  placeholderText: {
    marginTop: 12,
    fontSize: 14,
    color: "#757575",
  },
  selectImageButton: {
    flexDirection: "row",
    backgroundColor: "#1E88E5",
    paddingVertical: 14,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    gap: 10,
    elevation: 2,
  },
  selectImageButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  predictButton: {
    flexDirection: "row",
    backgroundColor: "#FF9800",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    gap: 10,
    elevation: 2,
  },
  predictButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.5,
    textAlign: "center",
    flex: 1,
  },
  predictionBox: {
    backgroundColor: "#E3F2FD",
    padding: 16,
    borderRadius: 8,
  },
  predictionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  predictionLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1565C0",
  },
  predictionValue: {
    fontSize: 15,
    fontWeight: "400",
    color: "#424242",
  },
  inputLabel: {
    fontSize: 14,
    color: "#E0E0E0",
    marginBottom: 8,
    marginTop: 16,
  },
  required: {
    color: "#FF5252",
  },
  input: {
    backgroundColor: "#2A2A2A",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: "#fff",
    borderWidth: 1,
    borderColor: "#424242",
  },
  readOnlyInput: {
    backgroundColor: "#1E1E1E",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: "#424242",
  },
  readOnlyText: {
    fontSize: 15,
    color: "#9E9E9E",
  },
  submitButton: {
    backgroundColor: "#1E88E5",
    paddingVertical: 16,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
    elevation: 3,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});

export default AnimalRegistration;