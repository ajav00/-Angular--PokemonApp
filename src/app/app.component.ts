import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { BehaviorSubject, filter, first, pipe, startWith, Subscription, switchMap, tap } from 'rxjs';
import { PokemonItem } from './interfaces/pokemon.interface';
import { PokemonResponseInterface } from './interfaces/response.interface';
import { PokemonService } from './services/pokemon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  
  title = 'pokemon-app';
  
  public pokemonList: PokemonResponseInterface[];
  public pokemonSelected: PokemonItem;

  // Subscription
  private routerSub$: Subscription;
  private queryParamsSub$: Subscription;

  // Loaders
  public pokemonListLoader: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public pokemonItemLoader: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  private step = 20;

  constructor(private pokemonService: PokemonService, private router: Router, private activatedRoute: ActivatedRoute){ }

  ngOnInit(): void{
    this.queryParamsSub$ = this.activatedRoute.queryParamMap.pipe(
      tap(_ => this.pokemonListLoader.next(true)),
      switchMap(({params}: any) => this.pokemonService.getAllPokemon(params.step ?? this.step, params.page ?? 1)),
      tap(_ => this.pokemonListLoader.next(false)),
    ).subscribe((pokemon: PokemonResponseInterface[]) => this.pokemonList = pokemon );
  }

  ngOnDestroy(): void {
    this.queryParamsSub$?.unsubscribe();
    this.routerSub$?.unsubscribe();
  }

  selectPokemon(name: string){
    this.pokemonItemLoader.next(true);
    this.pokemonService.getPokemonByName(name).pipe(first(), 
      tap(_ => this.pokemonItemLoader.next(false)), 
      ).subscribe((item) => {
        this.pokemonSelected = item
      })
  }

  setStep(step: number){ this.step = step}
}
