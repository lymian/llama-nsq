import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, RolResponse } from '../../../services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;
  rol: RolResponse | null = null;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    const { username, password } = this.loginForm.value;

    this.authService.login(username, password).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('username', username);

        this.authService.obtenerRol().subscribe((rolResponse) => {
          if (rolResponse.rol === "CLIENTE") {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No tienes permisos para acceder a esta aplicación.',
              confirmButtonText: 'Aceptar',
            });
            localStorage.clear();
            console.log('No tienes permisos para acceder a esta aplicación.');
            return;
          }

          this.errorMessage = null;
          this.router.navigate(['/inicio']); // ✅ Solo si el rol es válido
        });
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Credenciales inválidas',
          confirmButtonText: 'Aceptar',
        });
        console.error(error);
      }
    });
  }

}