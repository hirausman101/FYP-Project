import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Modal, Image, ImageBackground } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { getRecommendations } from "./api";


const steps = [
  { key: "age", label: "Age" },
  { key: "gender", label: "Gender" },
  { key: "symptoms", label: "Symptoms" },
  { key: "diseases", label: "Diseases" },
  { key: "medications", label: "Medications" },
  { key: "meal", label: "Meal" },
];

const ageRanges = [
  { label: "21-29", value: 25 },
  { label: "30-39", value: 35 },
  { label: "40-49", value: 45 },
  { label: "50-59", value: 55 },
  { label: "60-69", value: 65 },
  { label: "70-79", value: 75 },
  { label: "80+", value: 85 },
];

const genderOptions = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];

const symptomOptions = [
  "constipation", "fatigue", "tremors", "sleep issues", "depression"
];
const diseaseOptions = [
  "diabetes", "hypertension", "heart_disease"
];
const medicationOptions = [
  "Levodopa Carbidopa", "Dopamine Agonists", "Mao-b Inhibitors"
];
const mealOptions = ["breakfast", "lunch", "dinner"];

export default function MainScreen({ navigation }) {
  const [form, setForm] = useState({
    age: "",
    gender: "",
    symptoms: [],
    diseases: [],
    medications: [],
    meal: "",
  });
  const [activeStep, setActiveStep] = useState(null);
  const [loading, setLoading] = useState(false);
  const [ageError, setAgeError] = useState("");

  // For multi-select steps
  const toggleMultiSelect = (key, value) => {
    setForm(prev => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter(v => v !== value)
        : [...prev[key], value]
    }));
  };

  // For single-select steps
  const handleSelect = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
    setActiveStep(null);
  };

  // For age validation
  const handleAgeSelect = (value) => {
    if (value < 21 || value > 120) {
      setAgeError("Please select an age between 20 and 120.");
      return;
    }
    setAgeError("");
    setForm(prev => ({ ...prev, age: value }));
    setActiveStep(null);
  };

  // Submit handler
  const handleSubmit = async () => {
  const ageNum = Number(form.age);
  if (!form.age || isNaN(ageNum) || ageNum < 20 || ageNum > 120) {
    alert("Please select age.");
    
    return;
  }
  if (!form.gender) {
    alert("Please select a gender.");
 
    return;
  }
  if (!form.symptoms || form.symptoms.length === 0) {
    alert("Please select at least one symptom.");
    return;
  }
  setLoading(true);
  try {
    const payload = {
      ...form,
      age: ageNum,
      meal: form.meal || "all",
      symptoms: form.symptoms,
      diseases: form.diseases.length > 0 ? form.diseases : null,
      medications: form.medications.length > 0 ? form.medications : null,
    };
    const res = await getRecommendations(payload);
    setLoading(false);
    if (!res) {
      alert("No recommendations found.");
      return;
    }
    if (res.error) {
      alert(res.error);
      return;
    }
    console.log("Recommendations:", res);
    navigation.replace("Result", { result: res });
  } catch (e) {
    setLoading(false);
    alert("Failed to get recommendations. Check your backend/API.");
  }
};
  // Render modal for each step
  const renderStepModal = () => {
    if (activeStep === null) return null;
    const stepKey = steps[activeStep].key;
    return (
      <Modal
        visible={activeStep !== null}
        transparent
        animationType="slide"
        onRequestClose={() => setActiveStep(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select {steps[activeStep].label}</Text>
            {stepKey === "age" && (
              <>
                <View style={styles.grid}>
                  {ageRanges.map((range, idx) => (
                    <TouchableOpacity
                      key={range.label}
                      style={styles.square}
                      onPress={() => handleAgeSelect(range.value)}
                    >
                      <Text style={styles.squareLabel}>{range.label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
                {ageError ? <Text style={{ color: "red", marginTop: 10 }}>{ageError}</Text> : null}
              </>
            )}
            {stepKey === "gender" && (
              <View style={styles.grid}>
                {genderOptions.map(opt => (
                  <TouchableOpacity
                    key={opt.value}
                    style={styles.square}
                    onPress={() => handleSelect("gender", opt.value)}
                  >
                    <Text style={styles.squareLabel}>{opt.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
            {stepKey === "symptoms" && (
              <View style={styles.grid}>
                {symptomOptions.map(opt => (
                  <TouchableOpacity
                    key={opt}
                    style={[
                      styles.square,
                      form.symptoms.includes(opt) && styles.squareSelected
                    ]}
                    onPress={() => toggleMultiSelect("symptoms", opt)}
                  >
                    <Text style={styles.squareLabel}>{opt}</Text>
                  </TouchableOpacity>
                ))}
                <TouchableOpacity
                  style={[styles.square, { backgroundColor: "#624e80" }]}
                  onPress={() => setActiveStep(null)}
                >
                  <Text style={[styles.squareLabel, { color: "#fff" }]}>Done</Text>
                </TouchableOpacity>
              </View>
            )}
            {stepKey === "diseases" && (
              <View style={styles.grid}>
                {diseaseOptions.map(opt => (
                  <TouchableOpacity
                    key={opt}
                    style={[
                      styles.square,
                      form.diseases.includes(opt) && styles.squareSelected
                    ]}
                    onPress={() => toggleMultiSelect("diseases", opt)}
                  >
                    <Text style={styles.squareLabel}>{opt}</Text>
                  </TouchableOpacity>
                ))}
                <TouchableOpacity
                  style={[styles.square, { backgroundColor: "#624e80" }]}
                  onPress={() => setActiveStep(null)}
                >
                  <Text style={[styles.squareLabel, { color: "#fff" }]}>Done</Text>
                </TouchableOpacity>
              </View>
            )}
            {stepKey === "medications" && (
              <View style={styles.grid}>
                {medicationOptions.map(opt => (
                  <TouchableOpacity
                    key={opt}
                    style={[
                      styles.square,
                      form.medications.includes(opt) && styles.squareSelected
                    ]}
                    onPress={() => toggleMultiSelect("medications", opt)}
                  >
                    <Text style={styles.squareLabel}>{opt}</Text>
                  </TouchableOpacity>
                ))}
                <TouchableOpacity
                  style={[styles.square, { backgroundColor: "#624e80" }]}
                  onPress={() => setActiveStep(null)}
                >
                  <Text style={[styles.squareLabel, { color: "#fff" }]}>Done</Text>
                </TouchableOpacity>
              </View>
            )}
            {stepKey === "meal" && (
              <View style={styles.grid}>
                {mealOptions.map(opt => (
                  <TouchableOpacity
                    key={opt}
                    style={[
                      styles.square,
                      form.meal === opt && styles.squareSelected
                    ]}
                    onPress={() => handleSelect("meal", opt)}
                  >
                    <Text style={styles.squareLabel}>{opt}</Text>
                  </TouchableOpacity>
                ))}
                <TouchableOpacity
                  style={[styles.square, { backgroundColor: "#624e80" }]}
                  onPress={() => handleSelect("meal", "")}
                >
                  <Text style={[styles.squareLabel, { color: "#fff" }]}>All</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </Modal>
    );
  };

  if (loading) {
    return (
      <View style={[styles.mainPage, { justifyContent: "center", alignItems: "center" }]}>
        <Text style={{ fontSize: 20, marginBottom: 20 }}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.mainPage}>
        <ImageBackground
        source={require("./assets/mainbg.png")}
        style={styles.backgroundImage}
        resizeMode="cover">
      <ScrollView contentContainerStyle={styles.scrollContent}>
       
        <View style={styles.stepsGrid}>
         {steps.map((step, idx) => {
  const value = form[step.key];
  const isCompleted =
    (Array.isArray(value) && value.length > 0) ||
    (!Array.isArray(value) && value);

  return (
          <TouchableOpacity
                key={step.key}
                style={[
                  styles.stepSquare,
                  isCompleted && styles.stepSquareCompleted
                ]}
                onPress={() => setActiveStep(idx)}
              >
                <Text style={styles.stepNumber}>{idx + 1}</Text>
                <Text style={styles.stepLabel}>{step.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
        {renderStepModal()}
      </ScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  stepSquareCompleted: {
  backgroundColor: "#ebe3bbr",
  borderWidth: 2,
  borderColor: "#577a50",
},
  mainPage: {
    flex: 1,
    backgroundColor: "#a5c79f",
  },
  backgroundImage:{
    height:'100%',
  },
  scrollContent: {
    alignItems: "center",
    paddingVertical: 30,
    paddingHorizontal: 10,
  },
  topCard: {
    width: "90%",
    backgroundColor: "#f4f1e6",
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
    alignItems: "center",
    elevation: 4,
  },
  topCardTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#624e80",
    letterSpacing: 2,
  },
  stepsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 30,
    marginTop:70,
  },
  stepSquare: {
    width: 110,
    height: 110,
    backgroundColor: "#F9F6E6",
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  stepNumber: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#624e80",
  },
  stepLabel: {
    fontSize: 16,
    color: "#222",
    marginTop: 6,
    marginBottom: 4,
    textAlign: "center",
    fontWeight: "bold",
  },
  stepValue: {
    fontSize: 13,
    color: "#444",
    marginTop: 2,
    textAlign: "center",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 10,
  },
  square: {
    width: 90,
    height: 90,
    backgroundColor: "#faf5cd",
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    margin: 8,
    elevation: 2,
  },
  squareSelected: {
    backgroundColor: "#b7c7a4",
    borderWidth: 2,
    borderColor: "#2d3c2e",
  },
  squareLabel: {
    fontSize: 16,
    color: "#2d3c2e",
    textAlign: "center",
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 24,
    width: "90%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 18,
    color: "#624e80",
  },
  submitButton: {
    backgroundColor: "#577a50",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 30,
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
});