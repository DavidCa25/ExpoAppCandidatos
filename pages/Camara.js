import { CameraView } from "expo-camera";
import { Alert, Button, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useRef } from "react";

const Camera = (props) => {
    const { scanned, setScanned, setImage } = props;
    const cameraRef = useRef(null);

    const handleTakePicture = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync();
            setImage(photo.uri);
            setScanned(true);
        }
    };

    return (
        <View style={styles.cameraContainer}>
            <CameraView
                ref={cameraRef}
                style={styles.camera}
                facing={"back"}
            >
               
            </CameraView>
            <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={handleTakePicture}>
                        <Text style={styles.buttonText}>Tomar Foto</Text>
                    </TouchableOpacity>
                </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cameraContainer: {
        width: '80%',
        borderRadius: 10,
        marginBottom: 40,
        overflow: 'hidden',
        aspectRatio: 1,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        margin: 20,
    },
    button: {
        flex: 0.1,
        alignSelf: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10,
        margin: 10,
    },
    buttonText: {
        fontSize: 18,
        color: '#000',
    },
});

export default Camera;
