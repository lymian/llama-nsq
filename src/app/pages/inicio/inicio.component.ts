import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-inicio',
  imports: [ RouterModule ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  username: string | null = null;

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
