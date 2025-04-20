import ActiveNavTab from "@/components/ActiveNavTab";
import AppealLetter from "@/components/appealLetter";
import SelectedRow from "@/components/custom/SelectedRow";

function appealLetter() {
  

  return (
    <>
      <ActiveNavTab />
      <AppealLetter />
      <div className="flex justify-center">
        <SelectedRow />
      </div>
    </>
  );
}
export default appealLetter;
