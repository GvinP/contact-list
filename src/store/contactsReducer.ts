import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api, ContactType, ResponseType } from "../api/api";
import { AppDispatch, RootState } from "./store";

export const getAllContacts = createAsyncThunk<
  ResponseType<ContactType[]> | undefined,
  number
>("contacts/getAllContacts", async (page, thunkApi) => {
  try {
    thunkApi.dispatch(startLoadingContacts());
    const res = await api.getContacts(page);
    thunkApi.dispatch(endLoadingContacts());
    return res;
  } catch (error) {
    console.log(error);
  }
});

export const getCurrentContact = createAsyncThunk<
  ContactType | undefined,
  string
>("contacts/getCurrentContact", async (id) => {
  try {
    const res = await api.getContact(id);
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
});

export const addContact = createAsyncThunk<
  ContactType | undefined,
  ContactType,
  { dispatch: AppDispatch; state: RootState }
>("contacts/addContact", async (contact, thunkApi) => {
  try {
    const res = await api.addContact(contact);
    const currentPage = thunkApi.getState().contacts.currentPage;
    thunkApi.dispatch(getAllContacts(currentPage));
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

export const deleteContact = createAsyncThunk<
  string | undefined,
  string,
  { dispatch: AppDispatch; state: RootState }
>("contacts/deleteContact", async (id, thunkApi) => {
  try {
    await api.deleteContact(id);
    const currentPage = thunkApi.getState().contacts.currentPage;
    thunkApi.dispatch(getAllContacts(currentPage));
    return id;
  } catch (error) {
    console.log(error);
  }
});

export const updateContact = createAsyncThunk<
  ContactType | undefined,
  { id: string; contact: ContactType },
  { dispatch: AppDispatch; state: RootState }
>("contacts/updateContact", async ({ id, contact }, thunkApi) => {
  try {
    const res = await api.updateContact(id, contact);
    const currentPage = thunkApi.getState().contacts.currentPage;
    thunkApi.dispatch(getAllContacts(currentPage));
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

export const searchContacts = createAsyncThunk<
  ContactType[] | undefined,
  string
>("contacts/searchContacts", async (search) => {
  try {
    const res = await api.searchContacts(search);
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

export const clearCurrentContact = createAction("contacts/clearCurrentContact");
export const startLoadingContacts = createAction(
  "contacts/startLoadingContacts"
);
export const endLoadingContacts = createAction("contacts/endLoadingContacts");

const contactsSlice = createSlice({
  name: "contactsReducer",
  initialState: {
    allContacts: [] as ContactType[],
    currentContact: {} as ContactType,
    currentPage: 1,
    totalPagesCount: 1,
    isLoading: true,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllContacts.fulfilled, (state, action) => {
        state.allContacts = action.payload?.data ? action.payload?.data : [];
        state.currentPage = action.payload?.currentPage
          ? action.payload?.currentPage
          : 1;
        state.totalPagesCount = action.payload?.totalPagesCount
          ? action.payload?.totalPagesCount
          : 1;
      })
      .addCase(getCurrentContact.fulfilled, (state, action) => {
        state.currentContact = action.payload
          ? action.payload
          : ({} as ContactType);
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.allContacts.push(
          action.payload ? action.payload : ({} as ContactType)
        );
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.allContacts = state.allContacts.filter(
          (contact) => contact._id !== action.payload
        );
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        state.allContacts = state.allContacts.map((contact) =>
          contact._id === action.payload ? action.payload! : contact
        );
      })
      .addCase(searchContacts.fulfilled, (state, action) => {
        state.allContacts = action.payload ? action.payload : [];
      })
      .addCase(startLoadingContacts, (state) => {
        state.isLoading = true;
      })
      .addCase(endLoadingContacts, (state) => {
        state.isLoading = false;
      });
  },
});

export const contacts = contactsSlice.reducer;
