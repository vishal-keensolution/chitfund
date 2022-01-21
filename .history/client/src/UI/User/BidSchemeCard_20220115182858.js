import React, { Component } from "react";
import { Text, View } from "react-native";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from "react-native-simple-radio-button";

const temp_data = {
  room1: 0.1,
  room2: 0.2,
  room3: 0.3,
  room4: 0.4
};

var radio_props = [{ label: "10%", value: 0 }, { label: "30%", value: 1 }];

    return (
      <View>
        {Object.keys(temp_data).map(num => (
          <RadioForm
            radio_props={radio_props}
            initial={0}
            onPress={value => {
              this.setState({ value: value });
            }}
          />
        ))}
      </View>
    );
