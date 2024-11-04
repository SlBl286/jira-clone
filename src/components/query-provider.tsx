"use client"
import { isServer, QueryClient, QueryClientProvider } from "@tanstack/react-query"
function makeQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000,
            }

        }
    })
}

let browerQueryClient: QueryClient | undefined = undefined

function getQueryClient() {
    if (isServer) {
        return makeQueryClient()
    }
    else {
        if (!browerQueryClient) browerQueryClient = makeQueryClient()
        return browerQueryClient;
    }
}

type QueryProviderProps = {
    children: React.ReactNode
}

export function QueryProvider({ children }: QueryProviderProps) {
    const queryClient = getQueryClient();

    return (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
}