import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";
import DocumentPage from "./pages/DocumentPage";
import DocumentEditorPage from "./pages/DocumentEditorPage";
import MinutesListPage from "./pages/MinutesListPage";
import MinutesCreatePage from "./pages/MinutesCreatePage";
import ImagePage from "./pages/ImagePage";
import SchedulePage from "./pages/SchedulePage";
import ScheduleCreatePage from "./pages/ScheduleCreatePage";
import MyPage from "./pages/MyPage";

// ✅ 관리자 페이지 경로 수정 (admin 폴더 추가 및 Dashboard 연결)
import AdminDashboard from "./pages/admin/AdminDashboard"; 
import AdminDepartmentPage from "./pages/admin/AdminDepartmentPage";
import AdminSettingsPage from "./pages/admin/AdminSettingsPage";
import AdminPage from "./pages/admin/AdminPage";
import AdminUserPage from "./pages/admin/AdminUserPage";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route element={<MainLayout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/document" element={<DocumentPage />} />
          <Route path="/document/new" element={<DocumentEditorPage />} />
          <Route path="/document/:id" element={<DocumentEditorPage />} />
          <Route path="/minutes" element={<MinutesListPage />} />
          <Route path="/minutes/new" element={<MinutesCreatePage />} />
          <Route path="/image" element={<ImagePage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/schedule/create" element={<ScheduleCreatePage />} />
          <Route path="/mypage" element={<MyPage />} />
        </Route>

        {/* ✅ 관리자 영역 설정 */}
        <Route path="/admin" element={<AdminLayout />}>
          {/* 대시보드를 기본 페이지로 설정 */}
          <Route index element={<AdminDashboard />} />
          <Route path="department" element={<AdminDepartmentPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
          <Route path="page" element={<AdminPage />} />
          <Route path="users" element={<AdminUserPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;