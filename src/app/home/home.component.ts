import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../shared/guards/auth-guard.service';
import { MainService } from '../services/main.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // Declare Variables

  public users : any[];

  constructor(private mainService: MainService) { }

  ngOnInit() {

    // get users from JSON FILE
    this.mainService.getUsersJson().subscribe(
      data =>{
        this.users = data['users'];
    });

  }

}
