import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';
import Appointment from './components/Appointment';
import Form from './components/Form';

const App = () => {
  const [showForm, setShowForm] = useState(false);
  const [appointments, setAppointments] = useState([]);

  //fn deletePatient from state
  const deletePatient = id => {
    setAppointments(actualAppointments => {
      return actualAppointments.filter(item => item.id !== id);
    });
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
