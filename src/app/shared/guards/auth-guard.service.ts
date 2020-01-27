import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild } from '@angular/router';
import { MainService } from '../../services/main.service'



@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private mainService: MainService) {}

  status: boolean;

  canActivate() {

    this.status = this.mainService.loggedIn();
    return this.status;
  }

  canActivateChild() {
    console.log('checking child route access');
    return true;
  }

}
