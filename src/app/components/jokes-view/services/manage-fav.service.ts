/**
 *
 * ********NOT IN USE*************
 *
 */
import { Injectable } from '@angular/core';
import { Joke } from '../joke';
import { Observer, } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ManageFavService {
  private favouriteJokes: Array<Joke>;

  constructor() {
  }

  /**
   * Used to save in/Remove from Favourite list
   * @param  {Joke} joke : Joke to be remove OR add in Favourite list
   */
  handleFavourite = (joke: Joke): void => {
    if (!joke.isFavourite) {
      const elementIndex: number = this.favouriteJokes.indexOf(joke, 0);
      this.favouriteJokes.splice(elementIndex, 1);
    } else {
      this.favouriteJokes.push(joke);
    }

    this.saveLocalStorage(this.favouriteJokes);

  }

  /**
   * Used to get the Favourite list from local Storage
   */
  getSavedFavourite = (): Observer<Array<Joke>> => JSON.parse(localStorage.getItem('saveJoke'))
                                                  .map((fav: Joke) => <Joke>fav)
  /**
   * Save the provided favourite in local storage
   * @param  {Joke[]} data: list of favourite Jokes
   */
  private saveLocalStorage = (data: Joke[]): void => {
    if (this.hasItem('saveJoke')) {
      localStorage.removeItem('saveJoke');
    }
    localStorage.setItem('saveJoke', JSON.stringify(data));
  }

  /**
   * Check the Fav list already saved in local storage OR not
   * @param  {string} key
   * @returns boolean
   */
  private hasItem = (key: string): boolean => (localStorage.getItem(key) !== null);

}
