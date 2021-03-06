import thunk from "redux-thunk";
import { applyMiddleware } from "redux";

const logger = (store) => (next) => (action) => {
  const returnValue = next(action);
  return returnValue;
};

export default applyMiddleware(thunk, logger);
