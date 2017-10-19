import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { LinearGradient } from 'expo';
import allGradients from './gradients.json';
import sampleSize from 'lodash/sampleSize';
import color from 'tinycolor2'

export default class App extends React.Component {
  state = {
    gradients: sampleSize(allGradients, 10),
  };

  changeGradients = () => {
    this.setState({
      gradients: sampleSize(allGradients, 10),
    });
  }
  // TODO Build a generic function to change the color with tinycolor2
  render() {
    const { gradients } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={[styles.text, styles.h1, styles.white]}> Web Gradients </Text>
          <Text style={[styles.text, styles.white]}> Linear gradients from webgradients.com </Text>
        </View>
        <FlatList
          data={gradients}
          onRefresh={this.changeGradients}
          refreshing={false}
          keyExtractor={(item, index) => index}
          ItemSeparatorComponent={() =>
            <View style={styles.separator}/>
          }
          renderItem={({ item }) =>
            <LinearGradient
              colors={item.colors}
              style={styles.gradientWrapper}
              start={[0, 0.5]}
              end={[1, 0.5]}
            >
              <Text
                style={[
                  styles.text,
                  styles.gradientName,
                  color(item.colors[0]).isDark() ? styles.white : {}]}
              >
                {item.name}
              </Text>
              <View style={styles.colorStringContents}>
                <Text
                  style={[
                    styles.text,
                    color(item.colors[0]).isDark() ? styles.white : {}
                  ]}
                >
                  {item.colors[0]}
                </Text>
                <Text
                  style={[
                    styles.text,
                    { marginLeft: 10 },
                    color(item.colors[0]).isDark() ? styles.white : {}
                  ]}
                >
                  {item.colors[1]}
                </Text>
              </View>
            </LinearGradient>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#273142',
    justifyContent: 'center',
    paddingHorizontal: 15
  },
  text: {
    backgroundColor: 'transparent',
  },
  header: {
    paddingVertical: 30,
    alignItems: 'center',
  },
  h1: {
    fontSize: 30,
  },
  white: {
    color: '#fff',
  },
  gradientWrapper: {
    height: 70,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 15,
    flexDirection: 'row'
  },
  gradientName: {
    fontWeight: 'bold'
  },
  separator: {
    height: 10,
  },
  colorStringContents: {
    flexDirection: 'row'
  },
});


