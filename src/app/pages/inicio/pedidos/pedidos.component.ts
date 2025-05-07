import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidoService, Pedido, DetallePedido } from '../../../services/pedido.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pedidos',
  imports: [CommonModule],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css'
})
export class PedidosComponent {

  pedidos: Pedido[] = [];
  loading = true;
  errorMessage: string | null = null;
  titulo: string = 'Pedidos Pendientes';
  estado: number = 0;

  constructor(
    private pedidoService: PedidoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.obtenerPedidos(this.estado);
  }

  obtenerPedidos(estado: number): void {
    this.pedidoService.getPedidosPorEstado(estado).subscribe({
      next: (pedidos) => {
        this.pedidos = pedidos;
        this.loading = false;
        console.log('Pedidos:', this.pedidos);
      },
      error: (error) => {
        this.errorMessage = 'Error al cargar los pedidos';
        console.error(error);
        this.loading = false;
      }
    });
  }

  getClaseEstado(estado: number): string {
    switch (estado) {
      case 0:
        return 'status-pendiente';
      case 1:
        return 'status-completado';
      case 2:
        return 'status-cancelado';
      default:
        return 'status-desconocido';
    }
  }

  getNombreEstado(estado: number): string {
    switch (estado) {
      case 0:
        return 'Pendiente';
      case 1:
        return 'Completado';
      case 2:
        return 'Cancelado';
      default:
        return 'Desconocido';
    }
  }
  filtraEstado(estado: number): void {
    this.estado = estado;
    this.titulo = this.titulosEstado(estado);
    this.obtenerPedidos(estado);
  }
  titulosEstado(estado: number): string {
    switch (estado) {
      case 0:
        return 'Pedidos Pendientes';
      case 1:
        return 'Pedidos Completados';
      case 2:
        return 'Pedidos Cancelados';
      default:
        return 'Pedidos Desconocidos';
    }
  }

  verDetalles(id: number): void {
    // Aquí puedes implementar la lógica para ver los detalles del pedido
    console.log('Ver detalles del pedido con ID:', id);
    // Por ejemplo, redirigir a una página de detalles del pedido
    this.router.navigate(['/inicio/pedidos/gestion', id]);
  }
}
