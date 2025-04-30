import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../../../../services/producto.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-editar-producto',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './editar-producto.component.html',
  styleUrl: './editar-producto.component.css'
})
export class EditarProductoComponent implements OnInit {
  productoId!: number;
  productoForm = {
    nombre: '',
    precio: 0,
    stock: 0,
    descuento: 0,
    categoriaId: 0
  };
  categorias: any[] = [];
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.productoId = +this.route.snapshot.paramMap.get('id')!;
    this.cargarProducto();
    this.cargarCategorias();
  }

  cargarProducto() {
    this.productoService.getProductoPorId(this.productoId).subscribe({
      next: (producto) => {
        this.productoForm = {
          nombre: producto.nombre,
          precio: producto.precio,
          stock: producto.stock,
          descuento: producto.descuento,
          categoriaId: producto.categoria.id
        };
      },
      error: (err) => {
        this.errorMessage = 'Error al cargar producto';
      }
    });
  }

  cargarCategorias() {
    this.productoService.getCategorias().subscribe({
      next: (cats) => this.categorias = cats,
      error: () => this.errorMessage = 'Error al cargar categorías'
    });
  }

  actualizarProducto() {
    this.productoService.actualizarProducto(this.productoId, this.productoForm).subscribe({
      next: () => this.router.navigate(['/inicio/productos']),
      error: () => this.errorMessage = 'Error al actualizar producto'
    });
  }
}