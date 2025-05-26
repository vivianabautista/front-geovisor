import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
    // { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },// lazingModule
    // { path: 'about', loadChildren: () => import('./pages/about/about.module').then(m => m.AboutModule) },
    { path: '', loadComponent: () => import('./form/form.module').then(m => m.FormModule) },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
