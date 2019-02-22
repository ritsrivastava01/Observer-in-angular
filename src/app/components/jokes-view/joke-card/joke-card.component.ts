
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Joke } from '../joke';

@Component({
  selector: 'app-joke-card',
  templateUrl: './joke-card.component.html',
  styleUrls: ['./joke-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class JokeCardComponent {

  @Input() joke: Joke;
  @Output() jokeCardSelected: EventEmitter<Joke> = new EventEmitter<Joke>();

  constructor() { }

  /**
   * Used to handle the like/dislike button handler
   * @param  {boolean} status == like OR dis-like
   * @returns void
   */
  buttonClicked = (status: boolean): void => {
    this.joke.isFavourite = status;
    this.jokeCardSelected.emit(this.joke);
  }

}
