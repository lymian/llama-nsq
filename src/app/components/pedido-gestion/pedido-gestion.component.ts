import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidoService, Pedido, DetallePedido } from '../../services/pedido.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pedido-gestion',
  imports: [CommonModule],
  templateUrl: './pedido-gestion.component.html',
  styleUrl: './pedido-gestion.component.css'
})
export class PedidoGestionComponent {

  pedido: Pedido | null = null;
  detalles: DetallePedido[] = [];
  loading = true;
  errorMessage: string | null = null;

  constructor(private pedidoService: PedidoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = Number(window.location.pathname.split('/').pop());
    this.obtenerPedido(id);
  }

  obtenerPedido(id: number): void {
    this.pedidoService.getPedidoPorId(id).subscribe({
      next: (pedido) => {
        this.pedido = pedido;
        this.detalles = pedido.detalles;
        this.loading = false;
        console.log('Pedido:', this.pedido);
      },
      error: (error) => {
        this.errorMessage = 'Error al cargar el pedido';
        console.error(error);
        this.loading = false;
      }
    });
  }
  finalizarPedido(): void {
    //swal
    Swal.fire({
      title: '¿Está seguro?',
      text: "No podrás revertir esta acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, finalizar pedido'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('Finalizando pedido...');
        if (this.pedido) {
          this.pedidoService.actualizarEstado(this.pedido.boletaId, 1).subscribe({
            next: () => {
              Swal.fire(
                'Finalizado!',
                'El pedido ha sido finalizado.',
                'success'
              );
              this.ngOnInit(); // Recargar el pedido
            },
            error: (error) => {
              console.error('Error al finalizar el pedido:', error);
              Swal.fire(
                'Error!',
                'No se pudo finalizar el pedido.',
                'error'
              );
            }
          });
        } else {
          console.error('Pedido no encontrado');
          Swal.fire(
            'Error!',
            'No se pudo encontrar el pedido.',
            'error'
          );
        }
      }
    });
  }
  volver(): void {
    this.router.navigate(['/inicio/pedidos']);
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

}
