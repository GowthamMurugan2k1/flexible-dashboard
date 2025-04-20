"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { FileDown, X } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

function SelectedRow() {
  const [isOpen, setopen] = useState<boolean>(false);
  const totalSelectedRow = useSelector(
    (state: RootState) => state.appeal.selectedData
  );
  useEffect(() => {
    if(isOpen ||totalSelectedRow.length === 0)return
    setopen(prev=>!prev)
  }, [totalSelectedRow]);
  return (
    <>
      {isOpen && (
        <div
          className={`flex space-x-3 items-center bg-[#ECF3F9] border border-[#A4C0D8] shadow-2xl w-fit px-2 py-4 rounded-lg animate-popup`}
        >
          <p className="text-[var(--secondary-text)]">
            {totalSelectedRow.length} Appeal Letter selected &nbsp;
          </p>
          <Button
            variant={"outline"}
            className="border border-[var(--btn-CTA)] text-[var(--btn-CTA)] hover:bg-[var(--btn-CTA)]/20 hover:text-[var(--btn-CTA)]"
          >
            <span>
              <FileDown />
            </span>
            Export Grid Details
          </Button>
          <Button
            variant={"outline"}
            className="border border-[var(--btn-CTA)] text-[var(--btn-CTA)] hover:bg-[var(--btn-CTA)]/20 hover:text-[var(--btn-CTA)]"
          >
            Download Letter
          </Button>
          <Button className="bg-[var(--btn-CTA)] hover:bg-[var(--btn-CTA)]/20 hover:text-[var(--btn-CTA)]">
            Change Status
          </Button>
          <X className="cursor-pointer" onClick={()=>setopen(prev=>!prev)}/>
        </div>
      )}
    </>
  );
}

export default SelectedRow;
