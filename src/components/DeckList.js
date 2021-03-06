import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Animated,
} from "react-native";
import { connect } from "react-redux";
import { handleInitialData, setInitialData } from "../actions";
import Deck from "./Deck";
import { styles, baseColorDark } from "../utils/styles";
import { id, checkID } from "../utils/api";

export function DeckList(props) {
  const [animateValue] = useState(new Animated.Value(1));
  useEffect(() => {
    checkID(id).then((result) => {
      if (result === null) {
        props.dispatch(handleInitialData(id));
      } else {
        props.dispatch(setInitialData(id, JSON.parse(result)));
      }
    });
  }, []);

  const renderItem = ({ item }) => {
    return (
      <Animated.View
        style={[
          styles.button1,
          styles.shadow,
          styles.deckContainer,
          { transform: [{ scale: animateValue }] },
        ]}
      >
        <TouchableOpacity
          onPress={() => {
            Animated.sequence([
              Animated.timing(animateValue, {
                duration: 200,
                toValue: 0.5,
                useNativeDriver: true,
              }),
              Animated.spring(animateValue, {
                toValue: 1,
                friction: 4,
                useNativeDriver: true,
              }),
            ]).start();
            props.navigation.navigate("DeckDetail", {
              deckName: item.title,
            });
          }}
        >
          <Deck deckName={item.title} noCards={item.length} />
        </TouchableOpacity>
      </Animated.View>
    );
  };
  if (props.loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text style={{ color: baseColorDark, marginTop: 10 }}>
          Loading data...
        </Text>
      </View>
    );
  }
  return (
    <FlatList
      data={props.decks}
      renderItem={renderItem}
      keyExtractor={(item) => item.title}
    />
  );
}
function mapStateToProps({ data }) {
  return {
    loading: data ? false : true,
    decks: data
      ? Object.values(data).map((deck) => ({
          title: deck.title,
          length: deck.questions.length,
        }))
      : null,
  };
}

export default connect(mapStateToProps)(DeckList);
