"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { addEvent, addReminder } from "@/Slicers/calendar-slicer";
import { RootState } from "@/store/store";
import { BellPlus, CalendarPlus } from "lucide-react";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export function EventCreationTabs({
  setpopup,
}: {
  setpopup: Dispatch<SetStateAction<boolean>>;
}) {
  const currentDate = useSelector(
    (state: RootState) => state.calendar.currSelectedDate
  );
  const dispatch = useDispatch();
  const [inputValue, setInputvalue] = useState("");

  const handleCreate = useCallback(
    (type: "Reminder" | "Event") => {
      const { start, end } = currentDate;
      if (!start || !end) throw Error("Start and End date is missing");

      switch (type) {
        case "Reminder":
          dispatch(addReminder({ start, end, title: inputValue, type }));
          setpopup(false);
          setInputvalue("");
          break;
        case "Event":
          dispatch(addEvent({ start, end, title: inputValue, type }));
          setpopup(false);
          setInputvalue("");
          break;

        default:
          break;
      }
    },
    [inputValue]
  );
  

  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="event">
          <span>
            <CalendarPlus />
          </span>
          Event
        </TabsTrigger>
        <TabsTrigger value="reminder">
          <span>
            <BellPlus />
          </span>
          Reminder
        </TabsTrigger>
      </TabsList>
      <TabsContent value="event">
        <Card>
          <CardHeader>
            <CardTitle>Event</CardTitle>
            <CardDescription>Create an Event</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Title</Label>
              <Input
                id="name"
                type="text"
                onChange={(e) => setInputvalue(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={() => handleCreate("Event")}>Create</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="reminder">
        <Card>
          <CardHeader>
            <CardTitle>Reminder</CardTitle>
            <CardDescription>Create an Reminder</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Title</Label>
              <Input
                id="current"
                type="text"
                onChange={(e) => setInputvalue(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={() => handleCreate("Reminder")}>Create</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
