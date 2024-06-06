import { CameraView, useCameraPermissions } from "expo-camera";
import { Alert, Button, StyleSheet, View, Text } from "react-native";

const Camera = (props) => {
    const {scanned, setScanned} = props
    const [permission, requestPermission] = useCameraPermissions()
    const handleScanned = ({ type, data}) => {
        setScanned(true);
        Alert.alert(
            "Barcode",
            `Tipo de Barcode ${type} y datos ${data} escaneado!`,
            [
                { text: "OK", onPress: () => setScanned(false)}
            ]
        );
    }

    if(!permission){
        return(
            <View></View>
        );
    }

    if(!permission.granted){
        return(
            <View style={styles.cameraContainer}>
                <Text>Necesitas los permisos de camara</Text>
                <Button onPress={requestPermission} title="Pedir permisos"></Button>
            </View>
            
        );
    }

    return(
        <View style={styles.cameraContainer}>
            <CameraView
                style={styles.camera}
                facing={"back"}
                barcodeScannerSettings={{
                    barcodeTypes: ["qr"]
                }}
                onBarcodeScanned={scanned ? undefined: handleScanned}
            >
            </CameraView>
        </View>
    );
};

const styles = StyleSheet.create({
    cameraContainer: {
        width: '80%',
        borderRadius: 10,
        marginBottom: 40,
        overflow: 'hidden',
        aspectRatio: 1
    },
    camera: {
        flex: 1
    }
});

export default Camera;