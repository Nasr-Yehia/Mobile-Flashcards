import React, { Component } from "react";
import { View, Text } from "react-native";
import { styles } from "../utils/styles";

export function Deck(props) {
  return (
    <View>
      <Text style={[styles.keyText, { marginTop: 10 }]}>{props.deckName}</Text>
      <Text style={{ textAlign: "center" }}>
        {`${props.noCards} card`}
        {props.noCards > 1 ? "s" : ""}
      </Text>
    </View>
  );
}

export default Deck;
