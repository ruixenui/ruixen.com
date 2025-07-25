"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Ellipsis, Heart, Loader2, Edit, X, Check } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export const codeStringTable_05 = `"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Ellipsis, Heart, Loader2, Edit, X, Check } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const SHEET_NAMES: Record<string, { bg: string; text: string; border: string }> = {
  "CareerX": { bg: "bg-[#FFF3E0]", text: "text-[#EF6C00]", border: "border-[#EF6C00]" },
  "Download Brochure": { bg: "bg-[#D1C4E9]", text: "text-[#512DA8]", border: "border-[#512DA8]" },
  "Offer Letter": { bg: "bg-[#E0F7FA]", text: "text-[#00838F]", border: "border-[#00838F]" },
  "HR Documents": { bg: "bg-[#F1F8E9]", text: "text-[#33691E]", border: "border-[#33691E]" },
  "Resignation Letter": { bg: "bg-[#FFEBEE]", text: "text-[#C62828]", border: "border-[#C62828]" },
  "Final Settlement": { bg: "bg-[#EDE7F6]", text: "text-[#4527A0]", border: "border-[#4527A0]" },
  "Market Analysis": { bg: "bg-[#FFFDE7]", text: "text-[#F9A825]", border: "border-[#F9A825]" },
  "Team Structure": { bg: "bg-[#E3F2FD]", text: "text-[#1565C0]", border: "border-[#1565C0]" },
  "Client Feedback": { bg: "bg-[#FBE9E7]", text: "text-[#D84315]", border: "border-[#D84315]" },
  "Project Review": { bg: "bg-[#ECEFF1]", text: "text-[#455A64]", border: "border-[#455A64]" },
  "Audit Report": { bg: "bg-[#F3E5F5]", text: "text-[#6A1B9A]", border: "border-[#6A1B9A]" },
  "Suspension Letter": { bg: "bg-[#FFF8E1]", text: "text-[#FF6F00]", border: "border-[#FF6F00]" },
  "Probation Policy": { bg: "bg-[#F0F4C3]", text: "text-[#827717]", border: "border-[#827717]" },
  "Onboarding Plan": { bg: "bg-[#E8F5E9]", text: "text-[#2E7D32]", border: "border-[#2E7D32]" },
  "Promotion Letter": { bg: "bg-[#FFF3E0]", text: "text-[#FB8C00]", border: "border-[#FB8C00]" },
  "New Role Description": { bg: "bg-[#F1F8E9]", text: "text-[#558B2F]", border: "border-[#558B2F]" },
  "Training Schedule": { bg: "bg-[#E3F2FD]", text: "text-[#1976D2]", border: "border-[#1976D2]" },
  "Course Materials": { bg: "bg-[#FCE4EC]", text: "text-[#AD1457]", border: "border-[#AD1457]" },
  "Farewell Note": { bg: "bg-[#FBE9E7]", text: "text-[#BF360C]", border: "border-[#BF360C]" },
  "Retirement Benefits": { bg: "bg-[#E0F2F1]", text: "text-[#00796B]", border: "border-[#00796B]" },
};


