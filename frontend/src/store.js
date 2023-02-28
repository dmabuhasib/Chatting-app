import { configureStore } from '@reduxjs/toolkit'
import userSlice from './pages/slices/UserSlice'
import activeUserSlice from './pages/slices/ActiveChatSlice'

export default configureStore({
  reducer: {
    userdata:userSlice,
    activeUser:activeUserSlice
  },
})