
import { Component, ChangeDetectionStrategy, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HeaderComponent {

  @Input() isSuccessfulLogin: boolean = true;
  @Output() logoutClicked: EventEmitter<void> = new EventEmitter();

  constructor() { }

  /**
   * used to handle logout session
   * clear session
   * then redirect to login screen
   */
  logoutSession = (): void => {
    this.isSuccessfulLogin = false;
    this.logoutClicked.emit();
  }
}
