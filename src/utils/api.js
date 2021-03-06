import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";

// extra id variable based on uuidv4
export const id = "48e1bd91-3208-4cb9-b5e1-01afb1cfbf5b";

export const database = {
  React: {
    title: "React",
    questions: [
      {
        id: uuidv4(),
        question: "What is React?",
        answer:
          "React is a declarative, efficient, and flexible JavaScript library for building user interfaces",
      },
      {
        id: uuidv4(),
        question: "Why Immutability Is Important?",
        answer: "There are generally two approaches to changing data.",
      },
      {
        id: uuidv4(),
        question: "How does React Work?",
        answer: "React creates a VIRTUAL DOM in memory.",
      },
    ],
  },
  ReactES6: {
    title: "React ES6",
    questions: [
      {
        id: uuidv4(),
        question: "What is ES6?",
        answer: "ES6 stands for ECMAScript 6.",
      },
      {
        id: uuidv4(),
        question: "Why Should I Learn ES6?",
        answer:
          "React uses ES6, and you should be familiar with some of the new features.",
      },
    ],
  },
  JavaScript: {
    title: "JavaScript",
    questions: [
      {
        id: uuidv4(),
        question: "Why Study JavaScript?",
        answer:
          "JavaScript is one of the 3 languages all web developers must learn.",
      },
    ],
  },
};

export function checkID(id) {
  return AsyncStorage.getItem(id);
}

export function _getAllItems() {
  return database;
}
