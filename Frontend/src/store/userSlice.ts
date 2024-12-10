// src/redux/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  token: string | null;
  userName: string | null;
  userId: string | null;
}

const initialState: UserState = {
  token: null,
  userName: null,
  userId: null,
};

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ token: string; userId: string; userName: string }>) => {
      state.token = action.payload.token;
      state.userName = action.payload.userName;
      state.userId = action.payload.userId;
    },
    clearUser: (state) => {
      state.token = null;
      state.userName = null;
      state.userId = null;
    },
  },
});

export const { setUser, clearUser } = UserSlice.actions;

export default UserSlice.reducer;
