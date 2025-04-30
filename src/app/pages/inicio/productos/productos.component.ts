import { Component, OnInit } from '@angular/core';
import { ProductoService, Producto } from '../../../services/producto.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CambiarImagenComponent } from '../../../components/cambiar-imagen/cambiar-imagen.component';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
  imports: [CommonModule, RouterModule, CambiarImagenComponent],
})
export class ProductosComponent implements OnInit {

  productos: Producto[] = [];
  loading = true;
  errorMessage: string | null = null;

  constructor(private productoService: ProductoService) { }

  ngOnInit(): void {
    this.productoService.getProductos().subscribe({
      next: (productos) => {
        this.productos = productos;
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Error al cargar los productos';
        console.error(error);
        this.loading = false;
      }
    });
  }
  alternarEstado(producto: Producto) {
    this.productoService.alternarEstadoProducto(producto.id).subscribe({
      next: () => {
        // Actualiza el estado localmente sin recargar todo
        producto.estado = !producto.estado;
      },
      error: (err) => {
        console.error('Error al alternar estado', err);
      }
    });
  }
  eliminarProducto(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.productoService.eliminarProducto(id).subscribe({
        next: () => {
          this.productos = this.productos.filter(p => p.id !== id);
        },
        error: (err) => {
          console.error('Error al eliminar el producto', err);
          this.errorMessage = 'No se pudo eliminar el producto.';
        }
      });
    }
  }
  productoSeleccionadoId: number | null = null;
  mostrarModalImagen = false;

  mostrarFormularioImagen(productoId: number) {
    this.productoSeleccionadoId = productoId;
    this.mostrarModalImagen = true;
  }

  cacheBuster = Date.now(); // valor inicial

  cerrarModalImagen() {
    this.mostrarModalImagen = false;
    this.cacheBuster = Date.now(); // fuerza recarga de imagen
    this.ngOnInit();
  }
}
