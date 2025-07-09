import Table_01, { codeStringTable_01 } from './components/Table_01';
import  Table_02, { codeStringTable_02 } from './components/Table_02';
import Table_03, { codeStringTable_03 } from './components/Table_03';

type ComponentInfo = {
  name: string;
  component: React.ReactNode;
  description: string;
  imageDark: string;
  imageLight: string;
  code: string;
  installCommand: string;
  preview: React.ReactNode;
};

interface Column<T> {
  accessor: keyof T;
  label: string;
  sortable?: boolean;
  className?: string;
}

const columns: Column<{ name: string; email: string; role: string; }>[] = [
  { accessor: "name", label: "Name", sortable: true },
  { accessor: "email", label: "Email", sortable: true },
  { accessor: "role", label: "Role" },
];

const data = [
  { name: "Alice", email: "alice@example.com", role: "Admin" },
  { name: "Bob", email: "bob@example.com", role: "User" },
  { name: "Charlie", email: "charlie@example.com", role: "Moderator" },
];


export const tableComponents: ComponentInfo[] = [
    {
      name: 'Table 01',
      component: <Table_01 />,
      description: 'A minimal, single-open table with icons and smooth transitions, ideal for clean, focused FAQ ',
      imageDark: "/components/tables/dark/table-01.png",
      imageLight: "/components/tables/light/table-01.png",
      code: codeStringTable_01,
      installCommand: 'npm install @ruixen/ui',
      preview: <Table_01 />
    },
    {
      name: 'Table 02',
      component: <Table_02 columns={columns} data={data} />,
      description: 'A responsive FAQ section with categorized accordions, designed to guide users and provide quick answers.',
      imageDark: "/components/tables/dark/table-02.png",
      imageLight: "/components/tables/light/table-02.png",
      code: codeStringTable_02,
      installCommand: 'npm install @ruixen/ui',
      preview: <Table_02 columns={columns} data={data} />
    },
    {
      name: 'Table 03',
      component: <Table_03 columns={columns} data={data} pageSize={5} searchable />,
      description: 'A responsive FAQ section with categorized accordions, designed to guide users and provide quick answers.',
      imageDark: "/components/tables/dark/table-03.png",
      imageLight: "/components/tables/light/table-03.png",
      code: codeStringTable_03,
      installCommand: 'npm install @ruixen/ui',
      preview: <Table_03 columns={columns} data={data} pageSize={5} searchable />
    },
  ];
  