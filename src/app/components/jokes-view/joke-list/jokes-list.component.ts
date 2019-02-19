
import { Joke } from '../joke';
import { Component, Input, Output, EventEmitter, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Subject, interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { MatSlideToggleChange } from '@angular/material';
import { GetSingleJokeService } from '../services/get-single-joke.service';
const NO_OF_MAX_FAV_JOKES = 10;

@Component({
  selector: 'app-jokes-list',
  templateUrl: './jokes-list.component.html',
  styleUrls: ['./jokes-list.component.scss'],
  providers: [GetSingleJokeService]
})
export class JokesListComponent implements OnInit {
  @Input() jokesList: Joke[];
  @Input() isFavouriteTab: boolean;
  @Output() jokeSelected: EventEmitter<Joke> = new EventEmitter;
  private getRandomJoke: boolean;
  private getJokeAutomatic = new Subject<boolean>();

  constructor(private getSingleJoke: GetSingleJokeService, private cdRef:ChangeDetectorRef) { }

  ngOnInit() {

    this.getJokeAutomatic.subscribe(value => {
      this.getRandomJoke = value;
      interval(1000)
        .pipe(
          takeWhile(() => this.getRandomJoke && this.jokesList.length < NO_OF_MAX_FAV_JOKES)
        )
        .subscribe(() => {
          this.getSingleJoke.getRandomJoke()
            .subscribe(x => {
              console.table(this.jokesList);
              let joke: Joke = x[0];
              joke.isFavourite = true;
              this.jokeCardSelected(joke);
              this.cdRef.detectChanges();
              
            });
      //console.log('add Joke');
      //this.getSingleJokeService.addFavouriteJoke();
      // this.snackBar.open('Random joke added in your favourite list successfully', null, {
      //  duration: 1000,
      //});
    }
    );
  });

}

trackByFn(index, item: Joke) {
  return item.isFavourite;
}



jokeCardSelected = (joke: Joke) => this.jokeSelected.emit(joke);

addRandomJoke = (event: MatSlideToggleChange) => {
  console.log(event.checked);
  this.getJokeAutomatic.next(event.checked);
}
}
