import { Component, OnInit } from '@angular/core';
import { GetJokesService } from './services/get-jokes.service';
import { Joke } from './joke';
import { MatSnackBar } from '@angular/material';
import { ManageFavService } from './services/manage-fav.service';


@Component({
  selector: 'app-jokes-view',
  templateUrl: './jokes-view.component.html',
  styleUrls: ['./jokes-view.component.scss']
})
export class JokesViewComponent implements OnInit {
  jokesList: Joke[] = [];
  favouriteJokeList: Joke[] = [];

  constructor(private jokeService: GetJokesService, private snackBar: MatSnackBar, private manageFavService: ManageFavService) { }

  ngOnInit() {
    this.jokeService.getJokes(10)
      .subscribe(jokes => {
        this.jokesList = jokes;
      });
        //this.manageFavService.getSavedFavourite()
        
  }
  jokeSelected = (selectedJoke: Joke): void => {
    let message = '';
    if (selectedJoke.isFavourite) {
      this.favouriteJokeList = [...this.favouriteJokeList, selectedJoke];
      message = 'Joke added in your favourite list successfully';
    } else {
      const elementIndex: number = this.favouriteJokeList.indexOf(selectedJoke, 0);
      this.favouriteJokeList.splice(elementIndex, 1);
      message = 'Joke removed from your favourite list successfully.';
    }
    this.snackBar.open(message, null, {
      duration: 1000,
    });
  }
  matChange(evt) {
    console.log(evt);
  }
}
