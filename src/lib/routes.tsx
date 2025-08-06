import { createBrowserRouter } from 'react-router-dom';
import { Dashboard } from '@/pages/dashboard';
import { CalendarPage } from '@/pages/calendar';
import LoginPage from '@/pages/login';
import PatientsPage from '@/pages/patients';
import PatientDetailsPage from '@/pages/patient-details';
import LandingPage from '@/pages/landing-page';
import ProtectedRoutes from './protected-routes';
import { PrivacyPolicyPage, TermsOfServicePage, CookiePolicyPage } from '@/pages/legal';
import RegistrationForm from '@/pages/landing-page/registration-form';

export const router = createBrowserRouter([
  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: '/patients',
        element: <PatientsPage />,
        errorElement: <div>Error</div>,
      },
      {
        path: '/patients/:id',
        element: <PatientDetailsPage />,
        errorElement: <div>Error</div>,
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
        errorElement: <div>Error</div>,
      },
      {
        path: '/assign_patient',
        element: <div>Assign Patient</div>,
        errorElement: <div>Error</div>,
      },
      {
        path: '/calendar',
        element: <CalendarPage />,
        errorElement: <div>Error</div>,
      },
    ],
  },
  {
    path: '/',
    element: <LandingPage />,
    errorElement: <div>Error</div>,
  },
  {
    path: '/privacy-policy',
    element: <PrivacyPolicyPage />,
    errorElement: <div>Error</div>,
  },
  {
    path: '/terms-of-service',
    element: <TermsOfServicePage />,
    errorElement: <div>Error</div>,
  },
  {
    path: '/cookie-policy',
    element: <CookiePolicyPage />,
    errorElement: <div>Error</div>,
  },
  {
    path: '/registration-form',
    element: <RegistrationForm />,
    errorElement: <div>Error</div>,
  },
  {
    path: '/test',
    element: <div>Test</div>,
    errorElement: <div>Error</div>,
  },
  {
    path: '/login',
    element: <LoginPage />,
    errorElement: <div>Error</div>,
  },
]);
