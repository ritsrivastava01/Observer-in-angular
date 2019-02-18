
import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HeaderComponent implements OnInit {

  @Output() clickHandler: EventEmitter<string> = new EventEmitter<string>();
  isAlreadyLogin = false;

  constructor() { }

  ngOnInit = (): void => {
    this.isAlreadyLogin = sessionStorage.getItem('login') ? true : false;
  }

  /**
   * used to handle click
   */
  onClickHandler = (url: string): void => {
    this.clickHandler.emit(url);
  }

  /**
   * used to handle logout session
   * clear session
   * then redirect to login screen
   */
  logoutSession = () => {
    sessionStorage.removeItem('login');
    this.isAlreadyLogin = false;
    this.clickHandler.emit('login');
  }
}
