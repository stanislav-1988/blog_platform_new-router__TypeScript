import App from "./component/App";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import toolkitSlice from "./state/reducer";
import { Provider } from "react-redux";

import ReactDOM from "react-dom/client";

const rootReducer = combineReducers({
  toolkit: toolkitSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
  );
root.render(
  <Provider store={store} >
    <App />
  </Provider>
);


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;