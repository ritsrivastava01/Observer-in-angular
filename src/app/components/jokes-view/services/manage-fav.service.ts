import { Injectable } from '@angular/core';
import { Joke } from '../joke';
import { BehaviorSubject, Subject, Observer, Observable, observable, of, from } from 'rxjs';
import { observeOn } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ManageFavService {
  //favouriteJokesList: Observer<Array<Joke>>;
  private favouriteJokes: Array<Joke>;

  constructor() {
  }

  handleFavourite = (joke: Joke) => {
    if (!joke.isFavourite) {
      const elementIndex: number = this.favouriteJokes.indexOf(joke, 0);
      this.favouriteJokes.splice(elementIndex, 1);
    } else {
      this.favouriteJokes.push(joke);
    }

    this.saveLocalStorage(this.favouriteJokes);
    //this.favouriteJokesList.next(this.favouriteJokes);
  }

  getSavedFavourite = (): Observer<Array<Joke>> => {
    return JSON.parse(localStorage.getItem('saveJoke'))
      .map((fav: Joke) => <Joke>fav);

  }
  private saveLocalStorage = (data: Joke[]) => {
    if (this.hasItem('saveJoke')) {
      localStorage.removeItem('saveJoke');
    }
    localStorage.setItem('saveJoke', JSON.stringify(data));
  }
  private hasItem = (key: string): boolean => (localStorage.getItem(key) !== null);

}
