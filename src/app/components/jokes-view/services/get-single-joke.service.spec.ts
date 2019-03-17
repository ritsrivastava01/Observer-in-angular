
import { Joke } from '../joke';
import { GetSingleJokeService } from './get-single-joke.service';
import { of } from 'rxjs';

describe('GetSingleJokesService', () => {
  let service: GetSingleJokeService;
  const testJoke: Joke = { message: 'success', id: 1, isFavourite: false };

  it('should return the single mapped joke', () => {
    const jokeServiceSpy = jasmine.createSpyObj('GetJokesService', ['getJokes']);
    jokeServiceSpy.getJokes.and.returnValue(of([testJoke]));
    service = new GetSingleJokeService(jokeServiceSpy);
    expect(service).toBeTruthy();
    service.getRandomJoke()
      .subscribe((x: Array<Joke>) => {
       expect(x.length).toBe(1);
       expect(x[0]).toBe(testJoke);
      });
  });
});
