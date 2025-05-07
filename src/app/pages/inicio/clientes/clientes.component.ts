import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientesService, Cliente } from '../../../services/clientes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clientes',
  imports: [CommonModule],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent {
  clientes: Cliente[] = [];
  loading = true;
  errorMessage: string | null = null;

  constructor(private clientesService: ClientesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes() {
    this.clientesService.getClientes().subscribe({
      next: (clientes) => {
        this.clientes = clientes;
        this.loading = false;
        console.log(clientes);
      },
      error: (error) => {
        this.errorMessage = 'Error al cargar los clientes';
        console.error(error);
        this.loading = false;
      }
    });
  }
  verCliente(id: number) {
    // lógica para ir a detalles o cargar info
    console.log('Ver cliente', id);
    this.router.navigate(['/inicio/clientes/pedidos', id]);

  }

}
