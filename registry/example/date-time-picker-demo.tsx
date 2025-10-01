"use client";

import React, { useState } from "react";
import DateTimePicker from "@/registry/ruixenui/date-time-picker";
import { format } from "date-fns";

const DateTimePickerDemo: React.FC = () => {
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-8 gap-6">
      <h1 className="text-white text-2xl font-bold mb-4">
        DateTimePicker Demo
      </h1>

      {/* DateTimePicker component */}
      <DateTimePicker
        defaultDate={new Date()}
        defaultHour="10"
        defaultMinute="30"
        defaultAMPM="AM"
        onChange={setSelectedDateTime}
        minDate={new Date()} // cannot select past dates
      />

      {/* Display selected date/time */}
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
