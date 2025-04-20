'use client'
import { humanizePath } from "@/utils/url-formatter"
import { usePathname } from "next/navigation"

function ActiveNavTab() {
  const path = usePathname()
  const tabName = humanizePath(path)
  return (
    <div className=" border-b-4 border-[#3FC3AC] pb-2 px-2 w-fit font-semibold" >{tabName} <span className="bg-[#F28372] p-1 text-white rounded-full ">05</span></div>
  )
}



export default ActiveNavTab


