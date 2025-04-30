import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Categoria {
  id: number;
  nombre: string;
}

export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
  descuento: number;
  estado: boolean;
  categoria: Categoria;
}

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private apiUrl = 'https://localhost:7161/kirbbo/productos';
  private categoriasUrl = 'https://localhost:7161/kirbbo/categorias';

  constructor(private http: HttpClient) { }

  // Método para obtener todos los productos
  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  // Método para obtener un producto por ID
  getProductoPorId(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/${id}`);
  }

  // Método para guardar un nuevo producto
  guardarProducto(producto: { nombre: string, precio: number, stock: number, descuento: number, categoriaId: number }): Observable<Producto> {
    return this.http.post<Producto>(`${this.apiUrl}/guardar`, producto);
  }

  // Método para obtener todas las categorías
  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.categoriasUrl);
  }
  actualizarProducto(id: number, producto: {
    nombre: string,
    precio: number,
    stock: number,
    descuento: number,
    categoriaId: number
  }): Observable<any> {
    return this.http.put(`${this.apiUrl}/actualizar/${id}`, producto);
  }
  // Método para alternar el estado de un producto
  alternarEstadoProducto(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/estado/${id}`, null);
  }
  // Método para eliminar un producto por ID
  eliminarProducto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/eliminar/${id}`);
  }
}
