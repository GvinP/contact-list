import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { NavigateFunction } from "react-router-dom";
import { authApi, AuthDataType, AuthType } from "../api/api";
import { FormDataType } from "../components/Login/Login";

export const registration = createAsyncThunk<
  AuthDataType | undefined,
  { formData: FormDataType; navigate: NavigateFunction }
>("auth/registration", async ({ formData, navigate }) => {
  try {
    const res = await authApi.registration(formData);
    console.log(res);
    localStorage.setItem("user", JSON.stringify(res.data));
    navigate("/contacts");
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

export const login = createAsyncThunk<
  AuthDataType | undefined,
  { formData: FormDataType; navigate: NavigateFunction }
>("auth/login", async ({ formData, navigate }) => {
  try {
    const res = await authApi.login(formData);
    localStorage.setItem("user", JSON.stringify(res.data));
    navigate("/contacts");
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

export const logoutAction = createAction("auth/logout");

const authSlice = createSlice({
  name: "autnReducer",
  initialState: {
    authData: {} as AuthType,
    token: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registration.fulfilled, (state, action) => {
        state.authData = action.payload?.result
          ? action.payload?.result
          : ({} as AuthType);
        state.token = action.payload?.token ? action.payload?.token : "";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.authData = action.payload?.result
          ? action.payload?.result
          : ({} as AuthType);
        state.token = action.payload?.token ? action.payload?.token : "";
      })
      .addCase(logoutAction, (state) => {
        state.authData = {} as AuthType;
        state.token = "";
      });
  },
});

export const auth = authSlice.reducer;
