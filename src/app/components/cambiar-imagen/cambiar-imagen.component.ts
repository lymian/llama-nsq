import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ImagenService } from '../../services/imagen.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cambiar-imagen',
  imports: [CommonModule],
  templateUrl: './cambiar-imagen.component.html',
  styleUrl: './cambiar-imagen.component.css'
})
export class CambiarImagenComponent {
  @Input() productoId!: number;
  @Input() visible = false;
  @Output() onCerrar = new EventEmitter<void>();

  imagenSeleccionada: File | null = null;
  cargando = false;
  mensaje = '';

  constructor(private imagenService: ImagenService) { }

  seleccionarArchivo(event: any): void {
    this.imagenSeleccionada = event.target.files[0];
  }

  subirImagen(): void {
    if (!this.imagenSeleccionada || !this.productoId) return;

    this.cargando = true;
    this.imagenService.subirImagen(this.imagenSeleccionada, this.productoId).subscribe({
      next: () => {
        this.mensaje = 'Imagen subida correctamente';
        this.cargando = false;
      },
      error: () => {
        this.mensaje = 'Error al subir imagen';
        this.cargando = false;
      }
    });
  }

  cerrar(): void {
    this.onCerrar.emit();
  }
}