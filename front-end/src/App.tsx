import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import HomeLayout from "./layouts/HomeLayout";
import HomePage from "./pages/user/HomePage";
import AboutPage from "./pages/user/AboutPage";
import AdminLayout from "./layouts/AdminLayout";
import DashboardPage from "./pages/admin/DashboardPage";
import AuthLayout from "./layouts/AuthLayout";
import SignInPage from "./pages/auth/SignInPage";
import SignUpPage from "./pages/auth/SignUpPage";
import { createContext, useContext } from "react";
import { useMe } from "./hooks/useAuth";
import type { UserType } from "./types/types";
import NoteCreatePage from "./pages/user/NoteCreatePage";
import NoteDetailPage from "./pages/user/NoteDetailPage";
import EditNotePage from "./pages/user/EditNotePage";

interface AppContextType {
  user: UserType | null;
}

const AppContext = createContext<AppContextType>({} as AppContextType);
export const useAppContext = () => useContext(AppContext);

function App() {
  const { data, isLoading } = useMe();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AppContext.Provider value={{ user: data?.data ?? null }}>
      <BrowserRouter>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
          </Route>

          <Route element={<HomeLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/note/create" element={<NoteCreatePage />} />
            <Route path="/note/:noteId" element={<NoteDetailPage />} />
            <Route path="/note/edit/:noteId" element={<EditNotePage />} />
          </Route>

          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<DashboardPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
