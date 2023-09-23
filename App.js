/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-bitwise */ 
/* eslint-disable no-shadow */
import React from 'react';
import {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Button} from 'react-native';

export default function App() {
  // Mapeamento de teclas
  const buttons = [
    'LIMPAR',
    'DEL',
    '%',
    '/',
    7,
    8,
    9,
    'x',
    6,
    5,
    4,
    '-',
    3,
    2,
    1,
    '+',
    0,
    '.',
    '+/-',
    '=',
  ];

  const [currentNumber, setCurrentNumber] = useState('');
  const [lastNumber, setLastNumber] = useState('');

  function calculator() {
    const splitNumbers = currentNumber.split(' ');
    const firstNumber = parseFloat(splitNumbers[0]);
    const secondNumber = parseFloat(splitNumbers[2]);
    const operator = splitNumbers[1];

    // Faz ação referente tecla pressionada
    switch (operator) {
      case '+':
        setCurrentNumber((firstNumber + secondNumber).toString());
        return;
      case '-':
        setCurrentNumber((firstNumber - secondNumber).toString());
        return;
      case 'x':
        setCurrentNumber((firstNumber * secondNumber).toString());
        return;
      case '/':
        setCurrentNumber((firstNumber / secondNumber).toString());
        return;
      case '%':
        // Calculate the percentage of the first number
        setCurrentNumber((firstNumber * (secondNumber / 100)).toString());
        break;
      case '+/-':
        if (currentNumber.startsWith('- ')) {
          setCurrentNumber(currentNumber.substring(2));
        } else {
          setCurrentNumber('- ' + currentNumber);
        }
        return;
    }
  }

  function handleInput(buttonPressed) {
    console.log(buttonPressed); // Mostra no Console a tecla pressionada
    if (
      (buttonPressed === '+') |
        (buttonPressed === '-') |
        (buttonPressed === 'x') |
        (buttonPressed === '%') | //portcentagen
        (buttonPressed === '+/-') || //inversão de sinal
      buttonPressed === '/'
    ) {
      setCurrentNumber(currentNumber + ' ' + buttonPressed + ' ');
      return;
    }
    switch (buttonPressed) {
      case 'DEL':
        setCurrentNumber(currentNumber.substring(0, currentNumber.length - 1));
        return;
      case 'LIMPAR': // Limpa todo o conteúdo
        setLastNumber('');
        setCurrentNumber('');
        return;
      case '=':
        setLastNumber(currentNumber + ' = ');
        calculator();
        return;
      case '%': //Porcentagem
        setCurrentNumber((parseFloat(currentNumber) * 0.01).toString());
        break;
      //Logica de inversão de sinal
      case '+/-':
        if (currentNumber.startsWith('-')) {
          setCurrentNumber(currentNumber.substring(1));
        } else {
          setCurrentNumber('-' + currentNumber);
        }
        return;
    }

    setCurrentNumber(currentNumber + buttonPressed);
  }

  return (
    <View style={styles.container}>
      {/* Area onde o resultado é exibido */}
      <View style={styles.results}>
        <Text style={styles.historyText}>{lastNumber}</Text>
        <Text style={styles.resultText}>{currentNumber}</Text>
      </View>

      {/* Area onde os botões são exibidos*/}
      <View style={styles.buttons}>
        {buttons.map(button =>
          button === '=' ? ( // Mapeamento do botão =
            <TouchableOpacity
              onPress={() => handleInput(button)}
              key={button}
              style={[styles.button, {backgroundColor: '#3dd0e3'}]}>
              <Text style={[styles.textButton, {color: 'white', fontSize: 30}]}>
                {button}
              </Text>
            </TouchableOpacity>
          ) : (
            // Mapeamento dos outros botões //add correção na área de texto onde os botões permanacem brancos
            <TouchableOpacity
              onPress={() => handleInput(button)}
              key={button}
              style={styles.button}>
              <Text
                style={[
                  styles.textButton,
                  {color: typeof button === 'number' ? 'black' : '#0093a6'},
                ]}>
                {button}
              </Text>
            </TouchableOpacity>
          ),
        )}
      </View>
    </View>
  );
}

// Estilização
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  results: {
    flex: 2,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  resultText: {
    color: '#282F38',
    fontSize: 32,
    fontWeight: 'bold',
    padding: 12,
    textAlign: 'right',
  },
  historyText: {
    color: '#7c7c7c',
    fontSize: 20,
    marginRight: 10,
    alignSelf: 'flex-end',
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 90,
    minHeight: 90,
    flex: 2,
  },
  textButton: {
    color: '#7c7c7c',
    fontSize: 20,
  },
});
