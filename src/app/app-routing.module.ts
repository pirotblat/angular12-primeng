import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { BootstrapSampleComponent } from './bootstrap-sample/bootstrap-sample.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { FlexSampleComponent } from './flex-sample/flex-sample.component';
import { FormComponent } from './form/form.component';
import { HomeComponent } from './home/home.component';
import { PrimengTableComponent } from './primeng-table/primeng-table.component';
import { AuthGuard } from './services/auth-guard.service';
import { TableEditComponent } from './table-edit/table-edit.component';
import { TableFrozenComponent } from './table-frozen/table-frozen.component';
import { TableComponent } from './table/table.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'primeng-table', component: PrimengTableComponent, canActivate: [AuthGuard] },
  // { path: 'home', loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule) },
  // { path: 'shopping-list', loadChildren: () => import('./shopping-list/shopping-list.module').then(m => m.ShoppingListModule) },
  { path: 'flex', component: FlexSampleComponent },
  { path: 'bootstrap', component: BootstrapSampleComponent },
  { path: 'form', component: FormComponent },
  { path: 'table', component: TableComponent },
  { path: 'table-edit', component: TableEditComponent },
  { path: 'table-frozen', component: TableFrozenComponent },
  // { path: 'pipe', component: PipeComponent },
  // { path: 'http-post', component: HttpComponent },
  // { path: 'animate', component: AnimateComponent },
  // { path: 'cenes500', component: Cenes500Component },
  // { path: 'bootstrap', component: HomeComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found!'} },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
