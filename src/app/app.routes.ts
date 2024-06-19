import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';


import { NotFoundComponent } from './shared/not-found/not-found.component';
import { HomeComponent } from './shared/home/home.component';
import { ContactoComponent } from './shared/contacto/contacto.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TopComponent } from './shared/top/top.component';

export const routes: Routes = [
    { path: '', redirectTo: '/Home', pathMatch: 'full'},
    { path: 'Home', component: HomeComponent },
    { path: 'Top 10', component: TopComponent},
    { path: 'Contacto', component: ContactoComponent },
    { path: '404 Not Found', component: NotFoundComponent },
    { path: '**', redirectTo: '/404 Not Found'},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports:[RouterModule],
})

export class AppRoutingModule{}