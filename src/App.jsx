import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import GlobalStyles from "./styles/GlobalStyles.js";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import Users from "./pages/Users";
import Account from "./pages/Account";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
    },
  },
});

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false}/>
          <GlobalStyles />
          <BrowserRouter>
            <Routes>
              <Route element={<AppLayout />}>
                <Route
                  index
                  element={<Navigate replace={true} to={"/dashboard"} />}
                  err
                />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="bookings" element={<Bookings />} />
                <Route path="cabins" element={<Cabins />} />
                <Route path="login" element={<Login />} />
                <Route path="settings" element={<Settings />} />
                <Route path="users" element={<Users />} />
                <Route path="account" element={<Account />} />
                <Route path="*" element={<PageNotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
