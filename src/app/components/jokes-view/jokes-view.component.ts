
import { Component, OnInit } from '@angular/core';
import { GetJokesService } from './services/get-jokes.service';
import { Joke } from './joke';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-jokes-view',
  templateUrl: './jokes-view.component.html',
  styleUrls: ['./jokes-view.component.scss']
})
export class JokesViewComponent implements OnInit {
  jokesList: Joke[] = [];
  favouriteJokeList: Joke[] = [];

  constructor(private jokeService: GetJokesService, private snackBar: MatSnackBar) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.jokeService.getJokes(10)
      .subscribe((jokes: Joke[]) => {
        this.jokesList = jokes;
      });

  }
  /**
   * Used to Add/Remove the joke from Favourite list
   * @param  {Joke} selectedJoke : Selected Joke
   * @returns void
   */
  jokeSelected = (selectedJoke: Joke): void => {
    let message: string = '';
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

}
