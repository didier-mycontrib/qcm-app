import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";

export const authGuard: CanActivateFn = (route, state) => {
  const platform = inject(PLATFORM_ID);
  const router = inject(Router);

  let token : string | null = null;
  if (isPlatformBrowser(platform)) {
    token = sessionStorage.getItem('access_token');
  }
  
  if (token != "")
    return true;
  else
    //return false;
    return router.parseUrl('/ngr-not-authorized');
};