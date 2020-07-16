import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { Shell } from '@app/shell/shell.service';

const routes: Routes = [
  Shell.childRoutes([
    { path: 'about', loadChildren: () => import('./about/about.module').then(m => m.AboutModule) },
    { path: 'flats', loadChildren: () => import('./flat/flat.module').then(m => m.FlatModule) },
    // { path: 'tenants', loadChildren: () => import('./about/about.module').then(m => m.AboutModule) }, // TODO: ->
    // create tenant component/module & service, change import(' !! ').then(m => m. !! )
  ]),
  // Fallback when no prior route is matched
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
