
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JokesViewComponent } from './components/jokes-view/jokes-view.component';

const routes: Routes = [
  {
    path: 'jokes',
    component: JokesViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
