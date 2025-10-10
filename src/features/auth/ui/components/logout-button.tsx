import { useAuthMutations } from '@/features/auth/hooks/useAuthMutations';
import { useTranslation } from 'react-i18next';
import { BiLogOut } from 'react-icons/bi';

const LogoutButton = () => {
    const { t } = useTranslation();
    const { mutate: logout } = useAuthMutations().useLogout();

    const handleLogout = () => {
        logout();
    };

    return (
    <button
      onClick={handleLogout}
      className="text-primary-accent hover:text-primary-accent/80 transition-colors duration-200 flex items-center justify-center"
      title={t('logout')}
    >
      <BiLogOut className="size-8" />
    </button>
  );
};
export default LogoutButton;
