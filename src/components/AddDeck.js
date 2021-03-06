import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { connect } from "react-redux";
import { handleAddDeck } from "../actions";
import {
  styles,
  baseColorLight,
  baseColorDark,
  redFlagColor,
} from "../utils/styles";

export function AddDeck(props) {
  const [createDeckTitle, setcreateDeckTitle] = useState("");
  const [problem, setproblem] = useState(false);
  const [inputColor, setinputColor] = useState(baseColorDark);

  const createDeck = () => {
    setcreateDeckTitle("");
    props.dispatch(handleAddDeck(props.id, createDeckTitle)).then(
      props.navigation.navigate("DeckDetail", {
        deckName: createDeckTitle,
      })
    );
  };
  if (props.loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={"large"} />
        <Text
          style={{ color: baseColorDark, textAlign: "center", marginTop: 10 }}
        >
          Loading data...
        </Text>
      </View>
    );
  }
  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={[styles.keyText, { fontSize: 40 }]}>
        What is the title of your new deck?
      </Text>
      <TextInput
        style={[styles.button1, styles.textInput, { color: `${inputColor}` }]}
        placeholder="Add deck title here"
        clearTextOnFocus={true}
        onChangeText={(text) => {
          setcreateDeckTitle(text);
          if (props.deckNames.includes(text)) {
            setproblem(true);
            setinputColor(redFlagColor);
          } else {
            setproblem(false);
            setinputColor(baseColorDark);
          }
        }}
      />
      {problem && (
        <Text style={{ textAlign: "center", color: redFlagColor }}>
          Deck with the provided title already exists
        </Text>
      )}
      <TouchableOpacity
        onPress={createDeck}
        disabled={problem || createDeckTitle.length === 0}
        style={[
          styles.button1,
          styles.button2,
          styles.shadow,
          { marginBottom: 150 },
        ]}
      >
        <Text style={{ color: baseColorLight }}>Create Deck</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

function mapStateToProps({ id, data }) {
  const deckNames = data ? Object.keys(data) : null;
  return {
    loading: deckNames ? false : true,
    id,
    deckNames,
  };
}

export default connect(mapStateToProps)(AddDeck);
