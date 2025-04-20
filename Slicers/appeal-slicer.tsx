import { TableRowDataBase } from "@/types/custom";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import data from '@/dummyData.json';

type initialStateType= {
  allData:TableRowDataBase[],
  selectedData:TableRowDataBase[] 
}

const initialState: initialStateType= {
  allData:data,
  selectedData:[]
}

const appealSlicer = createSlice({
  initialState,
  name: "appeal",
  reducers: {
    selectedAppeals: (state, action: PayloadAction<TableRowDataBase[]>) => {
       state.selectedData =  action.payload
    },
  },
});

export const { selectedAppeals } = appealSlicer.actions;

export default appealSlicer.reducer;
