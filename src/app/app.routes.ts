import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ProductosComponent } from './pages/inicio/productos/productos.component';
import { ProductoDetalleComponent } from './components/producto-detalle/producto-detalle.component';
import { AgregarProductoComponent } from './components/agregar-producto/agregar-producto.component';
import { EditarProductoComponent } from './components/editar-producto/editar-producto.component';
import { PedidosComponent } from './pages/inicio/pedidos/pedidos.component';
import { PedidoGestionComponent } from './components/pedido-gestion/pedido-gestion.component';
import { ClientesComponent } from './pages/inicio/clientes/clientes.component';
import { ClientesPedidosComponent } from './components/clientes-pedidos/clientes-pedidos.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    {
        path: 'inicio',
        component: InicioComponent,
        children: [
            { path: '', redirectTo: 'productos', pathMatch: 'full' },
            //Productos
            { path: 'productos', component: ProductosComponent },
            { path: 'productos/agregar-producto', component: AgregarProductoComponent },
            { path: 'productos/detalles/:id', component: ProductoDetalleComponent },
            { path: 'productos/editar/:id', component: EditarProductoComponent },
            //Pedidos
            { path: 'pedidos', component: PedidosComponent },
            { path: 'pedidos/gestion/:id', component: PedidoGestionComponent },
            //Clientes
            { path: 'clientes', component: ClientesComponent },
            { path: 'clientes/pedidos/:id', component: ClientesPedidosComponent },
        ]
    }
];
