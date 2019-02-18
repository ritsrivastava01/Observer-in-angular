
import { Joke } from '../joke';
import { GetJokesService } from '../services/get-jokes.service';
import { ManageFavService } from '../services/manage-fav.service';

export class GetSingleJokeService {
  constructor(private getJokesService: GetJokesService, private manageFavouriteService: ManageFavService) { }

  /**
   * Used to add the in Favourite joke list
   */
   addFavouriteJoke = () => {
    this.getJokesService.getJokes(1)
      .subscribe((records: Joke[]) => {
        const joke: Joke = records[0];
        joke.isFavourite = true;
        this.manageFavouriteService.manageFavourite(joke);
      });
  }
}
