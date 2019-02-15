import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, timer, interval } from 'rxjs';
import { catchError, map, mergeMap, combineAll, takeUntil } from 'rxjs/operators';
import { Joke } from '../joke';
import { GetJokesService } from '../services/get-jokes.service'
import { ManageFavService } from '../services/manage-fav.service';

@Injectable()
export class GetSingleJokeService {
  constructor(private getJokesService: GetJokesService, private manageFavouriteService: ManageFavService) { }

  /**
   * Used to add the in Favourite joke list
   */
   addFavouriteJoke = () => {
    this.getJokesService.getJokes(1)
      .subscribe((records: Joke[]) => {
        const joke: Joke = records[0];
        joke.isFavourite = true;
        this.manageFavouriteService.manageFavourite(joke);
      });
  }
}
