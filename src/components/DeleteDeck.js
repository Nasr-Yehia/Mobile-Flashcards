import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { handleDeleteDeck } from "../actions";
import {
  styles,
  redFlagColor,
  baseColorLight,
  bodyColor2,
} from "../utils/styles";

export function DeleteDeck(props) {
  const { deckName, questionCount } = props;

  const dispatchDelete = () => {
    props.dispatch(
      handleDeleteDeck({ id: props.id, deckName: props.deckName })
    );
    props.navigation.navigate("Decks");
  };

  return (
    <View style={[styles.container]}>
      <Text style={[styles.flaggedText, styles.keyText, { marginTop: 10 }]}>
        Are you sure you want to delete the {deckName} deck?
      </Text>
      <Text style={{ textAlign: "center" }}>
        This deck contains {questionCount} question card
        {questionCount > 1 ? "s" : ""}.
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={[
            styles.button1,
            styles.shadow,
            {
              backgroundColor: bodyColor2,
              borderColor: bodyColor2,
              width: 150,
            },
          ]}
        >
          <Text style={{ color: baseColorLight }}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => dispatchDelete()}
          style={[
            styles.button1,
            styles.shadow,
            {
              backgroundColor: redFlagColor,
              borderColor: redFlagColor,
              width: 150,
            },
          ]}
        >
          <Text style={{ color: baseColorLight }}>Delete Deck</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function mapStateToProps({ id, data }, { navigation }) {
  const { deckName } = navigation.state.params;
  return {
    id,
    deckName,
    questionCount: data[deckName] ? data[deckName].questions.length : null,
  };
}

export default connect(mapStateToProps)(DeleteDeck);
