import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userLogged = this.authService.getUserLogged();

  userName: any;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.userLogged.forEach(p => {
      this.userName = p?.displayName;
    });
    
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["login"]);
  }

}