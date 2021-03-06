import { _getAllItems } from "../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const SET_INITIAL_DATA = "SET_INITIAL_DATA";
export const SET_ID = "SET_ID";
export const SETUP_RESULTS = "SETUP_RESULTS";
export const ADD_DECK = "ADD_DECK";
export const DELETE_DECK = "DELETE_DECK";
export const ADD_CARD = "ADD_CARD";
export const ADD_CORRECT = "ADD_CORRECT";

export function setInitialData(id, data) {
  return {
    type: SET_INITIAL_DATA,
    id,
    data,
  };
}

/* The function of getting back the initial data that the application needs.
this function is going to use the redux pattern. */
export function handleInitialData(id) {
  const data = _getAllItems();
  return (dispatch) => {
    return AsyncStorage.setItem(id, JSON.stringify(data)).then(() =>
      dispatch(setInitialData(id, data))
    );
  };
}

export function setResults(deckName) {
  return {
    type: SETUP_RESULTS,
    deckName,
  };
}

// Creator of a action to add deck
function addDeck(deckName) {
  return {
    type: ADD_DECK,
    deckName,
  };
}

export function handleAddDeck(id, deckName) {
  const deck = {
    [deckName]: {
      title: deckName,
      questions: [],
    },
  };
  return (dispatch) => {
    return AsyncStorage.mergeItem(id, JSON.stringify(deck)).then(
      dispatch(addDeck(deckName))
    );
  };
}

// Creator of a action to add card
function addCard({ deckName, cardQuestion, cardAnswer }) {
  return {
    type: ADD_CARD,
    deckName,
    cardQuestion,
    cardAnswer,
  };
}

export function handleAddCard({ id, deckName, cardQuestion, cardAnswer }) {
  return (dispatch) => {
    dispatch(addCard({ deckName, cardQuestion, cardAnswer }));
    return AsyncStorage.getItem(id)
      .then((result) => {
        const item = JSON.parse(result)[deckName];
        item.questions.push({
          question: cardQuestion,
          answer: cardAnswer,
        });
        const itemToAdd = {
          [deckName]: item,
        };
        return itemToAdd;
      })
      .then((itemToAdd) => {
        AsyncStorage.mergeItem(id, JSON.stringify(itemToAdd));
      });
  };
}

// Creator of a action to add correct
export function addCorrect({ deckName }) {
  return {
    type: ADD_CORRECT,
    deckName,
  };
}

// Creator of a action to delete correct
function deleteDeck({ deckName }) {
  return {
    type: DELETE_DECK,
    deckName,
  };
}

export function handleDeleteDeck({ id, deckName }) {
  return (dispatch) => {
    dispatch(deleteDeck({ deckName }));
    return AsyncStorage.getItem(id).then((result) => {
      result = JSON.parse(result);
      delete result[deckName];
      AsyncStorage.setItem(id, JSON.stringify(result));
    });
  };
}
