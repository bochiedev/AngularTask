import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from '../services/main.service'
import { IUsers } from '../models/users'


@Component({
  selector: 'app-auth',
  templateUrl: './auth-detail.component.html',

})
export class AuthDetailComponent implements OnInit {


  // Declare Variables
  public slug: string;
  public user: IUsers[] = [];


  // My Forms
  userEditForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(6)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    title: new FormControl('', Validators.required)
  });


  constructor(private route: ActivatedRoute, private router: Router, private mainService: MainService) { }

  // INITIALIZATION FUNCTIONS

  // get users from local storage
  getUser(slug) {
    return this.mainService.getUser(slug);
  }

  ngOnInit() {

    // initialize initialization functions

    this.slug = this.route.snapshot.params['slug'];
    this.user = this.getUser(this.slug);


    // add user data to form values

    this.userEditForm.patchValue({
      username: this.user['username'],
      email: this.user['email'],
      title: this.user['title'],

    });


  }

  // OTHER FUNTIONS

  // Function after edit form is submitted

  onSubmitEdit() {
    let username = this.userEditForm.controls['username'].value;
    let email = this.userEditForm.controls['email'].value;
    let title = this.userEditForm.controls['title'].value;
    let slug = this.slug;
    let _user = [];
    _user.push({ username: username, email: email, title: title, slug: slug });

    this.mainService.updateUser(_user);
    this.router.navigate(['/auth']);
  }


}
