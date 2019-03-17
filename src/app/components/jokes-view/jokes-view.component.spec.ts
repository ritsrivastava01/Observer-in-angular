import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JokesViewComponent } from './jokes-view.component';
import { Component, DebugElement, Input } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Joke } from './joke';
import { MatTabsModule, MatSnackBarModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { GetJokesService } from './services/get-jokes.service';


@Component({ selector: 'app-jokes-list', template: '' })
class JokesListComponent {
  @Input() jokesList: Joke[];
  @Input() isFavouriteTab: boolean;
}

function getJokesSpy(fav: boolean): Joke[] {
  return [1, 2, 3]
    .map(x => <Joke>{
      id: x,
      message: `joke ${x}`,
      isFavourite: fav
    });
}

describe('JokesViewComponent', () => {
  let component: JokesViewComponent;
  let fixture: ComponentFixture<JokesViewComponent>;
 
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatTabsModule,
        HttpClientModule,
        MatSnackBarModule,
        BrowserAnimationsModule
      ],
      declarations: [
        JokesListComponent,
        JokesViewComponent,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JokesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should create two tab with text', () => {
    expect(fixture.debugElement.queryAll(By.css('.mat-tab-label')).length).toBe(2);
    const tabOne: DebugElement = fixture.debugElement.queryAll(By.css('.mat-tab-label'))[0];
    expect(tabOne.nativeElement.textContent).toBe(`Today's Jokes`);
    const tabTwo: DebugElement = fixture.debugElement.queryAll(By.css('.mat-tab-label'))[1];
    expect(tabTwo.nativeElement.textContent).toBe(`Your Favourite Jokes`);

  });

  it('should add jokes in Favourite list', () => {
    component.jokesList = getJokesSpy(false);
    component.jokesList[0].isFavourite = true;
    component.jokeSelected(component.jokesList[0]);
    expect(component.favouriteJokeList.length).toBe(1);
    expect(component.jokesList.filter((x: Joke) => x.isFavourite === false).length).toBe(2);
  });

  it('should remove joke from Favourite list', () => {
    component.favouriteJokeList = getJokesSpy(true);
    expect(component.favouriteJokeList.length).toBe(3);
    component.favouriteJokeList[0].isFavourite = false;
    component.jokeSelected(component.favouriteJokeList[0]);
    expect(component.favouriteJokeList.length).toBe(2);
  });
});
