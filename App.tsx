/* eslint-disable @typescript-eslint/no-shadow */
import React from 'react';
import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import {
  VictoryArea,
  VictoryBar,
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryZoomContainer,
} from 'victory-native';

const getRandom = (min: any, max: any) => {
  return Math.floor(Math.random() * (max + 1 - min) + min);
};

const gerarDadosAleatorios = () => {
  const data: any[] = [];
  for (let i = 1; i <= 39; i++) {
    let obj = {mortalidade: getRandom(i, 130), idade: i};
    data.push(obj);
  }
  return data;
};

const window = Dimensions.get('window');
const screen = Dimensions.get('screen');

export default class App extends React.Component {
  state = {
    data: [],
    dimensions: {
      window,
      screen,
    },
  };

  dimensionsSubscription: any;

  onChange = async ({window, screen}: {window: any; screen: any}) => {
    await this.setStateAsync({dimensions: {window, screen}});
  };

  componentDidMount() {
    const data: any[] = gerarDadosAleatorios();
    this.setStateAsync({data});

    this.dimensionsSubscription = Dimensions.addEventListener(
      'change',
      this.onChange,
    );
  }

  componentWillUnmount() {
    this.dimensionsSubscription?.remove();
  }

  setStateAsync = async (state: any) => {
    return new Promise(resolve => {
      this.setState(state, () => resolve(true));
    });
  };

  render() {
    const {dimensions, data} = this.state;

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View>
          <VictoryChart
            width={dimensions.screen.width}
            theme={VictoryTheme.material}
            containerComponent={<VictoryZoomContainer />}>
            <VictoryBar
              sortKey="y"
              sortOrder="ascending"
              barRatio={0.9}
              data={data}
              x="idade"
              y="mortalidade"
              labels={({datum}) => datum.mortalidade}
              style={{
                data: {
                  fill: '#b9d3f8',
                },
              }}
            />
            <VictoryLine
              data={data}
              x="idade"
              y="mortalidade"
              labels={({datum}) => datum.mortalidade}
            />
          </VictoryChart>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
});
