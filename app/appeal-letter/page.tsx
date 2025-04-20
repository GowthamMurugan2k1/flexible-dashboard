"use client";
import ActiveNavTab from "@/components/ActiveNavTab";
import SelectedRow from "@/components/custom/SelectedRow";
import { TableView } from "@/components/table/table";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

function appealLetter() {
  const tableDataList = useSelector((state: RootState) => state.appeal.allData);

  return (
    <div className="">
      <ActiveNavTab />

      <TableView tableData={tableDataList} />
      <div className="flex justify-center">
        <SelectedRow />
      </div>
    </div>
  );
}
export default appealLetter;
