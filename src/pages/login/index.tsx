import { useState } from 'react';
import { SplitImage, LoginRequestDto } from '@/features/auth';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { InputField } from '@/components/ui/input-field';
import { useLogin } from '@/features/auth/api/login';
import { Button } from '@/components/ui/button';

type AuthMode = 'login' | 'register' | 'onboarding';

type RegisterStep = 0 | 1 | 2;

type RegisterRequestDto = {
  // Krok 1 — Dane osobowe
  firstName: string;
  lastName: string;
  email: string;
  // Krok 2 — Dane zawodowe (specjalizacja i placówka)
  specialization: string;
  facilityName: string;
  facilityCity: string;
  // Krok 3 — Hasło
  password: string;
  confirmPassword: string;
};

type RegisterProps = {
  t: (k: string) => string;
  step: RegisterStep;
  reg: RegisterRequestDto;
  regErrors: Partial<Record<keyof RegisterRequestDto, string>>;
  setReg: React.Dispatch<React.SetStateAction<RegisterRequestDto>>;
  setRegErrors: React.Dispatch<
    React.SetStateAction<Partial<Record<keyof RegisterRequestDto, string>>>
  >;
  prevStep: () => void;
  nextStep: () => void;
  onSubmit: (e: React.FormEvent) => void;
};

