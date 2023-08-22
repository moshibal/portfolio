import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "./store";
import axios from "axios";

//for the match inside array
interface Match {
  awayName: string;
  shotsOnTargetHome: number;
  goalHome: number;
  cornorHome: number;
  _id: {
    $oid: string;
  };
}

//for the team
interface Team {
  _id: {
    $oid: string;
  };
  league: string;
  leagueID: number;
  name: string;
  teamID: number;
  matches: Match[];
  __v: number;
}
// for updating match object
interface UpatingMatch {
  awayName: string;
  goalHome: number;
  shotsOnTargetHome: number;
}

//for the initial state
export interface leagueState {
  loading: boolean;
  data: Team[];
  error: string | null;
}

const initialState: leagueState = {
  loading: false,
  data: [],
  error: null,
};

export const footballSlice = createSlice({
  name: "footballSlice",
  initialState,
  reducers: {
    searchLeague: (state) => {
      state.loading = true;
      state.error = null;
      state.data = [];
    },
    searchLeagueSuccess: (state, action: PayloadAction<Team[]>) => {
      state.loading = false;
      state.error = null;
      state.data = action.payload;
    },
    searchLeagueFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.data = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { searchLeague, searchLeagueSuccess, searchLeagueFailure } =
  footballSlice.actions;

export const fetchFootballData = (
  leagueID: number,
  getState: () => RootState
) => {
  return async (dispatch: AppDispatch) => {
    //initail fetch request
    dispatch(searchLeague());
    try {
      //get user info as it is protected
      const { userInfo } = getState().login;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };
      //fetch predict
      const {
        data: { data },
      } = await axios.get(
        `https://darwich.onrender.com/api/soccor?leagueID=${leagueID}`,
        config
      );

      dispatch(searchLeagueSuccess(data));
    } catch (error: any) {
      if (error && error.response) {
        dispatch(searchLeagueFailure(error.response.data.message));
      } else {
        dispatch(searchLeagueFailure("An error occurred."));
      }
    }
  };
};
export const updateFootballData = (
  teamID: number,
  leagueID: number,
  updatingMatchObject: UpatingMatch
) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      //get user info as it is protected
      const { userInfo } = getState().login;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };
      const {
        data: { message },
      } = await axios.patch(
        `https://darwich.onrender.com/api/soccor/update/${teamID}`,
        updatingMatchObject,
        config
      );
      if (message === "success") dispatch(fetchFootballData(leagueID));
    } catch (error: any) {
      if (error && error.response) {
        dispatch(searchLeagueFailure(error.response.data.message));
      } else {
        dispatch(
          searchLeagueFailure(`An error updating the match with ${teamID}`)
        );
      }
    }
  };
};
export default footballSlice.reducer;
