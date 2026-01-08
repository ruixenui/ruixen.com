"use client";

import * as React from "react";
import CheckboxIndeterminate from "@/registry/ruixenui/checkbox-indeterminate";

export default function CheckboxIndeterminateDemo() {
  const [parentChecked, setParentChecked] = React.useState<
    boolean | "indeterminate"
  >("indeterminate");
  const [child1, setChild1] = React.useState(true);
  const [child2, setChild2] = React.useState(false);

  React.useEffect(() => {
    if (child1 && child2) {
      setParentChecked(true);
    } else if (!child1 && !child2) {
      setParentChecked(false);
    } else {
      setParentChecked("indeterminate");
    }
  }, [child1, child2]);

  const handleParentChange = (checked: boolean | "indeterminate") => {
    if (checked === true) {
      setChild1(true);
      setChild2(true);
    } else {
      setChild1(false);
      setChild2(false);
    }
  };

  return (
    <div className="flex min-h-[350px] w-full items-center justify-center">
      <div className="flex flex-col gap-2">
        <CheckboxIndeterminate
          checked={parentChecked}
          onCheckedChange={handleParentChange}
          label="Select all"
        />
        <div className="ml-6 flex flex-col gap-2">
          <CheckboxIndeterminate
            checked={child1}
            onCheckedChange={(c) => setChild1(c === true)}
            label="Option 1"
          />
          <CheckboxIndeterminate
            checked={child2}
            onCheckedChange={(c) => setChild2(c === true)}
            label="Option 2"
          />
        </div>
      </div>
    </div>
  );
}
