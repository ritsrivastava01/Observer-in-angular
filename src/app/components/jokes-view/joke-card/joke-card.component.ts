import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Joke } from '../joke';

@Component({
  selector: 'app-joke-card',
  templateUrl: './joke-card.component.html',
  styleUrls: ['./joke-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JokeCardComponent {
  @Input() joke: Joke;
  @Output() manageFavourite: EventEmitter<Joke> = new EventEmitter<Joke>()
  constructor() { }

  onClickHandler = (status: boolean) => {
    this.joke.isFavourite = status;
    this.manageFavourite.emit(this.joke);
  }

}
