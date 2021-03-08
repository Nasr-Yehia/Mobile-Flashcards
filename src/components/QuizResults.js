import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import {
  styles,
  bodyColor2,
  bodyColor3,
  baseColorLight,
} from "../utils/styles";

export function QuizResults(props) {
  const { deckName, results, questionCount } = props;
  return (
    <View style={[styles.container, { justifyContent: "space-around" }]}>
      <Text style={[styles.keyText, { marginHorizontal: 50 }]}>
        Congratulations!{"\n"}You have completed the {deckName} Deck Quiz.
      </Text>
      <Text
        style={[
          styles.keyText,
          {
            fontWeight: "bold",
            color: bodyColor2,
            textAlign: "center",
            marginTop: 5,
            marginBottom: 5,
          },
        ]}
      >
        Results:
      </Text>
      <Text
        style={{
          fontWeight: "bold",
          textAlign: "center",
          fontSize: 40,
          color: bodyColor3,
        }}
        s
      >
        {((results / questionCount) * 100).toFixed(0)}%
      </Text>
      <Text style={{ textAlign: "center" }}>
        You got {results} out of {questionCount} questions right.
      </Text>
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("DeckDetail", { deckName })}
          style={[
            styles.button1,
            styles.button2,
            {
              backgroundColor: bodyColor3,
              borderColor: bodyColor3,
              height: 50,
              width: 150,
            },
          ]}
        >
          <Text style={[{ color: baseColorLight, fontWeight: "bold" }]}>
            Restart
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("DeckList", { deckName })}
          style={[
            styles.button1,
            styles.button2,
            {
              backgroundColor: bodyColor2,
              borderColor: bodyColor2,
              width: 150,
            },
          ]}
        >
          <Text style={[{ color: baseColorLight, fontWeight: "bold" }]}>
            Back to Decks
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function mapStateToProps({ data }, { navigation }) {
  const { deckName } = navigation.state.params;
  const { results } = data[deckName];
  const questionCount = data[deckName].questions.length;
  return {
    deckName,
    results,
    questionCount,
  };
}

export default connect(mapStateToProps)(QuizResults);
