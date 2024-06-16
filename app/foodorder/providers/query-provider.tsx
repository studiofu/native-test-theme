import { View, Text } from 'react-native'
import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

type QueryProviderProps = {
  children: React.ReactNode
}


const client = new QueryClient();
const QueryProvider = (
  props: QueryProviderProps
) => {

  return (
    <QueryClientProvider client={client}>
    
      <Text>QueryProvider</Text>
      {props.children}
    
    </QueryClientProvider>
  )
}

export default QueryProvider