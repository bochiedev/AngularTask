import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IUsers } from '../models/users';


@Injectable({
  providedIn: 'root'
})
export class MainService {


  // declare variables

  private _url: string = "/assets/data/user-data.json";
  public user_list: any[] = this.getUsersLocalStorage();

  constructor(private http: HttpClient) { }

  // get users from Json file
  getUsersJson(): Observable<IUsers[]> {

    return this.http.get<IUsers[]>(this._url);

  }


  // get users from local storage
  getUsersLocalStorage() {

    let localStorageItem = JSON.parse(localStorage.getItem('Users'));
    return localStorageItem == null ? [] : localStorageItem.users;

  }

  // get specific user from local storage using slug
  getUser(slug: string) {

    return this.user_list.find(x => x.slug === slug);

  }


  // register a new user in local storage
  registerUser(user) {

    let localStorageUsers = this.getUsersLocalStorage();

    localStorageUsers.push(user[0]);
    this.setLocalStorage(localStorageUsers);

    return localStorageUsers

  }


  // update a user from local storage
  updateUser(user) {

    let _user = user[0];
    let item = this.user_list.find(x => x.slug === _user.slug );

    item['username'] = _user.username;
    item['email'] = _user.email;
    item['title'] = _user.title;

    this.setLocalStorage(this.user_list);

  }

  // save  user data to local storage
  setLocalStorage(users) {

    localStorage.setItem('Users', JSON.stringify({ users: users }));

  }

  // log in a user
  loggedIn() {
    return true
  }

  // log out a user
  logOut() {
    localStorage.removeItem('token');
  }


}
