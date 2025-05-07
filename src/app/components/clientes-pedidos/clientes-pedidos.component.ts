import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PedidoService, Pedido, DetallePedido } from '../../services/pedido.service';

@Component({
  selector: 'app-clientes-pedidos',
  imports: [CommonModule],
  templateUrl: './clientes-pedidos.component.html',
  styleUrl: './clientes-pedidos.component.css'
})
export class ClientesPedidosComponent {
  pedidos: Pedido[] = [];
  loading = true;
  errorMessage: string | null = null;
  clienteId: number = 0; // ID del cliente que se pasa desde la ruta

  constructor(private pedidoService: PedidoService, private router: Router) { }

  ngOnInit(): void {
    this.clienteId = Number(this.router.url.split('/').pop()); // Obtener el ID del cliente de la URL
    this.cargarPedidos(this.clienteId);
  }

  cargarPedidos(clienteId: number) {
    this.pedidoService.getPedidosPorCliente(clienteId).subscribe({
      next: (pedidos) => {
        this.pedidos = pedidos;
        this.loading = false;
        console.log(pedidos);
      },
      error: (error) => {
        this.errorMessage = 'Error al cargar los pedidos';
        console.error(error);
        this.loading = false;
      }
    });
  }
  getNombreEstado(estado: number): string {
    switch (estado) {
      case 0: return 'Pendiente';
      case 1: return 'Completado';
      case 2: return 'Cancelado';
      default: return 'Desconocido';
    }
  }

  getClaseEstado(estado: number): string {
    switch (estado) {
      case 0: return 'bg-warning text-dark';
      case 1: return 'bg-success';
      case 2: return 'bg-danger';
      default: return 'bg-secondary';
    }
  }

  volver() {
    this.router.navigate(['/inicio/clientes']);
  }
}
