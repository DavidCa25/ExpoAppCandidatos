import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, FlatList, Image, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import axios from 'axios';
import CamaraFaceDetection from './CamaraFaceDetection';
import GraficosVotaciones from './GraficosVotaciones';
import { useNavigation } from '@react-navigation/native';

const CandidatoApp = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenV, setIsModalOpenV] = useState(false);
  const [candidatoSeleccionado, setCandidatoSeleccionado] = useState(null);
  const [listCandidatos, setListCandidatos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCandidatos();
  }, []);

  const fetchCandidatos = async () => {
    try {
      const response = await axios.get('https://ibso3a41gmzf.share.zrok.io/api/candidatos/');
      setListCandidatos(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const votarPorCandidato = async (candidatoId) => {
    try {
      const response = await axios.put(`https://ibso3a41gmzf.share.zrok.io/api/candidatos/${candidatoId}`);
      setListCandidatos(response.data);
      Alert.alert(
        'Voto Realizado',
        'Tu voto se ha realizado correctamente',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        {
          cancelable: true,
          onDismiss: () =>
            Alert.alert('This alert was dismissed by tapping outside of the alert dialog.'),
        }
      );
      navigation.navigate('InicioVista');
    } catch (error) {
      console.log(error);
      Alert.alert(
        'Hubo un error con tu Voto',
        'No se pudo realizar tu voto',
        [{ text: 'Cancel', onPress: () => console.log('OK Pressed'), style: 'cancel' }],
        {
          cancelable: true,
          onDismiss: () =>
            Alert.alert('This alert was dismissed by tapping outside of the alert dialog.'),
        }
      );
    }
  };

  if (loading) {
    return <View style={styles.container}><ActivityIndicator size="large" color="#0000ff" /></View>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Jornada Electoral</Text>
      </View>
      <FlatList
        data={listCandidatos}
        keyExtractor={(item) => item._id.toString()}
        numColumns={3}
        columnWrapperStyle={styles.row}
        ListHeaderComponent={() => (
          <View style={styles.cameraCard}>
            <Text style={styles.title}>Video Votacion</Text>
            <CamaraFaceDetection />
          </View>
        )}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{item.partido}</Text>
            </View>
            <View style={styles.cardContent}>
              <Image source={{ uri: item.imgFoto }} style={styles.thumbnail} />
              <Text style={styles.candidateName}>{item.candidato}</Text>
              <TouchableOpacity style={styles.button} onPress={() => votarPorCandidato(item._id)}>
                <Text style={styles.buttonText}>Votar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <Modal visible={isModalOpenV} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Encuestas</Text>
            <TouchableOpacity style={styles.closeButton} onPress={() => setIsModalOpenV(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
            <View style={styles.chartContainer}>
              <GraficosVotaciones />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    backgroundColor: '#6200ea',
    padding: 20,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  cameraCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 8,
    margin: 10,
    padding: 20,
    alignItems: 'center',
    height: 400,
  },
  listSection: {
    flex: 1,
    padding: 10,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 8,
    margin: 5,
    padding: 10,
    flex: 1,
    maxWidth: '30%', // Ensures that cards are equally distributed
  },
  cardHeader: {
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cardContent: {
    alignItems: 'center',
  },
  thumbnail: {
    width: 50,
    height: 50,
    marginBottom: 10,
    borderRadius: 25,
  },
  candidateName: {
    fontSize: 14,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#6200ea',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#6200ea',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
  },
  chartContainer: {
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
  },
});

export default CandidatoApp;
