import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "./store";
import axios from "axios";
export interface team {
  // Define the properties of a single team object here
  game: string;
  goalAggregate: number;
  shotsOnTargetAggregate: number;
  // sameTeamAggregate: number;
}

export interface predictionState {
  loading: boolean;
  // data: team[];
  data: team[][];
  error: string | null;
}

const initialState: predictionState = {
  loading: false,
  data: [],
  error: null,
};

export const footballPredictSlice = createSlice({
  name: "footballPredictSlice",
  initialState,
  reducers: {
    searchPredict: (state) => {
      state.loading = true;
      state.error = null;
      state.data = [];
    },
    searchPredictSuccess: (state, action: PayloadAction<team[][]>) => {
      state.loading = false;
      state.error = null;
      state.data = action.payload;
    },
    searchPredictFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.data = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { searchPredict, searchPredictFailure, searchPredictSuccess } =
  footballPredictSlice.actions;

export const predictData = (team: number) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    //initail fetch request
    dispatch(searchPredict());
    try {
      //get user info
      const { userInfo } = getState().login;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };
      const { data } = await axios.get(
        `https://darwich.onrender.com/api/soccor/predict/${team}`,
        config
      );

      dispatch(searchPredictSuccess(data));
    } catch (error: any) {
      if (error && error.response) {
        dispatch(searchPredictFailure(error.response.data.message));
      } else {
        dispatch(searchPredictFailure("An error occurred."));
      }
    }
  };
};
export default footballPredictSlice.reducer;
