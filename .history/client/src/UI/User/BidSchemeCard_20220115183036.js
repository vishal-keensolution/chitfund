import React, { Component } from "react";
import { Text, View } from "react-native";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from "react-native-simple-radio-button";


useEffect(() => {
    axios.get("/api/getSchemeDataforuser", {
        userid: userid
      }).then((response) => {
      if (response.data.data !== "No Data" && response.data.data.length > 0) {
        setData(response.data.data);
      } else {
        setData(false);
      }
    });
  }, []);

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