const items = [
  {
    id: "1",
    name: "Alex Thompson",
    email: "alex.t@company.com",
    mail_id: "alex.t@company.com",
    status: "Active",
    balance: "$1,250.00",
    notes: "Top performer",
    sheets: ["CareerX", "Download Brochure"],
  },
  {
    id: "2",
    name: "Priya Mehta",
    email: "priya.m@solutions.io",
    mail_id: "priya.m@solutions.io",
    status: "On Leave",
    balance: "$780.45",
    notes: "Working remotely",
    sheets: ["Offer Letter", "HR Documents"]
  },
  {
    id: "3",
    name: "Liam O'Connor",
    email: "liam.o@enterprisetech.org",
    mail_id: "liam.o@enterprisetech.org",
    status: "Inactive",
    balance: "$0.00",
    notes: "Left company",
    sheets: ["Resignation Letter", "Final Settlement"]
  },
  {
    id: "4",
    name: "Chen Wei",
    email: "chen.wei@globalmarket.cn",
    mail_id: "chen.wei@globalmarket.cn",
    status: "Active",
    balance: "$3,200.90",
    notes: "Leading new project",
    sheets: ["Market Analysis", "Team Structure"]
  },
  {
    id: "5",
    name: "Isabelle Dupont",
    email: "isabelle.d@paristech.fr",
    mail_id: "isabelle.d@paristech.fr",
    status: "Active",
    balance: "$1,850.75",
    notes: "Great client feedback",
    sheets: ["Client Feedback", "Project Review"]
  },
  {
    id: "6",
    name: "David Kim",
    email: "david.k@startuphub.kr",
    mail_id: "david.k@startuphub.kr",
    status: "Suspended",
    balance: "$50.00",
    notes: "Pending investigation",
    sheets: ["Audit Report", "Suspension Letter"]
  },
  {
    id: "7",
    name: "Fatima Al-Sayed",
    email: "fatima.a@bizconnect.ae",
    mail_id: "fatima.a@bizconnect.ae",
    status: "Probation",
    balance: "$620.20",
    notes: "New joiner",
    sheets: ["Probation Policy", "Onboarding Plan"]
  },
  {
    id: "8",
    name: "Carlos Rivera",
    email: "carlos.r@latamcorp.mx",
    mail_id: "carlos.r@latamcorp.mx",
    status: "Active",
    balance: "$2,130.00",
    notes: "Promoted last quarter",
    sheets: ["Promotion Letter", "New Role Description"]
  },
  {
    id: "9",
    name: "Elena Petrova",
    email: "elena.p@russoft.ru",
    mail_id: "elena.p@russoft.ru",
    status: "Training",
    balance: "$410.10",
    notes: "Completing certification",
    sheets: ["Training Schedule", "Course Materials"]
  },
  {
    id: "10",
    name: "Johan van der Berg",
    email: "johan.v@techza.co.za",
    mail_id: "johan.v@techza.co.za",
    status: "Retired",
    balance: "$0.00",
    notes: "Retired with honors",
    sheets: ["Farewell Note", "Retirement Benefits"]
  }
];


function EditableNote({ value, onChange }: { value: string; onChange: (val: string) => void }) {
  const [isEditing, setIsEditing] = useState(false);
  const [noteValue, setNoteValue] = useState(value);
  const [isLoading, setIsLoading] = useState(false);

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => {
    setNoteValue(value);
    setIsEditing(false);
  };
  const handleSave = () => {
    setIsLoading(true);
    setTimeout(() => {
      onChange(noteValue);
      setIsEditing(false);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex items-center gap-2 focus:ring-0">
      <Input
        value={noteValue}
        onChange={(e) => setNoteValue(e.target.value)}
        readOnly={!isEditing || isLoading}
        className="w-full !text-[0.75rem] min-w-[10rem] !focus:ring-0"
      />
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
      ) : !isEditing ? (
        <Button variant="ghost" size="icon" onClick={handleEdit}>
          <Edit className="h-3 w-3 text-gray-500" />
        </Button>
      ) : (
        <>
          <Button variant="ghost" size="icon" onClick={handleSave}>
            <Check className="h-4 w-4 text-green-500" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleCancel}>
            <X className="h-4 w-4 text-red-500" />
          </Button>
        </>
      )}
    </div>
  );
}

