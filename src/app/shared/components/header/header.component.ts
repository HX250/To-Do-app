import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private auth: AuthService) {}
  isLoggedIn = '';

  ngOnInit(): void {
    this.auth.userIdState$.subscribe((Response) => {
      this.isLoggedIn = Response;
    });
  }

  logout() {
    this.auth.logout();
  }
}
