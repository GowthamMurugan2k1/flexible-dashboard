"use client";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { EventCreationTabs } from "../tabs";
import { setCurrentDate } from "@/Slicers/calendar-slicer";

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  // Getting Calender events from useSelector
  const events = useSelector((state: RootState) =>
    state.calendar.initalData.map((item) => ({
      ...item,
      start: new Date(item.start),
      end: new Date(item.end),
    }))
  );

  const dispatch = useDispatch();
  const [isPopup, setpopup] = useState(false);

  // Styling according to events
  const eventPropGetter = useCallback(
    (event: { type: string }) => ({
      ...(event.type === "Event" && {
        style: {
          backgroundColor: "var(--tertiary-color)",
        },
      }),
      ...(event.type === "Reminder" && {
        style: {
          backgroundColor: "var(--btn-CTA)",
        },
      }),
    }),
    []
  );

  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    dispatch(
      setCurrentDate({
        start: start.toISOString(),
        end: end.toISOString(),
      })
    );
    setpopup((prev) => !prev);
    // const title = window.prompt("New Event name");
    // if (title) {
    //   setEvents((prev) => [...prev, { start, end, title }]);
    // }
  };
  
  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        defaultView="month"
        onSelectSlot={handleSelectSlot}
        selectable
        eventPropGetter={eventPropGetter}
        dayLayoutAlgorithm={"no-overlap"}
      />
      <Dialog onOpenChange={setpopup} open={isPopup}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a Event/Reminder</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center">
            <EventCreationTabs setpopup={setpopup} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyCalendar;
