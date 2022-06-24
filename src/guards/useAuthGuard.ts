import { isLogged } from '@features/Auth/utils';
import { UseGuard } from '@shared/types/guard.type';

export const useAuthGuard: UseGuard = () => {
  return () => {
    if (!isLogged()) {
      return { authorized: false, navigateTo: '/auth/login' };
    }

    return { authorized: true };
  };
};
