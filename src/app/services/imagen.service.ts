import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {

  private apiUrl = 'https://localhost:44356/kirbbo/imagen';

  constructor(private http: HttpClient) { }

  subirImagen(imagen: File, productoId: number): Observable<{ url: string }> {
    const formData = new FormData();
    formData.append('imagen', imagen);

    const params = new HttpParams().set('productoId', productoId);

    return this.http.post<{ url: string }>(
      `${this.apiUrl}/subir-imagen`,
      formData,
      { params }
    );
  }
}
