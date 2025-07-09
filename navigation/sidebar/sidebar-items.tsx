import { File, SquareChartGantt, KeySquare, LucideIcon, PanelsTopLeft, Activity, MessageSquareShare, Atom } from "lucide-react";

export interface NavSubItem {
  title: string;
  path: string;
  tag?: {
    type: 'beta' | 'new' | 'updated' | 'coming-soon';
    text: string;
  };
}

export interface NavMainItem {
  title: string;
  path: string;
  icon?: LucideIcon;
  isActive?: boolean;
  subItems?: NavSubItem[];
  tag?: {
    type: 'beta' | 'new' | 'updated' | 'coming-soon';
    text: string;
  };
}

export interface NavGroup {
  id: number;
  label: string;
  items: NavMainItem[];
}

export const sidebarItems: NavGroup[] = [
  {
    id: 1,
    label: "Main",
    items: [
      {
        title: "Home",
        path: "/",
        icon: PanelsTopLeft,
        isActive: true,
      },
    ],
  },
  {
    id: 2,
    label: "Store & Operations",
    items: [
      {
        title: "Product Center",
        path: "",
        icon: SquareChartGantt,
        subItems: [
          { title: "Inventory", path: `/products/inventory` },
          { 
            title: "New Listings", 
            path: `/products/new-listings`,
            tag: {
              type: 'beta',
              text: 'beta'
            }
          },
          { 
            title: "Category Mapping", 
            path: `/products/category-mapping`,
            tag: {
              type: 'beta',
              text: 'beta'
            } 
          },
        ],
      },
      {
        title: "Analytics",
        path: "",
        icon: Activity,
        subItems: [
          { 
            title: "Conversion Trends", 
            path: `/analytics/conversion-trends`,
            tag: {
              type: 'updated',
              text: 'updated'
            }
          },
        ],
      },
      {
        title: "Campaigns",
        path: "",
        icon: MessageSquareShare,
        subItems: [
          { title: "Email Blasts", path: `/campaigns/email-blasts` },
          { title: "Discount Manager", path: `/campaigns/discount-manager` },
        ],
      },
      {
        title: "Customer List",
        path: `/customers`,
        icon: File,
      },
      {
        title: "Access Settings",
        path: "",
        icon: KeySquare,
        subItems: [
          { title: "Roles & Rights", path: `/settings/roles` },
          { title: "Onboard Vendor", path: `/settings/vendor-onboard` },
        ],
      },
      {
        title: "Order Reviews",
        path: `/orders/reviews`,
        icon: File,
      },
      // {
      //   title: "Weekly Insights",
      //   path: `/reports/weekly-insights`,
      //   icon: ClipboardMinus,
      // },
      // {
      //   title: "Feedback Loop",
      //   path: `/feedback/loop`,
      //   icon: Send,
      // },
    ],
  },
  {
    id: 3,
    label: "Growth Tools",
    items: [
      {
        title: "Smart Advisor",
        path: `/advisor`,
        icon: Atom,
        tag: {
          type: 'coming-soon',
          text: 'coming-soon'
        }
      },
    ],
  },
];
