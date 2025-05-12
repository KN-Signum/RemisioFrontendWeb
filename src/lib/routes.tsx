import { Dashboard } from "@/pages/dashboard";
import { createBrowserRouter } from "react-router-dom";

import LoginPage from "@/pages/login/loginPage";
import PatientsPage from "@/pages/patients/patientsPage";
import PatientDetailsPage from "@/pages/patients/patientDetailsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Home</div>,
    errorElement: <div>Error</div>,
  },
  {
    path: "/patients",
    element: <div><PatientsPage /></div>,
    errorElement: <div>Error</div>,
  },
  {
    path: "/patients/:id",
    element: <div><PatientDetailsPage /></div>,
    errorElement: <div>Error</div>,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    errorElement: <div>Error</div>,
  },
  {
    path: "/assign_patient",
    element: <div>Assign Patient</div>,
    errorElement: <div>Error</div>,
  },
  {
    path: "/calendar",
    element: <div>Calendar</div>,
    errorElement: <div>Error</div>,
  },
  {
    path: "/test",
    element: <div>Test</div>,
    errorElement: <div>Error</div>,
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <div>Error</div>,
  },
]);
