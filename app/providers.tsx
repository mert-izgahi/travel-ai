"use client";
import React, { useEffect, useState } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { LoadingOverlay, MantineProvider } from "@mantine/core";
import { theme } from "@/theme";
import { ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";

function Providers({ children }: { children: React.ReactNode }) {
    const client = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
            },
        },
    });
    const [hasMounted, setHasMounted] = useState(false);
    useEffect(() => {
        setHasMounted(true);
    }, []);
    if (!hasMounted) {
        return null;
    }
    return (
        <QueryClientProvider client={client}>
            <MantineProvider theme={theme}>
                <ClerkLoading>
                    <LoadingOverlay
                        visible={true}
                        zIndex={1000}
                        overlayProps={{ opacity: 0.5, blur: 2 }}
                        loaderProps={{
                            color: "#7048E8",
                            type: "bars",
                            size: "xl",
                        }}
                    />
                </ClerkLoading>
                <ClerkLoaded>
                    <Toaster position="top-center" reverseOrder={false} />
                    {children}
                </ClerkLoaded>
            </MantineProvider>
        </QueryClientProvider>
    );
}

export default Providers;
