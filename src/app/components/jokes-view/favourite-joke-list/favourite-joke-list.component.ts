
import { Component, OnInit } from '@angular/core';
import { Joke } from '../joke';
import { interval, Subject } from 'rxjs';
import { ManageFavService } from '../services/manage-fav.service';
import { MatSlideToggleChange, MatSnackBar } from '@angular/material';
import { GetSingleJokeService } from './get-single-joke.service';
import { takeWhile } from 'rxjs/operators';
const NO_OF_AUTO_JOKES = 10;
@Component({
  selector: 'app-favourite-joke-list',
  templateUrl: './favourite-joke-list.component.html',
  styleUrls: ['./favourite-joke-list.component.scss'],
  providers: [GetSingleJokeService]
})

export class FavouriteJokeListComponent implements OnInit {

  private NeedToGetJokeAutomatic = new Subject<boolean>();
  private getJoke = false;
  public favouriteJokes: Array<Joke>;

  constructor(private manageFavService: ManageFavService,
    private getSingleJokeService: GetSingleJokeService,
    private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.manageFavService.favouriteJokes$
      .subscribe(record => this.favouriteJokes = record);

    this.NeedToGetJokeAutomatic.subscribe(value => {
      this.getJoke = value;
      interval(5000)
        .pipe(
          takeWhile(() => this.getJoke && this.favouriteJokes.length < NO_OF_AUTO_JOKES)
        )
        .subscribe(() => {
          this.getSingleJokeService.addFavouriteJoke();
          this.snackBar.open('Random joke added in your favourite list successfully', null, {
            duration: 1000,
          });
        }
        );
    });

  }

  /**
   * Used to remove the favourite joke
   * param  {Joke} joke: To be remove from Fav list
   */
  removeFavourite = (joke: Joke) => {
    this.manageFavService.manageFavourite(joke);
    this.snackBar.open('Joke removed in your favourite list successfully', null, {
      duration: 1000,
    });
  }

  /**
   * Used to add add Joked random if it is selected
   * param  {MatSlideToggleChange} event
   **/
  onSlideChange(event: MatSlideToggleChange) {
    this.NeedToGetJokeAutomatic.next(event.checked);
  }
}
