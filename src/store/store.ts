import { configureStore } from "@reduxjs/toolkit";

import footballPredictReducer from "./footballPredictSlice";
import footballReducer from "./footballSlice";
import loginReducer from "./loginSlice";

//configure the store
export const store = configureStore({
  reducer: {
    footballPredict: footballPredictReducer,
    football: footballReducer,
    login: loginReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
