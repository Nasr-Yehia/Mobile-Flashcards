import React, { useState } from "react";
import {
  Text,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import { styles, baseColorLight } from "../utils/styles";
import { handleAddCard } from "../actions";

// Add Card Class
export function AddCard(props) {
  const [cardQuestion, setcardQuestion] = useState("");
  const [cardAnswer, setcardAnswer] = useState("");

  // function to add card
  const addCard = () => {
    props.dispatch(
      handleAddCard({
        id: props.id,
        deckName: props.deckName,
        cardQuestion: cardQuestion,
        cardAnswer: cardAnswer,
      })
    );
    props.navigation.goBack();
  };
  return (
    <KeyboardAvoidingView>
      <Text style={[styles.keyText]}>
        Add new card to {props.deckName} deck
      </Text>
      {/* Field to add a new question */}
      <TextInput
        style={[styles.button1, styles.textInput]}
        placeholder="New question here"
        onChangeText={(text) => setcardQuestion(text)}
      />
      {/* Field to add a Answer question */}
      <TextInput
        style={[styles.button1, styles.textInput]}
        placeholder="Answer to new question here"
        onChangeText={(text) => setcardAnswer(text)}
      />
      <TouchableOpacity
        style={[styles.button1, styles.button2]}
        onPress={addCard}
        disabled={!cardQuestion || !cardAnswer}
      >
        <Text style={{ color: baseColorLight }}>Add new card</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

function mapStateToProps({ id }, { navigation }) {
  return {
    id,
    deckName: navigation.state.params.deckName,
  };
}

export default connect(mapStateToProps)(AddCard);
