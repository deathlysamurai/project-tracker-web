import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
    loggedIn: boolean
}

const initialState: AuthState = {
    loggedIn: "token" in localStorage,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn: (state) => {
      state.loggedIn = true
    },
  },
})

export const { logIn } = authSlice.actions

export default authSlice.reducer