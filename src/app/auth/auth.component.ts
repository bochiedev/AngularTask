import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MainService } from '../services/main.service'
import { SlugifyPipe } from '../shared/slugify.pipe';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  providers: [SlugifyPipe]
})
export class AuthComponent implements OnInit {

  public users = [];

  userRegister = new FormGroup({
    name : new FormControl(''),
    email : new FormControl(''),
    type : new FormControl('')
  });

  userLogin = new FormGroup({
    name : new FormControl(''),
    pass : new FormControl('')
  });

  constructor(private mainService: MainService, private slugifyPipe: SlugifyPipe) { }

  getUsers(){
    this.users = this.mainService.getUsersLocalStorage();
    return this.users

  }

  ngOnInit() {

      this.getUsers();

  }

  slugify(input: string){
      var your_new_slug = this.slugifyPipe.transform(input);
      return your_new_slug
  }

  onSubmit(){

    let name = this.userRegister.controls['name'].value;
    let email = this.userRegister.controls['email'].value;
    let type = this.userRegister.controls['type'].value;
    let slug = this.slugify(name);
    let user = []
    user.push({name:name, email:email, type:type, slug:slug})

    this.mainService.registerUser(user);

    this.getUsers();
  }

}
