
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JokeCardComponent } from './joke-card/joke-card.component';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule, MatButtonModule, MatIconModule,MatProgressSpinnerModule,
         MatTooltipModule, MatSlideToggleModule, MatSnackBarModule, MatTabsModule } from '@angular/material';
import { JokesListComponent } from './joke-list/jokes-list.component';
import { JokesViewComponent } from './jokes-view.component';

@NgModule({
  declarations: [
    JokeCardComponent,
    JokesListComponent,
    JokesViewComponent
  ],
  exports: [
    JokesViewComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ]
})

export class JokesViewModule { }
