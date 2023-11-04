"use client";
//For create 
import { useRef, useState } from "react";

//import { ChevronDown } from "lucide-react";

import GrowingTextarea from "@/components/GrowingTextarea";
//import UserAvatar from "@/components/UserAvatar";
import { Separator } from "@/components/ui/separator";
import useTweet from "@/hooks/useTweet";
import useUserInfo from "@/hooks/useUserInfo";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  //DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import type { DateRange } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { SingleInputDateTimeRangeField } from '@mui/x-date-pickers-pro/SingleInputDateTimeRangeField';


export default function TweetInput() {
  const { handle } = useUserInfo();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const timeareaRef = useRef<HTMLTextAreaElement>(null);
  const { postTweet, loading } = useTweet();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [value, setValue] = useState<DateRange<Dayjs>>(() => [
    dayjs('2023-11-04T15:30'),
    dayjs('2023-11-04T18:30'),
  ]);

  const handleTweet = async () => {
    const content = textareaRef.current?.value;
    const eventTime = timeareaRef.current?.value;
    if (!content)
    {
      alert('Please input the name of the event');
      return ;
    }
    if (!eventTime)
    {
      alert('Please input time of the event');
      return;
    }
    console.log(eventTime);
    const start_time = dayjs(eventTime.substring(0, 19));
    const end_time = dayjs(eventTime.substring(22, 41));
    if (start_time.isAfter(end_time)){
      alert('Please input valid time of the event!');
      return false;
    }
    const intervalDay = dayjs(end_time).diff(
      start_time,
      "day"
    );
    console.log(intervalDay);
    if (intervalDay > 7){
      alert('Please input valid time of the event (within 7 days)!');
      return false;
    }
    if (!handle) return;
    /*console.log(eventTime.substring(0, 19));
    console.log(eventTime.substring(22, 41));
    console.log(content);*/
    try {
      await postTweet({
        handle,
        content,
        eventTime,
      });
      textareaRef.current.value = "";
      // this triggers the onInput event on the growing textarea
      // thus triggering the resize
      // for more info, see: https://developer.mozilla.org/en-US/docs/Web/API/Event
      textareaRef.current.dispatchEvent(
        new Event("input", { bubbles: true, composed: true }),
      );
    } catch (e) {
      console.error(e);
      alert("Error posting tweet");
    }
    setDialogOpen(false);
  };
  const handleOpenChange = (open: boolean) => {
    if (open) {
      setDialogOpen(true);
    } else {
      // if handleSave returns false, it means that the input is invalid, so we
      // don't want to close the dialog
      setDialogOpen(false);
    }
  };

  return (
    <div>
      <button
            className={cn(
              "my-2 rounded-full bg-brand px-4 py-2 text-white transition-colors hover:bg-brand/70",
              "disabled:cursor-not-allowed disabled:bg-brand/40 disabled:hover:bg-brand/40",
            )}
            onClick={() => setDialogOpen(true)}
          > 
            New Event
          </button>
      <Dialog open={dialogOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Start an Event!</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
          <div className="flex w-full flex-col px-2">
            <div className="mb-2 mt-6">
              <GrowingTextarea
                ref={textareaRef}
                className="bg-transparent outline-none placeholder:text-gray-500"
                placeholder="Enter the name of the event..."
              />  
            </div>
            
            <div>
              Event Duration
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer
                  components={[
                    'SingleInputDateTimeRangeField',
                  ]}
                >
                  <SingleInputDateTimeRangeField
                    inputRef={timeareaRef}
                    label="Event Duration"
                    value={value}
                    onChange={(newValue) => setValue(newValue)}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>
            
            </div>
            <Separator />
          </div>
          <DialogFooter>
            <Button onClick={handleTweet}
                disabled={loading}>Create!</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
