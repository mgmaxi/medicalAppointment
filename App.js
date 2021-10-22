import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Keyboard,
  Platform,
  FlatList,
  StyleSheet,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Appointment from './components/Appointment';
import Form from './components/Form';

const App = () => {
  const [showForm, setShowForm] = useState(false);
  const [appointments, setAppointments] = useState([]);

  // AsyncStorage
  // Get Appointments of Storage
  useEffect(() => {
    const getAppointmentsStorage = async () => {
      try {
        const dataStorage = await AsyncStorage.getItem('appointmentsStorage');
        setAppointments(JSON.parse(dataStorage));
      } catch (error) {
        console.log(error);
      }
    };
    getAppointmentsStorage();
  }, []);

  // Save Appointments on Storage
  const saveAppointmentsStorage = async appointmentsJSON => {
    try {
      await AsyncStorage.setItem('appointmentsStorage', appointmentsJSON);
    } catch (error) {
      console.log(error);
    }
  };

  //fn deletePatient from state
  const deletePatient = id => {
    const appointmentsFilter = appointments.filter(item => item.id !== id);
    setAppointments(appointmentsFilter);
    // Delete Patient/Appointment from Storage
    saveAppointmentsStorage(JSON.stringify(appointmentsFilter));
  };

  //fn show/hide Form
  const showHideForm = () => {
    setShowForm(!showForm);
  };

  //fn closeKeyboard
  const closeKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={() => closeKeyboard()}>
      <View style={styles.container}>
        <Text style={styles.title}>Appointment Manager</Text>

        <View>
          <TouchableHighlight
            onPress={() => showHideForm()}
            style={styles.btnShowForm}>
            <Text style={styles.textShowForm}>
              {showForm ? 'Cancel New Appointment' : 'Create New Appointment'}
            </Text>
          </TouchableHighlight>
        </View>

        <View style={styles.content}>
          {showForm ? (
            <>
              <Text style={styles.subTitle}>Create New Appointment</Text>
              <Form
                appointments={appointments}
                setAppointments={setAppointments}
                setShowForm={setShowForm}
                saveAppointmentsStorage={saveAppointmentsStorage}
              />
            </>
          ) : (
            <>
              <Text style={styles.subTitle}>
                {appointments.length > 0
                  ? 'Appointments'
                  : "You don't have appointments, create one!"}
              </Text>

              <FlatList
                data={appointments}
                renderItem={({item}) => (
                  <Appointment item={item} deletePatient={deletePatient} />
                )}
                keyExtractor={item => item.id}
              />
            </>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5066F5',
  },
  title: {
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    color: '#FFF',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  subTitle: {
    marginTop: 20,
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    marginBottom: 10,
  },
  btnShowForm: {
    marginVertical: 10,
    marginHorizontal: '25%',
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#2196F3',
  },
  textShowForm: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default App;
