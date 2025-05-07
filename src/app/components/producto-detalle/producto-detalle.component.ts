import { Component, OnInit } from '@angular/core';
import { Producto, ProductoService } from '../../services/producto.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-producto-detalle',
  imports: [CommonModule, RouterModule],
  templateUrl: './producto-detalle.component.html',
  styleUrl: './producto-detalle.component.css'
})
export class ProductoDetalleComponent implements OnInit {

  producto: Producto | null = null;
  loading = true;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService
  ) { }

  ngOnInit(): void {
    // Obtener el ID del producto desde la URL
    const id = Number(this.route.snapshot.paramMap.get('id'));

    // Llamar al servicio para obtener el producto por su ID
    this.productoService.getProductoPorId(id).subscribe({
      next: (producto) => {
        this.producto = producto;
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Error al cargar el producto';
        console.error(error);
        this.loading = false;
      }
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
}