import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'
import { ActivatedRoute } from '@angular/router';
import { MainService } from '../services/main.service'


@Component({
  selector: 'app-auth',
  templateUrl: './auth-detail.component.html',

})
export class AuthDetailComponent implements OnInit {

  public slug: string;
  public user;


  constructor(private route: ActivatedRoute, private mainService: MainService) { }

  userEditForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    type: new FormControl('')
  });


  getUsers() {
    return this.mainService.getUsersLocalStorage();
  }

  ngOnInit() {

    let users = this.getUsers();
    this.slug = this.route.snapshot.params['slug'];
    this.user = users.find(slug => slug.slug === this.slug);


  }

  onSubmitEdit() {
    let name = this.userEditForm.controls['name'].value;
    let email = this.userEditForm.controls['email'].value;
    let type = this.userEditForm.controls['type'].value;
    let slug = this.slug;
    let user = [];
    user.push({ name: name, email: email, type: type, slug: slug });

    this.mainService.updateUser(user);


  }
}
