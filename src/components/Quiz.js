import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { setResults, addCorrect } from "../actions";
import {
  clearLocalNotification,
  setLocalNotification,
} from "../utils/notification";
import {
  styles,
  bodyColor1,
  bodyColor3,
  baseColorLight,
  redFlagColor,
} from "../utils/styles";

class Quiz extends Component {
  state = {
    QuestionIndex: "",
    activeQuestion: {},
    questionLength: "",
    showAnswer: false,
  };

  componentDidMount() {
    this.setState(() => ({
      QuestionIndex: 0,
      activeQuestion: this.props.questions[0],
      questionLength: this.props.questions.length,
    }));
    if (!this.props.results) {
      this.props.dispatch(setResults(this.props.deckName));
    }
  }

  toggleAnswer = () => {
    this.setState({ showAnswer: this.state.showAnswer ? false : true });
  };

  addCorrect = () => {
    this.props.dispatch(addCorrect({ deckName: this.props.deckName }));
    this.nextQuestion();
  };

  nextQuestion = () => {
    if (this.state.QuestionIndex === this.state.questionLength - 1) {
      this.jumpToResults();
    } else {
      const QuestionIndex = this.state.QuestionIndex + 1;
      this.setState(() => ({
        QuestionIndex,
        activeQuestion: this.props.questions[QuestionIndex],
        showAnswer: false,
      }));
    }
  };

  jumpToResults = () => {
    clearLocalNotification().then(setLocalNotification());
    this.props.navigation.navigate("DeckResults", {
      deckName: this.props.deckName,
    });
  };

  render() {
    return (
      <View>
        <TouchableOpacity
          onPress={this.toggleAnswer}
          disabled={this.state.showAnswer}
          style={[
            styles.button1,
            styles.shadow,
            styles.deckContainer,
            { justifyContent: "flex-start" },
          ]}
        >
          <Text style={[styles.footNote, { marginBottom: 20 }]}>
            Question {this.state.QuestionIndex + 1} of{" "}
            {this.state.questionLength}
          </Text>
          <Text style={[styles.keyText, { marginTop: 10, color: bodyColor1 }]}>
            {this.state.activeQuestion.question}
          </Text>
          {this.state.showAnswer && (
            <Text
              style={[
                styles.keyText,
                { marginTop: 0, marginBottom: 0, color: bodyColor3 },
              ]}
            >
              {this.state.activeQuestion.answer}
            </Text>
          )}
        </TouchableOpacity>
        {this.state.showAnswer === false && (
          <Text style={styles.footNote}>
            Tap on the question card to see the answer
          </Text>
        )}
        {this.state.showAnswer && (
          <View>
            <Text style={[styles.keyText, { marginHorizontal: 5 }]}>
              That was quite the question! Did you get it right?
            </Text>

            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <TouchableOpacity
                onPress={this.addCorrect}
                style={[
                  styles.button1,
                  styles.shadow,
                  {
                    backgroundColor: bodyColor3,
                    borderColor: bodyColor3,
                    width: 150,
                  },
                ]}
              >
                <Text style={{ color: baseColorLight }}>Correct</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={this.nextQuestion}
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
                <Text style={{ color: baseColorLight }}>Missed!</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  }
}

function mapStateToProps({ data }, { navigation }) {
  const { deckName } = navigation.state.params;
  return {
    deckName,
    questions: data[deckName].questions,
    results: data[deckName].results,
  };
}

export default connect(mapStateToProps)(Quiz);
