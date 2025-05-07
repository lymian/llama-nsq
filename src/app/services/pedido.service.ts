import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Pedido {
  boletaId: number;
  nombreCliente: string;
  apellidoCliente: string;
  fechaEmision: string;
  total: number;
  detalles: DetallePedido[];
  estado: number;
  direccion: string;
}

export interface DetallePedido {
  nombreProducto: string;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
}

export interface ActualizarEstadoRequest {
  estado: number;
}

@Injectable({
  providedIn: 'root'
})

export class PedidoService {

  constructor(private http: HttpClient) { }

  //ruta principal: https://localhost:44356/kirbbo/compra/pedidos
  private apiUrl = 'https://localhost:44356/kirbbo/compra/pedidos';

  //obtener pedidos por estado https://localhost:44356/kirbbo/compra/pedidos/{int estado}
  getPedidosPorEstado(estado: number): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.apiUrl}/${estado}`);
  }
  //Obtenemos el pedido por su ID https://localhost:44356/kirbbo/compra/pedidos/detalles/{int boletaId}
  getPedidoPorId(boletaId: number): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.apiUrl}/detalle/${boletaId}`);
  }
  //Metodo put para actualizar el estado de un pedido https://localhost:44356/pedidos/actualizar-estado/{int boletaId}
  actualizarEstado(boletaId: number, estado: number): Observable<any> {
    const url = `${this.apiUrl}/actualizar-estado/${boletaId}`;
    const body: ActualizarEstadoRequest = { estado };
    return this.http.put(url, body);
  }
  //https://localhost:44356/kirbbo/compra/pedidos/cliente/1
  getPedidosPorCliente(clienteId: number): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.apiUrl}/cliente/${clienteId}`);
  }
}
