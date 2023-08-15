import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "./store";
import axios from "axios";
export interface team {
  // Define the properties of a single team object here
  game: string;
  goalAggregate: number;
  shotsOnTargetAggregate: number;
  sameTeamAggregate: number;
}

export interface predictionState {
  loading: boolean;
  data: team[];
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
    searchPredictSuccess: (state, action: PayloadAction<team[]>) => {
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
  console.log(team);
  return async (dispatch: AppDispatch) => {
    //initail fetch request
    dispatch(searchPredict());
    try {
      //fetch predict
      const { data } = await axios.get(
        `https://darwich.onrender.com/api/epl/predict/${team}`
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
