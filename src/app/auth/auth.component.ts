import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MainService } from '../services/main.service'
import { SlugifyPipe } from '../shared/slugify.pipe';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  providers: [SlugifyPipe]
})
export class AuthComponent implements OnInit {

  // Declare Variables
  public users: any[];

  // My Forms
  userRegisterForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(6)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    title: new FormControl('', Validators.required)
  });


  constructor(private mainService: MainService, private slugifyPipe: SlugifyPipe) { }

  // INITIALIZATION FUNCTIONS

  // get users from local storage
  getUsers() {
    this.users = this.mainService.getUsersLocalStorage();
    return this.users

  }

  ngOnInit() {

    // initialize initialization functions
    this.getUsers();

  }

  // OTHER FUNTIONS

  // Function to create url friendly slugs
  slugify(input: string) {
    var your_new_slug = this.slugifyPipe.transform(input);
    return your_new_slug
  }


  // Function after registration form is submitted
  onSubmit() {
    let username = this.userRegisterForm.controls['username'].value;
    let email = this.userRegisterForm.controls['email'].value;
    let title = this.userRegisterForm.controls['title'].value;
    let slug = this.slugify(username);
    let user = [];

    if (this.userRegisterForm.invalid || title === '') {
      return;

    } else {

      user.push({ username: username, email: email, title: title, slug: slug })
      this.mainService.registerUser(user);
      this.userRegisterForm.reset();

      // get new users list
      this.getUsers();
    }

  }

}
