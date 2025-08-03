import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Audio } from 'expo-av';

export default function App() {
  const [recording, setRecording] = React.useState<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = React.useState(false);
  const [analysisResult, setAnalysisResult] = React.useState<any>(null);

  const startRecording = async () => {
    try {
      const permission = await Audio.requestPermissionsAsync();
      if (permission.status !== 'granted') {
        Alert.alert('Permission required', 'Please grant microphone permission to record audio.');
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      setIsRecording(true);
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  const stopRecording = async () => {
    setIsRecording(false);
    if (!recording) return;

    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });

    // Mock analysis - replace with actual AI analysis
    const mockResult = {
      gender: Math.random() > 0.5 ? 'Female' : 'Male',
      genderConfidence: Math.floor(Math.random() * 30) + 70,
      ageRange: ['18-25', '25-35', '35-45', '45-55', '55+'][Math.floor(Math.random() * 5)],
      ageConfidence: Math.floor(Math.random() * 30) + 60,
      ethnicity: ['Caucasian', 'African American', 'Hispanic', 'Asian', 'Mixed'][Math.floor(Math.random() * 5)],
      ethnicityConfidence: Math.floor(Math.random() * 25) + 55,
    };

    setTimeout(() => {
      setAnalysisResult(mockResult);
    }, 2000);

    setRecording(null);
  };

  const resetAnalysis = () => {
    setAnalysisResult(null);
  };

  if (analysisResult) {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.title}>Analysis Results</Text>
        
        <View style={styles.resultCard}>
          <Text style={styles.resultLabel}>Gender</Text>
          <Text style={styles.resultValue}>{analysisResult.gender}</Text>
          <Text style={styles.confidence}>Confidence: {analysisResult.genderConfidence}%</Text>
        </View>

        <View style={styles.resultCard}>
          <Text style={styles.resultLabel}>Age Range</Text>
          <Text style={styles.resultValue}>{analysisResult.ageRange}</Text>
          <Text style={styles.confidence}>Confidence: {analysisResult.ageConfidence}%</Text>
        </View>

        <View style={styles.resultCard}>
          <Text style={styles.resultLabel}>Ethnicity</Text>
          <Text style={styles.resultValue}>{analysisResult.ethnicity}</Text>
          <Text style={styles.confidence}>Confidence: {analysisResult.ethnicityConfidence}%</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={resetAnalysis}>
          <Text style={styles.buttonText}>🔄 Record Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.title}>Voice Analysis</Text>
      <Text style={styles.subtitle}>
        Tap the button below to start recording. We'll analyze your voice to predict demographic characteristics.
      </Text>

      <View style={styles.recordingSection}>
        <TouchableOpacity
          style={[styles.recordButton, isRecording ? styles.recordingButton : styles.readyButton]}
          onPress={isRecording ? stopRecording : startRecording}
        >
          <Text style={styles.recordButtonText}>
            {isRecording ? '⏸️' : '🎤'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.statusText}>
          {isRecording ? 'Recording... Tap to stop' : 'Ready to record'}
        </Text>
      </View>

      <View style={styles.infoSection}>
        <View style={styles.infoCard}>
          <Text style={styles.infoIcon}>🎤</Text>
          <Text style={styles.infoTitle}>Record</Text>
          <Text style={styles.infoDescription}>
            Capture your voice using your device's microphone. Speak naturally for 10-30 seconds.
          </Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoIcon}>🧠</Text>
          <Text style={styles.infoTitle}>Analyze</Text>
          <Text style={styles.infoDescription}>
            Our AI analyzes acoustic features like pitch, formants, and spectral characteristics.
          </Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoIcon}>📊</Text>
          <Text style={styles.infoTitle}>Predict</Text>
          <Text style={styles.infoDescription}>
            Machine learning models predict demographic characteristics with confidence scores.
          </Text>
        </View>
      </View>

      <View style={styles.privacyNotice}>
        <Text style={styles.privacyText}>
          🔒 Your voice data is processed locally and not stored on our servers.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 40,
  },
  recordingSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 30,
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  recordButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  readyButton: {
    backgroundColor: '#FF3B30',
  },
  recordingButton: {
    backgroundColor: '#8E8E93',
  },
  recordButtonText: {
    fontSize: 40,
  },
  statusText: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
  },
  infoSection: {
    marginBottom: 20,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  infoIcon: {
    fontSize: 32,
    marginBottom: 10,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  infoDescription: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
    lineHeight: 20,
  },
  privacyNotice: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  privacyText: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
  },
  resultCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resultLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8E8E93',
    marginBottom: 8,
  },
  resultValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 4,
  },
  confidence: {
    fontSize: 14,
    color: '#007AFF',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});