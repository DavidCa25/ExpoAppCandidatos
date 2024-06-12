import { CameraView } from "expo-camera";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import React, { useRef, useState } from "react";
import * as FaceDetector from 'expo-face-detector';

const { width, height } = Dimensions.get('window');

const CamaraFaceDetecion = (props) => {
    const cameraRef = useRef(null);
    const [isDetecting, setIsDetecting] = useState(false);
    const [detectedFaces, setDetectedFaces] = useState([]);

    const handleFacesDetected = ({ faces }) => {
      if (faces.length > 0) {
        console.log('Faces Detected', faces.length);
        setDetectedFaces(faces);
      } else {
        console.log('No Faces Detected');
        setDetectedFaces([]);
      }
    };

    const toggleFaceDetection = async () => {
      setIsDetecting(!isDetecting);
    };

    const renderFacesBoxes = () => {
      return detectedFaces.map((face, index) => (
        <View
          key={index}
          style={[
            styles.faceBox,
            {
              left: face.bounds.origin.x,
              top: face.bounds.origin.y,
              width: face.bounds.size.width,
              height: face.bounds.size.height
            }
          ]}
        />
      ));
    };

    return (
        <View style={styles.cameraContainer}>
            <CameraView
                style={styles.camera}
                facing={"front"}
                onFacesDetected={handleFacesDetected}
                faceDetectorSettings={{
                  mode: FaceDetector.FaceDetectorMode.fast,
                  detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
                  runClassifications: FaceDetector.FaceDetectorClassifications.none,
                  minDetectionInterval: 100,
                  tracking: true,
                }}
                ref={cameraRef}
            >
            {renderFacesBoxes()}
            </CameraView>
            
            <View style={styles.buttonContainer}>
            <TouchableOpacity
                style={styles.button}
                onPress={toggleFaceDetection}
              >
                <Text style={styles.buttonText}>{isDetecting ? 'Detener Detección' : 'Iniciar Detección'}</Text>
              </TouchableOpacity>
            </View>
            
        </View>
    );
};

const styles = StyleSheet.create({
    cameraContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        overflow: 'hidden'
    },
    buttonContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
  },
    camera: {
        width: width * 0.7,
        height: height * 0.35, 
    },
    button: {
        position: 'absolute',
        bottom: 20,
        backgroundColor: '#6200ea',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 18,
        color: '#000',
    },
    faceBox: {
      position: 'absolute',
      borderColor: 'yellow',
      borderWidth: 2,
      borderRadius: 10,
    },
});

export default CamaraFaceDetecion;
