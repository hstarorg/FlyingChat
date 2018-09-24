import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent, SessionLayoutComponent, ContactLayoutComponent } from './pages';

const routes: Routes = [
  { path: '', redirectTo: 'session', pathMatch: 'full' },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'session', component: SessionLayoutComponent },
      { path: 'contact', component: ContactLayoutComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
