'use client';

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';

type TabItem = {
    id: string;
    label: string;
    icon?: React.ReactNode;
    content: React.ReactNode;
};

type SnippetSidebarProps = {
    open: boolean;
    title: string;
    installCommand: string;
    tabs: TabItem[];
    activeTab: string;
    setActiveTab: (tabId: string) => void;
    onClose: () => void;
    copyToClipboard: (text: string) => void;
};

export default function SnippetSidebar({
    open,
    title,
    installCommand,
    tabs,
    activeTab,
    setActiveTab,
    onClose,
    copyToClipboard,
}: SnippetSidebarProps) {

    return (
        <AnimatePresence>
            {open && (
                <div className="z-40 flex items-start justify-end">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-black/60 z-30"
                        onClick={onClose}
                    />

                    <motion.div
                        key="sidebar"
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                        className="fixed h-[calc(100vh-5.5rem)] inset-y-0 right-0 my-[5rem] rounded-xl w-full sm:w-[450px] bg-gray-200 dark:bg-black z-40 shadow-lg flex flex-col"
                    >

                        <div className="p-3 rounded-xl">
                            <div className="flex items-center bg-zinc-900 text-white rounded px-3 py-2 text-sm relative">
                                <span className="flex-1 break-all">{installCommand}</span>
                                <button
                                    className="ml-2 text-gray-400 hover:text-white"
                                    onClick={() => copyToClipboard(installCommand)}
                                >
                                    <svg fill="none" height="18" viewBox="0 0 24 24" width="18">
                                        <path d="M9 6.75H7.75C6.64543 6.75 5.75 7.64543 5.75 8.75V17.25C5.75 18.3546 6.64543 19.25 7.75 19.25H16.25C17.3546 19.25 18.25 18.3546 18.25 17.25V8.75C18.25 7.64543 17.3546 6.75 16.25 6.75H15" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                                        <path d="M14 8.25H10C9.44772 8.25 9 7.80228 9 7.25V5.75C9 5.19772 9.44772 4.75 10 4.75H14C14.5523 4.75 15 5.19772 15 5.75V7.25C15 7.80228 14.5523 8.25 14 8.25Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div className="px-2 py-1">
                            <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val)} className="w-full">
                                <TabsList className="w-full justify-start flex-wrap">
                                    {tabs.map((tab) => (
                                        <TabsTrigger
                                            key={tab.id}
                                            value={tab.id}
                                            className="flex items-center gap-2 w-fit"
                                        >
                                            {tab.icon}
                                            {tab.label}
                                        </TabsTrigger>
                                    ))}
                                </TabsList>
                                {tabs.map((tab) => (
                                    <TabsContent
                                        key={tab.id}
                                        value={tab.id}
                                        className="text-sm text-muted-foreground p-4 h-[calc(100vh-13rem)] overflow-y-auto"
                                    >
                                        {tab.content}
                                    </TabsContent>
                                ))}
                            </Tabs>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
