import { Injectable } from '@angular/core';
import { CanActivate, Router,
         ActivatedRouteSnapshot,
         RouterStateSnapshot } from '@angular/router';
import { LoginService } from './signin/credentials.service';

@Injectable()
export class LoggedInGuard implements CanActivate {
	
  constructor(
    private loginService: LoginService,
    private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(this.loginService.isLoggedIn()) {
    	return true;
    }

    // Navigate to the login page
    this.router.navigate(['authentication/signin']);
    return false;
  }
}