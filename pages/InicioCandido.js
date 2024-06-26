import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, FlatList, Image, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import axios from 'axios';
import { useNavigation} from '@react-navigation/native';


const InicioCandido = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [candidatoSeleccionado, setCandidatoSeleccionado] = useState(null);
  const [listCandidatos, setListCandidatos] = useState([]);
  const [setLoading, loading] = useState(true);

  useEffect(() => {
    fetchCandidatos();
  }, []);

  const fetchCandidatos = async () => {
      try {
        const response = await axios.get('https://ibso3a41gmzf.share.zrok.io/api/candidatos/');
        setListCandidatos(response.data)
       
        
      } catch (error) {
        console.log(error)
       
      }
  }


  const abrirModal = (candidato) => {
    setCandidatoSeleccionado(candidato);
    setIsModalOpen(true);
  };


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Jornada Electoral</Text>
      </View>

      <View style={styles.content}>
        <FlatList
          data={listCandidatos}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{item.partido}</Text>
              </View>
              <View style={styles.cardContent}>
                <View style={styles.itemContainer}>
                  <Image source={{ uri: item.imgFoto }} style={styles.thumbnail} />
                  <Text style={styles.candidateName}>{item.candidato}</Text>
                </View>  
                <TouchableOpacity style={styles.buttonOutline} onPress={() => abrirModal(item)}>
                  <Text style={styles.buttonText}>Detalle</Text>
                </TouchableOpacity>           
              </View>
            </View>
          )}
        />
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('IneApp')}>
                  <Text style={styles.buttonText}>Votar</Text>
        </TouchableOpacity>
      </View>
      <Modal visible={isModalOpen} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Propuesta</Text>
            <TouchableOpacity style={styles.closeButton} onPress={() => setIsModalOpen(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
            <View>
              {candidatoSeleccionado && candidatoSeleccionado.propuestas.map((propuesta, index) => (
                <Text key={index} style={styles.propuestaText}>{propuesta.titulo}</Text>
              ))}
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
    backgroundColor: '#000000',
  },
  header: {
    backgroundColor: '#3c4b4e',
    padding: 20,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  content: {
    padding: 20,
  },
  card: {
    backgroundColor: '#3c4b4e',
    borderRadius: 10,
    elevation: 8,
    marginVertical: 10,
    padding: 20,
  },
  cardHeader: {
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardContent: {
    flexDirection: 'column',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  candidateName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#74847c',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    alignItems: 'center',
  },
  buttonOutline: {
    borderColor: '##74847c',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    alignItems: 'center',
  },
  buttonRound: {
    backgroundColor: '#ff1744',
    padding: 10,
    borderRadius: 50,
    marginVertical: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
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
  propuestaText: {
    fontSize: 16,
    marginVertical: 5,
  },
  chartContainer: {
    alignItems: 'center',
    width: '100%',
  },
});


export default InicioCandido;