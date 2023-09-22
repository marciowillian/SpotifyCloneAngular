import { CanActivateFn } from '@angular/router';

export const autenticadoGuard: CanActivateFn = (route, state) => {
  return true;
};
