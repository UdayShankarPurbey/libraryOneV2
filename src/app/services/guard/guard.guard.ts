import { CanActivateFn } from '@angular/router';

export const guardGuard: CanActivateFn = (route, state) => {
  console.log(route, state);
  if(sessionStorage.getItem('login') == '12346') {
    return true;
  } else {
    return false;
  }
};
