import { Component, OnInit } from '@angular/core';
import { ProductoService, Producto } from '../../../services/producto.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CambiarImagenComponent } from '../../../components/cambiar-imagen/cambiar-imagen.component';
import Swal from 'sweetalert2';

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

  constructor(private productoService: ProductoService, private router: Router) { }

  ngOnInit(): void {
    this.productoService.getProductos().subscribe({
      next: (productos) => {
        this.productos = productos;
        //Setear imagenes
        this.productos.forEach(producto => {
          producto.imagen = this.getImagenUrl(producto.id);
        });
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Error al cargar los productos';
        console.error(error);
        this.loading = false;
      }
    });
  }

  recargarProductos() {
    this.loading = true; // Muestra el spinner de carga
    this.productoService.getProductos().subscribe({
      next: (productos) => {
        this.productos = productos;
        this.loading = false; // Oculta el spinner de carga
      },
      error: (error) => {
        this.errorMessage = 'Error al cargar los productos';
        console.error(error);
        this.loading = false; // Oculta el spinner de carga
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

  // eliminar confirmando con SweetAlert2

  eliminarProducto(id: number): void {

    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.productoService.eliminarProducto(id).subscribe({
          next: () => {
            this.productos = this.productos.filter((producto) => producto.id !== id);
            Swal.fire('Eliminado!', 'El producto ha sido eliminado.', 'success');
          },
          error: (err) => {
            console.error('Error al eliminar el producto', err);
            // Mostrar un mensaje de error
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: err.error.mensaje
            });
          },
        });
      }
    });
  }




  productoSeleccionadoId: number | null = null;
  mostrarModalImagen = false;

  mostrarFormularioImagen(productoId: number) {
    this.productoSeleccionadoId = productoId;
    this.mostrarModalImagen = true;
  }

  cacheBuster: number = Date.now();

  cerrarModalImagen() {
    this.mostrarModalImagen = false;
    this.cacheBuster = Date.now(); // 🔄 fuerza recarga del <img>
    //recargar por router
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/inicio/productos']);
    });
  }

  timestamp = new Date().getTime(); // Para evitar caché

  imgAttempts = new WeakMap<HTMLImageElement, number>();

  imgError(event: Event) {
    const target = event.target as HTMLImageElement;
    const attempts = this.imgAttempts.get(target) ?? 0;

    if (attempts < 1) {
      this.imgAttempts.set(target, attempts + 1);
      target.src = 'assets/images/not-found.png';
    } else {
      console.warn('Falló carga de imagen y su respaldo:', target.src);
    }
  }

  getImagenUrl(productoId: number): string {
    return `https://localhost:44356/uploads/${productoId}.png?nocache=${this.cacheBuster}`;
  }
}
