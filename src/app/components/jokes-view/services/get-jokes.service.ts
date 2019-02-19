import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, mergeMap, combineAll } from 'rxjs/operators';
import { Joke } from '../joke';

@Injectable({
  providedIn: 'root'
})
export class GetJokesService {

  constructor(private httpClient: HttpClient) { }

  getJokes = (noOfJokes: number): Observable<Joke[]> => {
    return this.httpClient
      .get(`https://api.icndb.com/jokes/random/${noOfJokes}`)
      .pipe(
        map((response: any) => {
          return response.value.map(value =>
            <Joke>{
              id: Number(value.id),
              message: String(value.joke),
              isFavourite: false
            });
        }),

        catchError(this.handleErrorObservable)
      );
  }

  private handleErrorObservable(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }
}
