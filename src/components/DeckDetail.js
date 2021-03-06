import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import Deck from "./Deck";
import { styles, baseColorLight } from "../utils/styles";

export function DeckDetail(props) {
  DeckDetail.navigationOptions = ({ navigation }) => {
    const { deckName } = navigation.state.params;
    return {
      title: `${deckName} deck`,
    };
  };

  const { deckName, noCards } = props;
  return (
    <View style={styles.container}>
      <View style={[styles.button1, styles.shadow, styles.deckContainer]}>
        <Deck deckName={deckName} noCards={noCards} />
      </View>

      <TouchableOpacity
        onPress={() => props.navigation.navigate("AddCard", { deckName })}
        style={[styles.button1, styles.shadow, { marginTop: 100 }]}
      >
        <Text>Add Card</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => props.navigation.navigate("Quiz", { deckName })}
        style={[styles.button1, styles.button2, styles.shadow]}
      >
        <Text style={{ color: baseColorLight }}>Start Quiz</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => props.navigation.navigate("DeleteDeck", { deckName })}
        style={[styles.button1, styles.shadow]}
      >
        <Text style={styles.flaggedText}>Delete Deck</Text>
      </TouchableOpacity>
    </View>
  );
}

function mapStateToProps({ data }, { navigation }) {
  const { deckName } = navigation.state.params;
  return {
    deckName,
    noCards: data[deckName] ? data[deckName].questions.length : null,
  };
}

export default connect(mapStateToProps)(DeckDetail);
