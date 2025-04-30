import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../../services/producto.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importar FormsModule para usar ngModel

@Component({
  selector: 'app-agregar-producto',
  imports: [CommonModule, FormsModule, RouterLink], // Importar CommonModule y FormsModule
  templateUrl: './agregar-producto.component.html',
  styleUrl: './agregar-producto.component.css'
})
export class AgregarProductoComponent implements OnInit {

  nombre: string = '';
  precio: number = 0;
  stock: number = 0;
  descuento: number = 0;
  categoriaId: number = 1;  // Suponemos que la categoría por defecto es 1

  errorMessage: string | null = null;
  successMessage: string | null = null;

  categorias: any[] = []; // Arreglo para almacenar las categorías

  constructor(private productoService: ProductoService, private router: Router) { }

  ngOnInit(): void {
    // Obtener las categorías cuando el componente se inicializa
    this.productoService.getCategorias().subscribe({
      next: (categorias) => {
        this.categorias = categorias; // Guardamos las categorías obtenidas
      },
      error: (error) => {
        this.errorMessage = 'Error al obtener las categorías';
        console.error(error);
      }
    });
  }

  // Método para agregar un producto
  agregarProducto() {
    const nuevoProducto = {
      nombre: this.nombre,
      precio: this.precio,
      stock: this.stock,
      descuento: this.descuento,
      categoriaId: this.categoriaId
    };

    this.productoService.guardarProducto(nuevoProducto).subscribe({
      next: (producto) => {
        this.successMessage = 'Producto guardado exitosamente';
        this.errorMessage = null;
        // Redirigir a la lista de productos
        this.router.navigate(['/inicio/productos']);
      },
      error: (error) => {
        this.errorMessage = 'Error al guardar el producto';
        this.successMessage = null;
        console.error(error);
      }
    });
  }
}