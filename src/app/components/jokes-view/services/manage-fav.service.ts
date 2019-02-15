import { Injectable } from '@angular/core';
import { Joke } from '../joke';
import { ReplaySubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ManageFavService {


  favouriteJokes$: ReplaySubject<Array<Joke>> = new ReplaySubject();
  private favouriteJokesList: Joke[] = [];
  constructor() {
    this.favouriteJokesList = this.getSavedFavourite();
    if (!!this.favouriteJokesList) {
      this.favouriteJokes$.next(this.favouriteJokesList);
    }
  }

  manageFavourite = (joke: Joke) => {
    if (!joke.isFavourite) {
      const elementIndex: number = this.favouriteJokesList.indexOf(joke, 0);
      this.favouriteJokesList.splice(elementIndex, 1);
    } else {
      this.favouriteJokesList.push(joke);
    }

    this.handelLocalStorage(this.favouriteJokesList);
    this.favouriteJokes$.next(this.favouriteJokesList);
  }

  private getSavedFavourite = (): Array<Joke> => {
    if (this.hasItem('saveJoke')) {
      return JSON.parse(localStorage.getItem('saveJoke'))
        .map((fav: Joke) => <Joke>fav);
    }
  }
  private handelLocalStorage = (data: Joke[]) => {
    if (this.hasItem('saveJoke')) {
      localStorage.removeItem('saveJoke');
    }
    localStorage.setItem('saveJoke', JSON.stringify(data));
  }
  private hasItem = (key: string): boolean => (localStorage.getItem(key) !== null);

}
