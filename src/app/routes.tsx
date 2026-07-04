import { createBrowserRouter, Navigate } from "react-router";
import { Layout } from "./components/Layout";
import { Login } from "./pages/Login";
import { StudentList } from "./pages/StudentList";
import { StudentProfile } from "./pages/StudentProfile";
import { CompanyDashboard } from "./pages/CompanyDashboard";
import { CompanyList } from "./pages/CompanyList";
import { CompanyProfile } from "./pages/CompanyProfile";
import { Messages } from "./pages/Messages";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/company",
    Component: Layout,
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: "dashboard", Component: CompanyDashboard },
      { path: "students", Component: StudentList },
      { path: "student/:id", Component: StudentProfile },
      { path: "bookmarks", Component: StudentList }, // reusing list for prototype
      { path: "messages", Component: Messages },
    ]
  },
  {
    path: "/student",
    Component: Layout,
    children: [
      { index: true, element: <Navigate to="home" replace /> },
      { path: "home", Component: StudentList },
      { path: "profile", Component: StudentProfile },
      { path: "profile/:id", Component: StudentProfile },
      { path: "companies", Component: CompanyList },
      { path: "company/:id", Component: CompanyProfile },
      { path: "messages", Component: Messages },
    ]
  }
], {
  basename: import.meta.env.BASE_URL,
});
