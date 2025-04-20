import { CalendarType, calenderDate } from "@/types/custom";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import moment from "moment";

type CalendarInitalState = {
  initalData: CalendarType[];
  currSelectedDate: calenderDate;
};

const initialState: CalendarInitalState = {
  initalData: [
    {
      start: moment().toISOString(),
      end: moment().add(1, "days").toISOString(),
      title: "Interview",
      type: "Event",
    },
    {
      start: moment().toISOString(),
      end: moment().add(1, "days").toISOString(),
      title: "Movie time",
      type: "Reminder",
    },
  ],
  currSelectedDate: {
    start: undefined,
    end: undefined,
  },
};
const calendarSlicer = createSlice({
  initialState,
  name: "Calendar-slicer",
  reducers: {
    addEvent: (state, action: PayloadAction<CalendarType>) => {
      if (!action.payload.start || !action.payload.end) {
        return;
      } 
      state.initalData.push(action.payload);
    },
    addReminder: (state, action: PayloadAction<CalendarType>) => {
      if (!action.payload.start || !action.payload.end) {
        return;
      }
      state.initalData.push(action.payload);
    },
    setCurrentDate: (state, action: PayloadAction<calenderDate>) => {
      state.currSelectedDate = {
        start: action.payload.start
          ? new Date(action.payload.start).toISOString()
          : undefined,
        end: action.payload.end
          ? new Date(action.payload.end).toISOString()
          : undefined,
      };
    },
    resetCurrentDate: (state) => {
      state.currSelectedDate = {
        start: undefined,
        end: undefined,
      };
    },
  },
});

export const { addEvent, addReminder, setCurrentDate ,resetCurrentDate} = calendarSlicer.actions;
export default calendarSlicer.reducer;
