import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../shared/guards/auth-guard.service';
import { MainService } from '../services/main.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public users = [];

  constructor(private mainService: MainService) { }

  ngOnInit() {
    this.mainService.getUsersJson().subscribe(
      data =>{
        this.users = data['users'];
    });
  }

}
