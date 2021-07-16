import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIResponse, Game } from './../../model';
import { HttpService } from './../../services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public sort: string = '';
  public games: Array<Game> = [];
  private routeSub: Subscription;


  constructor(private httpService: HttpService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      if (params.get('game-search')) {
        this.searchGames('metacrit', params.get('game-search')!)
      } else {
        this.searchGames('metacrit');
      }
    })
  }

  searchGames(sort: string, search?: string) {
    this.httpService.getGameList(sort, search)
      .subscribe((gameList: APIResponse<Game>) => {
        this.games = gameList.results;
      })
  }

  openGameDetails(id: number): void {
    this.router.navigate(['detail', id]);
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

}
