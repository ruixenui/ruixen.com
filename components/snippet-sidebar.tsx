'use client';

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import { Monitor, Tablet, Smartphone, Code2 } from 'lucide-react';

type TabItem = {
    id: string;
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
    preview?: React.ReactNode;
};

export default function SnippetDialog({
    open,
    title,
    installCommand,
    tabs,
    activeTab,
    setActiveTab,
    onClose,
    copyToClipboard,
    preview
}: SnippetSidebarProps) {

    const [device, setDevice] = useState<'mobile' | 'tablet' | 'system'>('system');
    const [showCode, setShowCode] = useState(false);

    const deviceWidth = device === 'mobile' ? 'w-[375px]' : device === 'tablet' ? 'w-[768px]' : 'w-[1280px]';

    return (
        <AnimatePresence>
            {open && (
                <div className="z-40 flex items-end justify-center">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-black/60 z-30"
                        onClick={onClose}
                    />

                    <motion.div
                        key="dialog"
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                        className={`fixed left-0 bottom-0 right-0 ${deviceWidth} mx-auto bg-[#f5f5f5] dark:bg-black backdrop-blur-xl z-40 shadow-lg flex flex-col dark:bg-black`}
                    >
                        <div className="p-4 border-b border-gray-300 dark:border-gray-700 flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">{title}</h2>
                            <div className="flex gap-2">
                                <button
                                    className={`p-1 rounded ${device === 'mobile' ? 'bg-zinc-900 text-white' : 'bg-zinc-200 dark:bg-zinc-800'}`}
                                    onClick={() => setDevice('mobile')}
                                >
                                    <Smartphone size={16} />
                                </button>
                                <button
                                    className={`p-1 rounded ${device === 'tablet' ? 'bg-zinc-900 text-white' : 'bg-zinc-200 dark:bg-zinc-800'}`}
                                    onClick={() => setDevice('tablet')}
                                >
                                    <Tablet size={16} />
                                </button>
                                <button
                                    className={`p-1 rounded ${device === 'system' ? 'bg-zinc-900 text-white' : 'bg-zinc-200 dark:bg-zinc-800'}`}
                                    onClick={() => setDevice('system')}
                                >
                                    <Monitor size={16} />
                                </button>
                                <button
                                    className={`p-1 rounded ${showCode ? 'bg-zinc-900 text-white' : 'bg-zinc-200 dark:bg-zinc-800'}`}
                                    onClick={() => setShowCode(!showCode)}
                                >
                                    <Code2 size={16} />
                                </button>
                            </div>
                        </div>
                        <div className="p-3">
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

                        <div className="px-4 pb-4">
                            <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val)} className="w-full">
                                <TabsList className="w-full justify-center flex-wrap gap-2">
                                </TabsList>
                                {tabs.map((tab) => (
                                    <TabsContent
                                        key={tab.id}
                                        value={tab.id}
                                        className="text-sm text-muted-foreground p-4 max-h-[73vh] overflow-y-auto"
                                    >
                                        {showCode ? tab.content : <div className="py-10 flex items-center justify-center">{preview}</div>}
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
