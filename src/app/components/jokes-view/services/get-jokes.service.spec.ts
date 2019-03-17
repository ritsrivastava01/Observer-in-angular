import { TestBed } from '@angular/core/testing';
import { GetJokesService } from './get-jokes.service';
import { Joke } from '../joke';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

describe('GetJokesService', () => {
  let service: GetJokesService;
  let httpClientSpy: { get: jasmine.Spy };
  const testJoke: any = { 'type': 'success', 'value': [{ 'id': 1, 'joke': 'test1', 'categories': ['nerdy'] }] };
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new GetJokesService(<any>httpClientSpy);

  }
  );

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the mapped joke', () => {
    httpClientSpy.get.and.returnValue(of(testJoke));
    service.getJokes(1)
      .subscribe((x: Joke[]) => {
        expect(x.length).toBe(1);
        expect(x[0]).toEqual({ 'id': 1, 'message': 'test1', 'isFavourite': false });
        expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
      });

  });
  it('should handle the error', () => {
    const errorHandler: HttpErrorResponse = new HttpErrorResponse({
      error: 'test 404 not found',
      status: 404,
      statusText: 'Not available'
    });

    httpClientSpy.get.and.returnValue(errorHandler);

    service.getJokes(1)
      .subscribe(
        (data: Joke[]) => fail('expected an error'),
        (error: Error) => expect(error.message).toContain('test 404 not found')
      );
  });

});
