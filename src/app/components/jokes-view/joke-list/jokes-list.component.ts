
import { Joke } from '../joke';
import { Component, Input, Output, EventEmitter, OnInit, ChangeDetectorRef } from '@angular/core';
import { Subject, interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { MatSlideToggleChange } from '@angular/material';
import { GetSingleJokeService } from '../services/get-single-joke.service';
const NO_OF_MAX_FAV_JOKES: Number = 10;

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
  private getJokeAutomatic: Subject<boolean> = new Subject<boolean>();

  constructor(private getSingleJoke: GetSingleJokeService, private cdRef: ChangeDetectorRef) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.getJokeAutomatic.subscribe((value: boolean) => {
      this.getRandomJoke = value;
      interval(1000)
        .pipe(
          takeWhile(() => this.getRandomJoke && this.jokesList.length < NO_OF_MAX_FAV_JOKES)
        )
        .subscribe(() => {
          this.getSingleJoke.getRandomJoke()
            .subscribe((x: Array<Joke>) => {
              const joke: Joke = x[0];
              joke.isFavourite = true;
              this.jokeCardButtonClicked(joke);
              this.cdRef.detectChanges();
            });
        });

    });

  }
  /**
   * Used to track the joke  list  and refresh the list on click on dislike from Fav list
   * @param  {} index Joke Index in list
   * @param  {Joke} item Joke Item
   */
  trackByFn = (index: number, item: Joke): boolean => item.isFavourite;

  /**
   * USed to handle card button (Like OR dislike)
   * @param  {Joke} joke: Joke with updated values
   */
  jokeCardButtonClicked = (joke: Joke): void => this.jokeSelected.emit(joke);

  /**
   * Used to add Random Joke in Favourite list
   * @param  {MatSlideToggleChange} event: Provide ON/OFF info
   * @returns void
   */
  addRandomJoke = (event: MatSlideToggleChange): void => this.getJokeAutomatic.next(event.checked);

}
