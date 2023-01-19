import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { BehaviorSubject, filter, first, pipe, startWith, Subscription, switchMap, tap } from 'rxjs';
import { PokemonClass } from './classes/pokemon.class';
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
  
  public pokemonList: PokemonResponseInterface;
  public pokemonSelected: PokemonClass;

  // Subscription
  private routerSub$: Subscription;
  private queryParamsSub$: Subscription;

  // Loaders
  public pokemonListLoader: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public pokemonItemLoader: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public pokemonDictionary: {};

  public step = 20;
  public page = 1;

  constructor(private pokemonService: PokemonService, private router: Router, private activatedRoute: ActivatedRoute){ }

  ngOnInit(): void{
    this.queryParamsSub$ = this.activatedRoute.queryParamMap.pipe(
      tap((_ : any) => this.pokemonListLoader.next(true)),
      tap(({params}) => this.step = params.step ?? this.step),
      tap(({params}) => this.page = params.page ?? this.page),
      switchMap(() => this.pokemonService.getAllPokemon(this.step, this.page)),
      tap(_ => this.pokemonListLoader.next(false)),
    ).subscribe((pokemon: PokemonResponseInterface) => {
      this.pokemonDictionary = this.createDictionary(pokemon.results.map(pokemon => pokemon.name));
      this.pokemonList = pokemon;
    });
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
        this.pokemonSelected = new PokemonClass(item);
        console.warn('THIS IS THE POKEMON ITEM', this.pokemonSelected);
      })
  }

  setStep(step: number){ this.step = step}

  setPage(page: number){ this.page = page}


  createDictionary(pokemonList: string[]){
    return pokemonList.reduce((obj: any, item) => {
      let key = item[0].toUpperCase();
      return {
        ...obj,
        [key]: obj[key] ?  [...obj[key], item] : [item],
      }
    }, {});
  }
}
