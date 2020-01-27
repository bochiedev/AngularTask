import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IUsers } from '../users';


@Injectable({
  providedIn: 'root'
})
export class MainService {

  private _url: string = "/assets/data/user-data.json";

  constructor(private http:HttpClient) {}


  getUsersJson(): Observable<IUsers[]>{
    return this.http.get<IUsers[]>(this._url);

  }

  getUsersLocalStorage(){
    let localStorageItem = JSON.parse(localStorage.getItem('Users'));
    return localStorageItem == null ? [] : localStorageItem.users;

  }

  registerUser(user){

    let localStorageUsers = this.getUsersLocalStorage();

    localStorageUsers.push(user[0]);
    this.setLocalStorage(localStorageUsers);

    return localStorageUsers

  }

  updateUser(user){


    return user

  }

  loggedIn(){
    return true
  }

  logOut(){
    localStorage.removeItem('token');
  }

  setLocalStorage(users){

    localStorage.setItem('Users', JSON.stringify({users: users}));

  }


}
