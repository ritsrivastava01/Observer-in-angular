import { Joke } from '../joke';
import { Component, OnInit, Input } from '@angular/core';
import { GetJokesService } from '../services/get-jokes.service';
import { ManageFavService } from '../services/manage-fav.service';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-jokes-list',
  templateUrl: './jokes-list.component.html',
  styleUrls: ['./jokes-list.component.scss'],
})
export class JokesListComponent implements OnInit {
  jokes: Joke[];
  @Input() isFavouriteTab: boolean;
  constructor(private jokeServive: GetJokesService, private manageFavService: ManageFavService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.jokeServive.getJokes(10)
      .subscribe(jokes => {
        this.jokes = jokes;
      });

  }
  onManageFavourite = (joke: Joke) => {
    let message = '';
    this.manageFavService.manageFavourite(joke);
    if (joke.isFavourite) {
      message = 'Joke added in your favourite list successfully';
    } else {
      message = 'Joke removed in your favourite list successfully';
    }
    this.snackBar.open(message, null, {
      duration: 1000,
    });
  }

}
