"use client";

import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "../ui/sidebar";
import { NavGroup } from "@/navigation/sidebar/sidebar-items";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";

interface TagProps {
  type: 'beta' | 'new' | 'updated' | 'coming-soon';
  text: string;
  className?: string;
}

function SidebarTag({ type, text, className }: TagProps) {
  const getTagStyles = () => {
    switch (type) {
      case 'beta':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'new':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'updated':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';
      case 'coming-soon':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800/50 dark:text-gray-400';
    }
  };

  return (
    <span className={cn(
      'ml-1.5 px-1.5 py-0.5 text-xs font-medium rounded-md whitespace-nowrap',
      getTagStyles(),
      className
    )}>
      {text}
    </span>
  );
}

export default function SidebarNavigation({ sidebarItems }: { readonly sidebarItems: NavGroup[] }) {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <>
      {sidebarItems.map((navGroup) => (
        <SidebarGroup key={navGroup.id}>
          {navGroup.label && <SidebarGroupLabel>{navGroup.label}</SidebarGroupLabel>}
          <SidebarMenu>
            {navGroup.items.map((item) => (
              <Collapsible key={item.title} asChild defaultOpen={item.isActive} className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    {item.path ? (
                      <Link href="" className="w-full" onClick={(e) => {
                        e.preventDefault();
                        handleNavigation(item.path);
                      }}>
                        <SidebarMenuButton tooltip={item.title} className="w-full flex items-center">
                          {item.icon && <item.icon />}
                          <span className="flex items-center">
                            {item.title}
                            {item.tag && <SidebarTag type={item.tag.type} text={item.tag.text} />}
                          </span>
                          {item.subItems && (
                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                          )}
                        </SidebarMenuButton>
                      </Link>
                    ) : (
                      <SidebarMenuButton tooltip={item.title} className="w-full flex items-center">
                        {item.icon && <item.icon />}
                        <span className="flex items-center">
                          {item.title}
                          {item.tag && <SidebarTag type={item.tag.type} text={item.tag.text} />}
                        </span>
                        {item.subItems && (
                          <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        )}
                      </SidebarMenuButton>
                    )}
                  </CollapsibleTrigger>
                  {item.subItems && (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.subItems.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild>
                              <Link href="" onClick={(e) => {
                                  e.preventDefault();
                                  handleNavigation(subItem.path);
                                }}>
                                <span className="flex items-center">
                                  {subItem.title}
                                  {subItem.tag && <SidebarTag type={subItem.tag.type} text={subItem.tag.text} className="ml-1" />}
                                </span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  )}
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </>
  );
}
