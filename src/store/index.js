import { createStore } from "redux";
import rootReducer from "./reducers/index";

const store = createStore(rootReducer);

let updateDate = () => {
  store.dispatch({ type: "GET_TIME" });
};

setInterval(() => {
  updateDate();
}, 1000);

export default store;
