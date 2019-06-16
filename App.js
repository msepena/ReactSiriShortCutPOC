/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Button, Alert } from 'react-native';
import {
  SiriShortcutsEvent,
  donateShortcut,
  presentShortcut,
  suggestShortcuts,
  clearAllShortcuts,
  clearShortcutsWithIdentifiers
} from "react-native-siri-shortcut";
import AddToSiriButton, {
  SiriButtonStyles
} from "react-native-siri-shortcut/AddToSiriButton";

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


const opts = {
  activityType: "com.mycompany.SiriShortcutPOC.welcome", // This activity type needs to be set in `NSUserActivityTypes` on the Info.plist
  title: "Say Hi",
  userInfo: {
    foo: 1,
    bar: "baz",
    baz: 34.5
  },
  keywords: ["kek", "foo", "bar"],
  persistentIdentifier: "yourPersistentIdentifier",
  isEligibleForSearch: true,
  isEligibleForPrediction: true,
  suggestedInvocationPhrase: "Say something",
  needsSave: true
};

export default class App extends Component {


  componentDidMount() {
    SiriShortcutsEvent.addListener(
      "SiriShortcutListener",
      ({ userInfo, activityType }) => {
        // Do something with the userInfo and/or activityType
        Alert.alert(
          'Open App by Siri',
          `${JSON.stringify(userInfo)}`,
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          {cancelable: false},
        );
      }
    );

    suggestShortcuts([opts]);
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <Button
          title="Donate Shortcut"
          onPress={() => donateShortcut(opts)}
        />
        <Button
          title="Clear Shortcuts With Identifiers"
          onPress={async () => {
            try {
              await clearShortcutsWithIdentifiers([
                "some.identifier",
                "another.identifier"
              ]);
              // Shortcuts cleared
            } catch (e) {
              // Can't clear shortcuts on <iOS 12 because they don't exist
            }
          }}
        />
        <Button
          title="Clear All Shortcuts"
          onPress={async () => {
            try {
              await clearAllShortcuts();
              // Shortcuts were successfully cleared
            } catch (e) {
              // Can't clear shortcuts on <iOS 12 because they don't exist
            }
          }}
        /> */}
        <AddToSiriButton
          style={{ flex: 1 }}
          buttonStyle={SiriButtonStyles.whiteOutline}
          onPress={() => {
            presentShortcut(opts, (data) => {
              console.log("You clicked me", data);
            });
            
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
