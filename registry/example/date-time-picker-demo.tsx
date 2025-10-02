"use client";

import React, { useState } from "react";
import DateTimePicker from "@/registry/ruixenui/date-time-picker";
import { format } from "date-fns";

const DateTimePickerDemo: React.FC = () => {
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);

  return (
    <div className="flex flex-col items-center justify-center p-8 gap-6">
      <DateTimePicker
        defaultDate={new Date()}
        defaultHour="10"
        defaultMinute="30"
        defaultAMPM="AM"
        onChange={setSelectedDateTime}
        minDate={new Date()} // cannot select past dates
      />
      <DateTimePicker
        defaultDate={new Date()}
        defaultHour="10"
        defaultMinute="30"
        defaultAMPM="AM"
        onChange={setSelectedDateTime}
        minDate={new Date()}
      />

      <div className="text-white mt-4">
        <p>
          <span className="font-semibold">Selected Date & Time:</span>{" "}
          {selectedDateTime ? format(selectedDateTime, "PPP p") : "None"}
        </p>
      </div>
    </div>
  );
};

export default DateTimePickerDemo;
