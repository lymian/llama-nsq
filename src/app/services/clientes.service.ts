import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Cliente {
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
}

@Injectable({
  providedIn: 'root'
})

export class ClientesService {

  private apiUrl = 'https://localhost:44356/kirbbo/clientes';

  constructor(private http: HttpClient) { }

  //https://localhost:44356/kirbbo/clientes/listar

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.apiUrl}/listar`);
  }
  //https://localhost:44356/kirbbo/clientes/detalles/1
  getClientePorId(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/detalles/${id}`);
  }

}
