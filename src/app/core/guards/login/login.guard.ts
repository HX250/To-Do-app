import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { inject } from '@angular/core';
import { map } from 'rxjs';

export const loginGuard: CanActivateFn = (route, state) => {
  const authServ = inject(AuthService);
  const router = inject(Router);

  return authServ.userIdState$.pipe(
    map((token) => {
      if (token) {
        router.navigateByUrl('/todo');
        return false;
      } else {
        return true;
      }
    }),
  );
};
