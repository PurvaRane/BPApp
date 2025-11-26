import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StatusBar,
  Modal,
  Pressable,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";

function HomeScreen({ navigation }) {
  const [showNotif, setShowNotif] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showAnimalMenu, setShowAnimalMenu] = useState(false);
  const [searchText, setSearchText] = useState("");

  const openCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Camera permission is required!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      console.log("Captured Image:", result.assets[0].uri);
      //pending
    }
  };

  const transactionData = [
    { id: 1, label: "XXXX", color: "#1A73E8" },
    { id: 2, label: "XXXX", color: "#0D47A1" },
    { id: 3, label: "XXXX", color: "#42A5F5" },
    { id: 4, label: "XXXX", color: "#90CAF9" },
  ];

  const quickServices = [
    { id: 1, title: "Owner Management", icon: "person-outline" },
    { id: 2, title: "Animal Management", icon: "paw-outline" },
    { id: 3, title: "Flock Management", icon: "git-branch-outline" },
    { id: 4, title: "Animal Health", icon: "medkit-outline" },
    { id: 5, title: "Animal Breeding", icon: "male-female-outline" },
    { id: 6, title: "Performance Recording", icon: "stats-chart-outline" },
    { id: 7, title: "Miscellaneous", icon: "grid-outline" },
    { id: 8, title: "Untagged Animal", icon: "barcode-outline" },
  ];

  // Show AnimalManagementMenu if state is true
  if (showAnimalMenu) {
    return <AnimalManagementMenu onBack={() => setShowAnimalMenu(false)} />;
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#1A73E8" barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>HomePage</Text>

        <View style={styles.headerIcons}>
          {/* Notification Icon */}
          <TouchableOpacity style={styles.iconButton} onPress={() => setShowNotif(true)}>
            <Ionicons name="notifications-outline" size={28} color="#fff" />
          </TouchableOpacity>

          {/* Calendar Icon */}
          <TouchableOpacity style={styles.iconButton} onPress={() => setShowCalendar(true)}>
            <Ionicons name="calendar-outline" size={28} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Notification Modal */}
      <Modal transparent visible={showNotif} animationType="fade">
        <Pressable style={styles.modalOverlay} onPress={() => setShowNotif(false)}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Notifications</Text>
            <Text style={styles.modalText}>No new notifications.</Text>
          </View>
        </Pressable>
      </Modal>

      {/* Calendar Modal */}
      <Modal transparent visible={showCalendar} animationType="fade">
        <Pressable style={styles.modalOverlay} onPress={() => setShowCalendar(false)}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Calendar</Text>
            <Text style={styles.modalText}>Upcoming events will appear here.</Text>
          </View>
        </Pressable>
      </Modal>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* View Animal History */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>View Animal History</Text>

          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search animal..."
              placeholderTextColor="#777"
              value={searchText}
              onChangeText={setSearchText}
            />

            {/* Search Button */}
            <TouchableOpacity style={styles.searchButton}>
              <Ionicons name="search-outline" size={24} color="#1A73E8" />
            </TouchableOpacity>

            {/* Camera Button */}
            <TouchableOpacity style={styles.cameraButton} onPress={openCamera}>
              <Ionicons name="camera-outline" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* NAIP Section */}
        <View style={styles.section}>
          <View style={styles.naipHeader}>
            <Ionicons name="cube-outline" size={24} color="#1A73E8" />
            <Text style={styles.naipTitle}>Livestock NAIP IV</Text>
          </View>

          <View style={styles.transactionGrid}>
            {transactionData.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[styles.transactionCard, { borderLeftColor: item.color }]}
              >
                <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                  <Ionicons name="document-text-outline" size={22} color={item.color} />
                  <Text style={[styles.transactionLabel, { color: item.color }]}>
                    {item.label}
                  </Text>
                </View>

                <Ionicons name="ellipse" size={12} color={item.color} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Quick Services */}
        <View style={styles.quickServiceSection}>
          <Text style={styles.sectionTitle}>Quick Service</Text>

          <View style={styles.serviceContainer}>
            <View style={styles.serviceGrid}>
              {quickServices.map((service) => (
                <TouchableOpacity
                  key={service.id}
                  style={styles.serviceCard}
                  onPress={() => {
                    if (service.title === "Animal Management") {
                      setShowAnimalMenu(true);
                    } else {
                      console.log(service.title);
                    }
                  }}
                >
                  <View style={styles.serviceIconContainer}>
                    <Ionicons name={service.icon} size={32} color="#1A73E8" />
                  </View>

                  <Text style={styles.serviceTitle} numberOfLines={2}>
                    {service.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Nav */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIconActive}>▲</Text>
          <Text style={styles.navTextActive}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>▢</Text>
          <Text style={styles.navText}>Tasks</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>◐</Text>
          <Text style={styles.navText}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>○</Text>
          <Text style={styles.navText}>Info</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function AnimalManagementMenu({ onBack }) {
  const MenuItem = ({ icon, label, onPress }) => (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 14,
        paddingHorizontal: 20,
        backgroundColor: "white",
        borderRadius: 12,
        marginBottom: 18,
        elevation: 2,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
      }}
    >
      <Ionicons name={icon} size={22} color="#2F4F4F" style={{ marginRight: 14 }} />
      <Text style={{ flex: 1, fontSize: 16, color: "#333", fontWeight: "500" }}>
        {label}
      </Text>
      <Ionicons name="chevron-forward" size={20} color="#999" />
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#F5F5F5" }}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <TouchableOpacity onPress={onBack}>
            <Ionicons name="arrow-back" size={28} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Animal Management</Text>
        </View>
      </View>

      <ScrollView style={{ padding: 20 }}>
        <MenuItem
          icon="paw-outline"
          label="Animal Registration"
          onPress={() => console.log("Animal Registration")}
        />

        <MenuItem
          icon="swap-horizontal-outline"
          label="Ownership Transfer"
          onPress={() => console.log("Ownership Transfer")}
        />

        <MenuItem
          icon="refresh-outline"
          label="Ear Tag Change"
          onPress={() => console.log("Ear Tag Change")}
        />

        <MenuItem
          icon="search-outline"
          label="Search & Modify Animal"
          onPress={() => console.log("Search & Modify Animal")}
        />

        <MenuItem
          icon="pricetag-outline"
          label="Latest Tag"
          onPress={() => console.log("Latest Tag")}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F7F9FC" },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#14335dff",
    paddingTop: 40,
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#ffffffff",
  },

  headerIcons: {
    flexDirection: "row",
    gap: 15,
  },

  iconButton: {
    padding: 6,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalBox: {
    width: 300,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    elevation: 10,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10,
    color: "#333",
  },

  modalText: {
    fontSize: 16,
    color: "#555",
  },

  scrollView: { flex: 1 },

  section: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 15,
  },

  searchContainer: { flexDirection: "row", alignItems: "center", gap: 10 },
  searchInput: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#D6E3F3",
  },
  searchButton: {
    width: 50,
    height: 50,
    backgroundColor: "#E3F2FD",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  cameraButton: {
    width: 50,
    height: 50,
    backgroundColor: "#14335dff",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  naipHeader: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 10 },
  naipTitle: { fontSize: 18, fontWeight: "700", color: "#1A1A1A" },

  transactionGrid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  transactionCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderLeftWidth: 5,
    elevation: 2,
  },
  transactionLabel: { fontSize: 20, fontWeight: "700" },

  quickServiceSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  serviceContainer: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    elevation: 3,
  },
  serviceGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10,
  },
  serviceCard: { width: "22.5%", alignItems: "center" },
  serviceIconContainer: {
    width: 64,
    height: 64,
    backgroundColor: "#E3F2FD",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  serviceTitle: {
    fontSize: 11,
    textAlign: "center",
    color: "#444",
    marginTop: 6,
    fontWeight: "500",
  },

  bottomNav: {
    flexDirection: "row",
    backgroundColor: "#14335dff",
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  navItem: { flex: 1, alignItems: "center", gap: 4 },
  navIcon: { fontSize: 24, opacity: 0.5, color: "#fff" },
  navIconActive: { fontSize: 24, color: "#fff" },
  navText: { fontSize: 11, color: "#fff", opacity: 0.5 },
  navTextActive: { fontSize: 11, color: "#fff", fontWeight: "700" },
});

export default HomeScreen;