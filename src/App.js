import React, { Component } from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import middleware from "./middleware";

import { View, StatusBar, Platform } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import Constants from "expo-constants";
import {
  MaterialIcons,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import {
  baseColorDark,
  baseColorLight,
  bodyColor1,
  redFlagColor,
  bodyColor2,
  bodyColor3,
} from "./utils/styles";
import DeckList from "./components/DeckList";
import AddDeck from "./components/AddDeck";
import DeckDetail from "./components/DeckDetail";
import AddCard from "./components/AddCard";
import DeleteDeck from "./components/DeleteDeck";
import Quiz from "./components/Quiz";
import DeckResults from "./components/QuizResults";
import { setLocalNotification } from "./utils/notification";

function CustomStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

const BottomTabs = createBottomTabNavigator(
  {
    DeckList: {
      screen: DeckList,
      navigationOptions: {
        tabBarLabel: "Decks",
        tabBarIcon: ({ tintColor }) =>
          Platform.OS === "ios" ? (
            <Ionicons name="add-circle" size={24} color={tintColor} />
          ) : (
            <MaterialCommunityIcons name="card" size={24} color={tintColor} />
          ),
      },
    },
    AddDeck: {
      screen: AddDeck,
      navigationOptions: {
        tabBarLabel: "Add Deck",
        tabBarIcon: ({ tintColor }) =>
          Platform.OS === "ios" ? (
            <Ionicons name="add" size={24} color={tintColor} />
          ) : (
            <MaterialIcons name="post-add" size={24} color={tintColor} />
          ),
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: Platform.OS === "ios" ? baseColorLight : baseColorDark,
      style: {
        height: 56,
        backgroundColor: Platform.OS === "ios" ? baseColorDark : baseColorLight,
        shadowColor: "rgba(0, 0, 0, 0.24)",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowRadius: 6,
        shadowOpacity: 1,
      },
    },
  }
);

const AppStack = createStackNavigator({
  Decks: {
    screen: BottomTabs,
  },
  DeckDetail: {
    screen: DeckDetail,
    navigationOptions: {
      headerTintColor: baseColorLight,
      headerStyle: {
        backgroundColor: baseColorDark,
      },
      title: "Deck Detail",
    },
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      headerTintColor: bodyColor1,
      headerStyle: {
        backgroundColor: baseColorLight,
      },
      title: "Add new card",
    },
  },
  DeleteDeck: {
    screen: DeleteDeck,
    navigationOptions: {
      headerTintColor: redFlagColor,
      headerStyle: {
        backgroundColor: baseColorLight,
      },
      title: "Delete deck",
    },
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      headerTintColor: bodyColor2,
      headerStyle: {
        backgroundColor: baseColorLight,
      },
      title: "Quiz time!",
    },
  },
});

const ResultStack = createStackNavigator({
  DeckResults: {
    screen: DeckResults,
    navigationOptions: {
      headerTintColor: bodyColor3,
      headerStyle: {
        backgroundColor: baseColorLight,
      },
      title: "Results",
    },
  },
});

const NavContainer = createAppContainer(
  createSwitchNavigator(
    {
      App: AppStack,
      Results: ResultStack,
    },
    { initialRouteName: "App" }
  )
);

export default class App extends Component {
  componentDidMount() {
    setLocalNotification;
  }
  render() {
    return (
      <Provider store={createStore(reducer, middleware)}>
        <View style={{ flex: 1 }}>
          <CustomStatusBar
            backgroundColor={baseColorDark}
            barStyle="light-content"
          />
          <NavContainer />
        </View>
      </Provider>
    );
  }
}
