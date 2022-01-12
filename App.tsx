/* eslint-disable @typescript-eslint/no-shadow */
import React from 'react';
import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import {VictoryBar, VictoryChart, VictoryTheme} from 'victory-native';

const data: any[] = [];

const getRandom = (min: any, max: any) => {
  return Math.floor(Math.random() * (max + 1 - min) + min);
};

const gerarDadosAleatorios = () => {
  for (let i = 1; i <= 38; i++) {
    let obj = {mortalidade: getRandom(i, 130), idade: i};
    data.push(obj);
  }
};

const window = Dimensions.get('window');
const screen = Dimensions.get('screen');

export default class App extends React.Component {
  state = {
    dimensions: {
      window,
      screen,
    },
  };

  dimensionsSubscription: any;

  onChange = ({window, screen}: {window: any; screen: any}) => {
    this.setState({dimensions: {window, screen}});
  };

  componentDidMount() {
    this.dimensionsSubscription = Dimensions.addEventListener(
      'change',
      this.onChange,
    );
  }

  componentWillUnmount() {
    this.dimensionsSubscription?.remove();
  }

  render() {
    gerarDadosAleatorios();

    const {dimensions} = this.state;

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View>
          <VictoryChart
            width={dimensions.screen.width}
            theme={VictoryTheme.material}
            scale="linear">
            <VictoryBar
              barRatio={0.6}
              data={data}
              x="idade"
              y="mortalidade"
              labels={({datum}) => datum.mortalidade}
              style={{
                data: {fill: '#b9d3f8'},
              }}
            />
          </VictoryChart>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
});