function RegisterStepContent({
  t,
  step,
  reg,
  regErrors,
  setReg,
  setRegErrors,
  prevStep,
  nextStep,
  onSubmit,
}: RegisterProps) {
  return (
    <form className="flex h-full w-full flex-col" onSubmit={onSubmit}>
      <div className="w-full">
        <ol className="mb-8 flex w-full items-center justify-between gap-2">
          {['Dane osobowe', 'Dane zawodowe', 'Hasło'].map((label, idx) => {
            const i = idx as RegisterStep;
            const isActive = step === i;
            const isDone = step > i;
            return (
              <li key={label} className="flex-1">
                <div
                  className={`flex w-full items-center gap-2 rounded-xl border px-3 py-2 text-sm ${isActive ? 'border-primary text-primary shadow-sm' : isDone ? 'border-green-500 text-green-700' : 'border-gray-200 text-gray-500'}`}
                  aria-current={isActive ? 'step' : undefined}
                >
                  <span
                    className={`grid h-6 w-6 place-items-center rounded-full text-xs font-semibold ${isActive ? 'bg-primary text-white' : isDone ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                  >
                    {idx + 1}
                  </span>
                  <span className="truncate">{label}</span>
                </div>
              </li>
            );
          })}
        </ol>

        {step === 0 && (
          <div className="flex w-full flex-col gap-4 xl:px-20 2xl:px-50">
            <InputField
              id="reg-firstName"
              label="Imię"
              type="text"
              placeholder="Jan"
              value={reg.firstName}
              error={regErrors.firstName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setReg({ ...reg, firstName: e.target.value });
                if (regErrors.firstName)
                  setRegErrors((p) => ({ ...p, firstName: undefined }));
              }}
            />
            <InputField
              id="reg-lastName"
              label="Nazwisko"
              type="text"
              placeholder="Kowalski"
              value={reg.lastName}
              error={regErrors.lastName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setReg({ ...reg, lastName: e.target.value });
                if (regErrors.lastName)
                  setRegErrors((p) => ({ ...p, lastName: undefined }));
              }}
            />
            <InputField
              id="reg-email"
              label={t('email')}
              type="email"
              placeholder={t('emailPlaceholder')}
              value={reg.email}
              error={regErrors.email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setReg({ ...reg, email: e.target.value });
                if (regErrors.email)
                  setRegErrors((p) => ({ ...p, email: undefined }));
              }}
            />
          </div>
        )}

        {step === 1 && (
          <div className="flex w-full flex-col gap-4 xl:px-20 2xl:px-50">
            <InputField
              id="reg-specialization"
              label="Specjalizacja"
              type="text"
              placeholder="np. Kardiologia"
              value={reg.specialization}
              error={regErrors.specialization}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setReg({ ...reg, specialization: e.target.value });
                if (regErrors.specialization)
                  setRegErrors((p) => ({ ...p, specialization: undefined }));
              }}
            />
            <InputField
              id="reg-facilityName"
              label="Placówka"
              type="text"
              placeholder="Nazwa placówki"
              value={reg.facilityName}
              error={regErrors.facilityName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setReg({ ...reg, facilityName: e.target.value });
                if (regErrors.facilityName)
                  setRegErrors((p) => ({ ...p, facilityName: undefined }));
              }}
            />
            <InputField
              id="reg-facilityCity"
              label="Miasto"
              type="text"
              placeholder="Wrocław"
              value={reg.facilityCity}
              error={regErrors.facilityCity}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setReg({ ...reg, facilityCity: e.target.value });
                if (regErrors.facilityCity)
                  setRegErrors((p) => ({ ...p, facilityCity: undefined }));
              }}
            />
          </div>
        )}

        {step === 2 && (
          <div className="flex w-full flex-col gap-4 xl:px-20 2xl:px-50">
            <InputField
              id="reg-password"
              label={t('password')}
              type="password"
              placeholder={t('passwordPlaceholder')}
              value={reg.password}
              error={regErrors.password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setReg({ ...reg, password: e.target.value });
                if (regErrors.password)
                  setRegErrors((p) => ({ ...p, password: undefined }));
              }}
            />
            <InputField
              id="reg-confirm"
              label={t('confirmPassword') || 'Potwierdź hasło'}
              type="password"
              placeholder={t('confirmPassword') || 'Potwierdź hasło'}
              value={reg.confirmPassword}
              error={regErrors.confirmPassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setReg({ ...reg, confirmPassword: e.target.value });
                if (regErrors.confirmPassword)
                  setRegErrors((p) => ({ ...p, confirmPassword: undefined }));
              }}
            />
          </div>
        )}

        <div className="mt-6 flex w-full items-center justify-between xl:px-20 2xl:px-50">
          <Button type="button" onClick={prevStep} disabled={step === 0}>
            Wstecz
          </Button>
          {step < 2 ? (
            <Button type="button" onClick={nextStep}>
              Dalej
            </Button>
          ) : (
            <Button type="submit" className="font-bold">
              {t('register')}
            </Button>
          )}
        </div>

        <div className="mt-4 w-full text-right text-sm text-gray-600 xl:px-20 2xl:px-50">
          {t('have_account') || 'Masz już konto?'}{' '}
          <button
            type="button"
            className="text-primary hover:underline"
            onClick={() => window.location.assign('/login')}
          >
            {t('login')}
          </button>
        </div>
      </div>
    </form>
  );
}

const initialLogin: LoginRequestDto = { email: '', password: '' };

const initialRegister: RegisterRequestDto = {
  firstName: '',
  lastName: '',
  email: '',
  specialization: '',
  facilityName: '',
  facilityCity: '',
  password: '',
  confirmPassword: '',
};

const LoginPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('auth');

  const [mode, setMode] = useState<AuthMode>('login');

  // LOGIN
  const [userLogInInfo, setUserLogInInfo] =
    useState<LoginRequestDto>(initialLogin);
  const [loginErrors, setLoginErrors] = useState<{
    email?: string;
    password?: string;
  }>({});
  const login = useLogin({
    onSuccess: () => {
      console.log('Login successful');
      navigate('/dashboard');
    },
  });

  // REGISTER
  const [reg, setReg] = useState<RegisterRequestDto>(initialRegister);
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [regErrors, setRegErrors] = useState<
    Partial<Record<keyof RegisterRequestDto, string>>
  >({});

  const validateLogin = () => {
    const errs: typeof loginErrors = {};
    if (!userLogInInfo.email.trim()) errs.email = t('errors.emailNotEmpty');
    if (!userLogInInfo.password.trim())
      errs.password = t('errors.passwordNotEmpty');
    setLoginErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateLogin()) return;
    login.mutate(userLogInInfo);
  };

  // Walidacje kroków rejestracji
  const validateStep = (s: 0 | 1 | 2) => {
    const errs: Partial<Record<keyof RegisterRequestDto, string>> = {};
    if (s === 0) {
      if (!reg.firstName.trim())
        errs.firstName = t('errors.fieldRequired') || 'Wymagane';
      if (!reg.lastName.trim())
        errs.lastName = t('errors.fieldRequired') || 'Wymagane';
      if (!reg.email.trim())
        errs.email = t('errors.emailNotEmpty') || 'Podaj email';
    }
    if (s === 1) {
      if (!reg.specialization.trim())
        errs.specialization = t('errors.fieldRequired') || 'Wymagane';
      if (!reg.facilityName.trim())
        errs.facilityName = t('errors.fieldRequired') || 'Wymagane';
      if (!reg.facilityCity.trim())
        errs.facilityCity = t('errors.fieldRequired') || 'Wymagane';
    }
    if (s === 2) {
      if (!reg.password.trim())
        errs.password = t('passwordNotEmpty') || 'Podaj hasło';
      if (reg.password !== reg.confirmPassword) {
        errs.confirmPassword =
          t('errors.passwordsMustMatch') || 'Hasła muszą się zgadzać';
      }
    }
    setRegErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const nextStep = () => {
    if (!validateStep(step)) return;
    setStep((s) => (s === 2 ? 2 : ((s + 1) as 0 | 1 | 2)));
  };

  const prevStep = () => setStep((s) => (s === 0 ? 0 : ((s - 1) as 0 | 1 | 2)));

  const submitRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(2)) return;
    console.log('Register payload:', reg);
    // Tu podłącz swój hook np. useRegister()
    setMode('onboarding');
    setStep(0);
    setReg(initialRegister);
    setRegErrors({});
  };

  // Render formularza kroków (moved to top-level component below)
  // Placeholder removed to avoid re-mounting on each render.

  return (
    <div className="bg-background h-screen p-8">
      <div className="flex h-full overflow-hidden rounded-xl bg-white shadow-2xl">
        <SplitImage />

        <div className="my-10 flex h-full w-full flex-col p-8 lg:w-1/2">
          {mode === 'login' ? (
            <div className="flex h-full w-full flex-col justify-between">
              {/* Header z logo */}
              <div className="mx-auto flex max-w-sm items-center gap-x-4">
                <img
                  src="/logo.svg"
                  alt="Logo"
                  className="h-16 w-16 object-cover"
                />
                <div className="text-primary-accent color text-3xl font-bold">
                  Remisio
                </div>
              </div>

              {/* Body */}
              <div className="flex w-full flex-col items-center justify-center">
                <span className="text-primary-accent mb-2 text-3xl font-bold">
                  {t('welcome')}
                </span>
                <span className="text-primary-accent mb-6">
                  {t('subtitle')}
                </span>

                <form
                  className="flex w-full flex-col gap-4 xl:px-20 2xl:px-50"
                  onSubmit={handleLoginSubmit}
                >
                  <InputField
                    id="login-email"
                    label={t('email')}
                    type="email"
                    placeholder={t('emailPlaceholder')}
                    value={userLogInInfo.email}
                    error={loginErrors.email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setUserLogInInfo({
                        ...userLogInInfo,
                        email: e.target.value,
                      });
                      if (loginErrors.email)
                        setLoginErrors((p) => ({ ...p, email: undefined }));
                    }}
                  />
                  <InputField
                    id="login-password"
                    label={t('password')}
                    type="password"
                    placeholder={t('passwordPlaceholder')}
                    value={userLogInInfo.password}
                    error={loginErrors.password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setUserLogInInfo({
                        ...userLogInInfo,
                        password: e.target.value,
                      });
                      if (loginErrors.password)
                        setLoginErrors((p) => ({ ...p, password: undefined }));
                    }}
                  />
                  <Button
                    className="font-bold"
                    type="submit"
                    isLoading={login.isPending}
                  >
                    {t('login')}
                  </Button>
                </form>

                <div className="mt-4 w-full text-right text-sm text-gray-600">
                  {t('no_account')}{' '}
                  <button
                    type="button"
                    className="text-primary hover:underline"
                    onClick={() => {
                      setMode('register');
                      setStep(0);
                    }}
                  >
                    {t('register')}
                  </button>
                </div>
              </div>

              <div />
            </div>
          ) : mode === 'register' ? (
            <RegisterStepContent
              t={t}
              step={step}
              reg={reg}
              regErrors={regErrors}
              setReg={setReg}
              setRegErrors={setRegErrors}
              prevStep={prevStep}
              nextStep={nextStep}
              onSubmit={submitRegister}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
