'use client';
import { useEffect } from 'react';
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { ThemeProvider, useTheme } from "@/context/ThemeContext";

function ThemeApplicator({ children }) {
  const { getCSSOverrides } = useTheme();
  const overrides = getCSSOverrides();

  useEffect(() => {
    const root = document.documentElement;
    Object.entries(overrides).forEach(([prop, value]) => {
      if (value) root.style.setProperty(prop, value);
    });
  }, [overrides]);

  return children;
}

export default function ClientLayout({ children }) {
  return (
    <ThemeProvider>
      <ThemeApplicator>
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex-1 lg:ml-64 flex flex-col transition-[margin] duration-300">
            <Header />
            <main className="flex-1 overflow-y-auto">
              {children}
            </main>
          </div>
        </div>
      </ThemeApplicator>
    </ThemeProvider>
  );
}
