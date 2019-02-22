import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Joke } from '../joke';

@Injectable({
  providedIn: 'root'
})
export class GetJokesService {

  constructor(private httpClient: HttpClient) { }

  /**
   * USed to get the Jokes (1 OR 10)
   * @param  {number} noOfJokes : No Of Jokes
   * @returns Observable : List of the jokes as Observable
   */
  getJokes = (noOfJokes: number): Observable<Joke[]> => {
    return this.httpClient
      .get(`https://api.icndb.com/jokes/random/${noOfJokes}`)
      .pipe(
        map((response: any) => {
          return response.value.map((value: any) =>
            <Joke>{
              id: Number(value.id),
              message: String(value.joke),
              isFavourite: false
            });
        }),

        catchError(this.handleErrorObservable)
      );
  }

  private handleErrorObservable = (error: Response | any): Observable<never> => throwError((new Error(error.message || error)));
}
