import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ProductosComponent } from './pages/inicio/productos/productos.component';
import { ProductoDetalleComponent } from './pages/inicio/producto-detalle/producto-detalle.component';
import { AgregarProductoComponent } from './pages/inicio/agregar-producto/agregar-producto.component';
import { EditarProductoComponent } from './pages/inicio/productos/editar-producto/editar-producto.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    {
        path: 'inicio',
        component: InicioComponent,
        children: [
            { path: '', redirectTo: 'productos', pathMatch: 'full' },
            { path: 'productos', component: ProductosComponent },
            { path: 'productos/:id', component: ProductoDetalleComponent },
            { path: 'agregar-producto', component: AgregarProductoComponent },  // Ruta para agregar producto
            { path: 'productos/editar/:id', component: EditarProductoComponent }
        ]
    }
];