function SheetSelector({
  selectedSheets,
  onChange,
}: {
  selectedSheets: string[];
  onChange: (sheets: string[]) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex gap-1 text-[0.65rem] h-auto">
          {selectedSheets.length > 0 ? (
            <div className="flex gap-1 w-[15rem] flex-wrap max-h-[6rem] overflow-auto">
              {selectedSheets.map((sheet, i) => {
                const c = SHEET_NAMES[sheet] || { bg: "bg-gray-200", text: "text-black", border: "border-gray-400" };
                return (
                  <span
                    key={i}
                    className={\`px-2 py-[0.6px] rounded-xl text-[0.65rem] \${c.bg} \${c.text} border whitespace-nowrap\`}
                  >
                    {sheet}
                  </span>
                );
              })}
            </div>
          ) : (
            <span className="text-gray-500">Select...</span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="max-h-[300px] overflow-y-auto no-scrollbar">
        {Object.keys(SHEET_NAMES).map((sheet) => {
          const isSelected = selectedSheets.includes(sheet);
          const colors = SHEET_NAMES[sheet];
          return (
            <DropdownMenuCheckboxItem
              key={sheet}
              checked={isSelected}
              onCheckedChange={(checked) => {
                const updated = checked
                  ? [...selectedSheets, sheet]
                  : selectedSheets.filter((s) => s !== sheet);
                onChange(updated);
              }}
              className=\`flex items-center gap-3 px-3 py-2 rounded-md \${isSelected ? \`\${colors.bg} \${colors.text} \${colors.border}\` : "bg-white text-gray-700"}\`;
            >
              <span className="flex-1 ml-3">{sheet}</span>
            </DropdownMenuCheckboxItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function Page() {
  return (
    <div className="bg-background">
      <div className="[&>div]:max-h-96 max-w-5xl mx-auto mt-32 rounded-xl border border-gray-200 dark:border-gray-800">
        <Table className="border-separate">
          <TableHeader className="sticky top-0 z-10 border-b border-gray-200 bg-gray-50/50 dark:bg-black backdrop-blur-xl">
            <TableRow className="hover:bg-transparent"> {/* edit direct table component for borders */}
              <TableHead className="text-left font-normal border-r border-gray-200 dark:border-gray-800">Name</TableHead>
              <TableHead className="text-left font-normal border-r border-gray-200 dark:border-gray-800">Email</TableHead>
              <TableHead className="text-left font-normal border-r border-gray-200 dark:border-gray-800">Status</TableHead>
              <TableHead className="text-left font-normal border-r border-gray-200 dark:border-gray-800">Notes</TableHead>
              <TableHead className="text-left font-normal">Sheets</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-gray-700 dark:text-gray-400">
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="border-r border-gray-200 dark:border-gray-800">{item.name}</TableCell>
                <TableCell className="border-r border-gray-200 dark:border-gray-800">{item.email}</TableCell>
                <TableCell className="border-r border-gray-200 dark:border-gray-800">{item.status}</TableCell>

                {/* Notes editable */}
                <TableCell className="border-r border-gray-200 dark:border-gray-800">
                  <EditableNote
                    value={item.notes}
                    onChange={(newNote) => {
                      item.notes = newNote;
                    }}
                  />
                </TableCell>

                {/* Sheets multi-select */}
                <TableCell>
                  <SheetSelector
                    selectedSheets={item.sheets}
                    onChange={(newSheets) => {
                      item.sheets = newSheets;
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableFooter className="bg-transparent">
            <TableRow>
              <TableCell colSpan={9} className="text-center">
                <Link href="https://ruixen.com?utm_source=21st.dev&utm_medium=components&utm_campaign=ruixen" target="_blank">
                  <span className="flex items-center justify-center gap-1 text-sm font-normal">
                    Made with <Heart className="w-4 h-4 text-red-500 inline" /> by @ruixen
                  </span>
                </Link>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
}
`;

const SHEET_NAMES: Record<string, { bg: string; text: string; border: string }> = {
  "CareerX": { bg: "bg-[#FFF3E0]", text: "text-[#EF6C00]", border: "border-[#EF6C00]" },
  "Download Brochure": { bg: "bg-[#D1C4E9]", text: "text-[#512DA8]", border: "border-[#512DA8]" },
  "Offer Letter": { bg: "bg-[#E0F7FA]", text: "text-[#00838F]", border: "border-[#00838F]" },
  "HR Documents": { bg: "bg-[#F1F8E9]", text: "text-[#33691E]", border: "border-[#33691E]" },
  "Resignation Letter": { bg: "bg-[#FFEBEE]", text: "text-[#C62828]", border: "border-[#C62828]" },
  "Final Settlement": { bg: "bg-[#EDE7F6]", text: "text-[#4527A0]", border: "border-[#4527A0]" },
  "Market Analysis": { bg: "bg-[#FFFDE7]", text: "text-[#F9A825]", border: "border-[#F9A825]" },
  "Team Structure": { bg: "bg-[#E3F2FD]", text: "text-[#1565C0]", border: "border-[#1565C0]" },
  "Client Feedback": { bg: "bg-[#FBE9E7]", text: "text-[#D84315]", border: "border-[#D84315]" },
  "Project Review": { bg: "bg-[#ECEFF1]", text: "text-[#455A64]", border: "border-[#455A64]" },
  "Audit Report": { bg: "bg-[#F3E5F5]", text: "text-[#6A1B9A]", border: "border-[#6A1B9A]" },
  "Suspension Letter": { bg: "bg-[#FFF8E1]", text: "text-[#FF6F00]", border: "border-[#FF6F00]" },
  "Probation Policy": { bg: "bg-[#F0F4C3]", text: "text-[#827717]", border: "border-[#827717]" },
  "Onboarding Plan": { bg: "bg-[#E8F5E9]", text: "text-[#2E7D32]", border: "border-[#2E7D32]" },
  "Promotion Letter": { bg: "bg-[#FFF3E0]", text: "text-[#FB8C00]", border: "border-[#FB8C00]" },
  "New Role Description": { bg: "bg-[#F1F8E9]", text: "text-[#558B2F]", border: "border-[#558B2F]" },
  "Training Schedule": { bg: "bg-[#E3F2FD]", text: "text-[#1976D2]", border: "border-[#1976D2]" },
  "Course Materials": { bg: "bg-[#FCE4EC]", text: "text-[#AD1457]", border: "border-[#AD1457]" },
  "Farewell Note": { bg: "bg-[#FBE9E7]", text: "text-[#BF360C]", border: "border-[#BF360C]" },
  "Retirement Benefits": { bg: "bg-[#E0F2F1]", text: "text-[#00796B]", border: "border-[#00796B]" },
};


const items = [
  {
    id: "1",
    name: "Alex Thompson",
    email: "alex.t@company.com",
    mail_id: "alex.t@company.com",
    status: "Active",
    balance: "$1,250.00",
    notes: "Top performer",
    sheets: ["CareerX", "Download Brochure"],
  },
  {
    id: "2",
    name: "Priya Mehta",
    email: "priya.m@solutions.io",
    mail_id: "priya.m@solutions.io",
    status: "On Leave",
    balance: "$780.45",
    notes: "Working remotely",
    sheets: ["Offer Letter", "HR Documents"]
  },
  {
    id: "3",
    name: "Liam O'Connor",
    email: "liam.o@enterprisetech.org",
    mail_id: "liam.o@enterprisetech.org",
    status: "Inactive",
    balance: "$0.00",
    notes: "Left company",
    sheets: ["Resignation Letter", "Final Settlement"]
  },
  {
    id: "4",
    name: "Chen Wei",
    email: "chen.wei@globalmarket.cn",
    mail_id: "chen.wei@globalmarket.cn",
    status: "Active",
    balance: "$3,200.90",
    notes: "Leading new project",
    sheets: ["Market Analysis", "Team Structure"]
  },
  {
    id: "5",
    name: "Isabelle Dupont",
    email: "isabelle.d@paristech.fr",
    mail_id: "isabelle.d@paristech.fr",
    status: "Active",
    balance: "$1,850.75",
    notes: "Great client feedback",
    sheets: ["Client Feedback", "Project Review"]
  },
  {
    id: "6",
    name: "David Kim",
    email: "david.k@startuphub.kr",
    mail_id: "david.k@startuphub.kr",
    status: "Suspended",
    balance: "$50.00",
    notes: "Pending investigation",
    sheets: ["Audit Report", "Suspension Letter"]
  },
  {
    id: "7",
    name: "Fatima Al-Sayed",
    email: "fatima.a@bizconnect.ae",
    mail_id: "fatima.a@bizconnect.ae",
    status: "Probation",
    balance: "$620.20",
    notes: "New joiner",
    sheets: ["Probation Policy", "Onboarding Plan"]
  },
  {
    id: "8",
    name: "Carlos Rivera",
    email: "carlos.r@latamcorp.mx",
    mail_id: "carlos.r@latamcorp.mx",
    status: "Active",
    balance: "$2,130.00",
    notes: "Promoted last quarter",
    sheets: ["Promotion Letter", "New Role Description"]
  },
  {
    id: "9",
    name: "Elena Petrova",
    email: "elena.p@russoft.ru",
    mail_id: "elena.p@russoft.ru",
    status: "Training",
    balance: "$410.10",
    notes: "Completing certification",
    sheets: ["Training Schedule", "Course Materials"]
  },
  {
    id: "10",
    name: "Johan van der Berg",
    email: "johan.v@techza.co.za",
    mail_id: "johan.v@techza.co.za",
    status: "Retired",
    balance: "$0.00",
    notes: "Retired with honors",
    sheets: ["Farewell Note", "Retirement Benefits"]
  }
];


function EditableNote({ value, onChange }: { value: string; onChange: (val: string) => void }) {
  const [isEditing, setIsEditing] = useState(false);
  const [noteValue, setNoteValue] = useState(value);
  const [isLoading, setIsLoading] = useState(false);

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => {
    setNoteValue(value);
    setIsEditing(false);
  };
  const handleSave = () => {
    setIsLoading(true);
    setTimeout(() => {
      onChange(noteValue);
      setIsEditing(false);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex items-center gap-2 focus:ring-0">
      <Input
        value={noteValue}
        onChange={(e) => setNoteValue(e.target.value)}
        readOnly={!isEditing || isLoading}
        className="w-full !text-[0.75rem] min-w-[10rem] !focus:ring-0"
      />
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
      ) : !isEditing ? (
        <Button variant="ghost" size="icon" onClick={handleEdit}>
          <Edit className="h-3 w-3 text-gray-500" />
        </Button>
      ) : (
        <>
          <Button variant="ghost" size="icon" onClick={handleSave}>
            <Check className="h-4 w-4 text-green-500" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleCancel}>
            <X className="h-4 w-4 text-red-500" />
          </Button>
        </>
      )}
    </div>
  );
}

function SheetSelector({
  selectedSheets,
  onChange,
}: {
  selectedSheets: string[];
  onChange: (sheets: string[]) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex gap-1 text-[0.65rem] h-auto">
          {selectedSheets.length > 0 ? (
            <div className="flex gap-1 w-[15rem] flex-wrap max-h-[6rem] overflow-auto">
              {selectedSheets.map((sheet, i) => {
                const c = SHEET_NAMES[sheet] || { bg: "bg-gray-200", text: "text-black", border: "border-gray-400" };
                return (
                  <span
                    key={i}
                    className={`px-2 py-[0.6px] rounded-xl text-[0.65rem] ${c.bg} ${c.text} border whitespace-nowrap`}
                  >
                    {sheet}
                  </span>
                );
              })}
            </div>
          ) : (
            <span className="text-gray-500">Select...</span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="max-h-[300px] overflow-y-auto no-scrollbar">
        {Object.keys(SHEET_NAMES).map((sheet) => {
          const isSelected = selectedSheets.includes(sheet);
          const colors = SHEET_NAMES[sheet];
          return (
            <DropdownMenuCheckboxItem
              key={sheet}
              checked={isSelected}
              onCheckedChange={(checked) => {
                const updated = checked
                  ? [...selectedSheets, sheet]
                  : selectedSheets.filter((s) => s !== sheet);
                onChange(updated);
              }}
              className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                isSelected ? `${colors.bg} ${colors.text} ${colors.border}` : "bg-white text-gray-700"
              }`}
            >
              <span className="flex-1 ml-3">{sheet}</span>
            </DropdownMenuCheckboxItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function Page() {
  return (
    <div className="bg-background">
      <div className="[&>div]:max-h-96 max-w-5xl mx-auto mt-32 rounded-xl border border-gray-200 dark:border-gray-800">
        <Table className="border-separate">
          <TableHeader className="sticky top-0 z-10 border-b border-gray-200 bg-gray-50/50 dark:bg-black backdrop-blur-xl">
            <TableRow className="hover:bg-transparent"> {/* edit direct table component for borders */}
              <TableHead className="text-left font-normal border-r border-gray-200 dark:border-gray-800">Name</TableHead>
              <TableHead className="text-left font-normal border-r border-gray-200 dark:border-gray-800">Email</TableHead>
              <TableHead className="text-left font-normal border-r border-gray-200 dark:border-gray-800">Status</TableHead>
              <TableHead className="text-left font-normal border-r border-gray-200 dark:border-gray-800">Notes</TableHead>
              <TableHead className="text-left font-normal">Sheets</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-gray-700 dark:text-gray-400">
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="border-r border-gray-200 dark:border-gray-800">{item.name}</TableCell>
                <TableCell className="border-r border-gray-200 dark:border-gray-800">{item.email}</TableCell>
                <TableCell className="border-r border-gray-200 dark:border-gray-800">{item.status}</TableCell>

                {/* Notes editable */}
                <TableCell className="border-r border-gray-200 dark:border-gray-800">
                  <EditableNote
                    value={item.notes}
                    onChange={(newNote) => {
                      item.notes = newNote;
                    }}
                  />
                </TableCell>

                {/* Sheets multi-select */}
                <TableCell>
                  <SheetSelector
                    selectedSheets={item.sheets}
                    onChange={(newSheets) => {
                      item.sheets = newSheets;
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableFooter className="bg-transparent">
            <TableRow>
              <TableCell colSpan={9} className="text-center">
                <Link href="https://ruixen.com?utm_source=21st.dev&utm_medium=components&utm_campaign=ruixen" target="_blank">
                  <span className="flex items-center justify-center gap-1 text-sm font-normal">
                    Made with <Heart className="w-4 h-4 text-red-500 inline" /> by @ruixen
                  </span>
                </Link>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
}
