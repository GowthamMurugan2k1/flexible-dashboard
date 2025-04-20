"use client";

import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { TableView } from "./table/table";

function AppealLetter() {
  const tableDataList = useSelector((state: RootState) => state.appeal.allData);
  return (
    <div>
      <TableView tableData={tableDataList} />
    </div>
  );
}

export default AppealLetter;
