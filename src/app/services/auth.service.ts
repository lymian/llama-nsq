import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
  // Puedes agregar más campos si tu backend devuelve más info (ej. roles, expiración, etc.)
}

export interface RolResponse {
  rol: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:44356/kirbbo/auth/login';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<LoginResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'accept': '*/*'
    });

    const body: LoginRequest = { username, password };

    return this.http.post<LoginResponse>(this.apiUrl, body, { headers });
  }
  //obtener rol https://localhost:7161/kirbbo/auth/rol
  obtenerRol(): Observable<RolResponse> {
    return this.http.get<RolResponse>(`https://localhost:44356/kirbbo/auth/rol`);
  }

}
