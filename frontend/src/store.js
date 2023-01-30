import { configureStore } from '@reduxjs/toolkit'
import userSlice from './pages/slices/UserSlice'

export default configureStore({
  reducer: {
    userdata:userSlice
  },
})