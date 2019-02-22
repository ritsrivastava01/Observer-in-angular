
import { Joke } from '../joke';
import { GetJokesService } from '../services/get-jokes.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GetSingleJokeService {
  constructor(private getJokesService: GetJokesService) { }
  /**
   * USed to get the Random Joke
   * @returns Observable
   */
  getRandomJoke = (): Observable<Array<Joke>> => this.getJokesService.getJokes(1);
}
