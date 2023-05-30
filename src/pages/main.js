import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button, TouchableOpacity, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

const Main = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedOption, setSelectedOption] = useState('hourly');
  const [chartData, setChartData] = useState(null);
  const [chartVisible, setChartVisible] = useState(false);


  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option.value);
  };

  const handleSubmit = async () => {
    console.log('Selected Date:', selectedDate);
    console.log('Selected Option:', selectedOption);

    // const token = await AsyncStorage.getItem('token');
    // const headersList = {
    //   "Accept": "*/*",
    //   "Content-Type": "application/json",
    //   "Authorization": `Bearer ${token}`
    // }

    // const response = api.get(`/products/1/consumption?type={selectedOption}&date=${selectedDate ? selectedDate : '2023-05-25'}`, headersList);

    const resultMock = {
      consumptionInKw: {
        data: [15, 20, 30, 8, 97, 46, 71, 89, 10, 5, 84, 6, 15, 20, 30],
        averag: 15,
        mode: 10
      },

      consumptionInMoney: {
        data: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8],
        averag: 15,
        mode: 10
      }
    }

    console.log('Response:', resultMock);

    setChartVisible(true);
    setChartData(resultMock.consumptionInKw.data);

  };

  const options = [
    {
      label: 'Por hora',
      value: 'hourly',
    },
    {
      label: 'Por dia',
      value: 'daily',
    },
  ];

  const renderChart = () => {
    if (chartVisible) {
      return (
        <View>
          <Text style={styles.title}>Consumo de Energia</Text> {/* Envolve o título com o componente <Text> */}
          {/* Restante do código do gráfico */}
        </View>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <TextInput
          style={styles.input}
          placeholder="Selecione a data (yyyy-mm-dd)"
          value={selectedDate}
          onChangeText={handleDateChange}
        />

        <View style={[styles.optionsContainer, styles.horizontalOptionsContainer]}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.optionButton,
                selectedOption === option.value && styles.selectedOptionButton,
                index < options.length - 1 && { marginRight: 60 },
              ]}
              onPress={() => handleOptionChange(option.value)}
            >
              <Text
                style={[
                  styles.optionText,
                  selectedOption === option.value && styles.selectedOptionText,
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Enviar" onPress={handleSubmit} />
      </View>

      <View style={styles.chartContainer}>
        {chartData && (
          <LineChart
            data={{
              labels: chartData.map((_, index) => String(index + 1)),
              datasets: [
                {
                  data: chartData,
                  color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
                  strokeWidth: 2,
                },
              ],
            }}
            width={380}
            height={200}
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            bezier
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 16,
  },
  topContainer: {
    width: '80%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  optionsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  horizontalOptionsContainer: {
    flexDirection: 'row',
  },
  optionButton: {
    padding: 8,
    backgroundColor: '#eee',
    borderRadius: 4,
  },
  selectedOptionButton: {
    backgroundColor: 'blue',
  },
  optionText: {
    fontSize: 16,
  },
  selectedOptionText: {
    color: 'white',
  },
  buttonContainer: {
    width: '80%',
    marginTop: 12,
  },
  chartContainer: {
    marginTop: 16,
    width: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  }
});

export default Main;
