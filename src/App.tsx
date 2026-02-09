import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'react-hot-toast'
import AllahNames from './pages/AllahNames'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen">
        <AllahNames />
      </div>
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: '#1a3c2f',
            color: '#fff',
            border: '1px solid #2e6b4f',
          },
        }}
      />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App