import { configureStore } from '@reduxjs/toolkit'
import AppealReducer from '@/Slicers/appeal-slicer'
import CalendarReducer from '@/Slicers/calendar-slicer';

export const store = () => {
  return configureStore({
    reducer: {
      appeal:AppealReducer,
      calendar:CalendarReducer
    }
  })
}


export type AppStore = ReturnType<typeof store>

export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']