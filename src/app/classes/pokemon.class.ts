import { PokemonItem } from "../interfaces/pokemon.interface";

export class PokemonClass {
    
    public abilities: string[];
    public base_experience: number;
    public forms: string[];
    public game_indices: string[];
    public height: number;
    public moves: string[];
    public name: string;
    public specie: string;
    public stats: {name: string, base_stat: number, effort: number}[];
    public weight: number;
    public types: string[];
    
    constructor(pokemon: PokemonItem){
        this.abilities = pokemon.abilities.map(ab => ab.ability.name);
        this.base_experience = pokemon.base_experience;
        this.forms = pokemon.forms.map(form => form.name);
        this.game_indices = pokemon.game_indices.map(gamer => gamer.version.name);
        this.height = pokemon.height;
        this.moves = pokemon.moves.map(move => move.move.name);
        this.name = pokemon.name;
        this.specie = pokemon.species.name;
        this.stats = pokemon.stats.map(stat => ({name: stat.stat.name, base_stat: stat.base_stat, effort: stat.effort}));
        this.weight = pokemon.weight
        this.types = pokemon.types.map(type => type.type.name)

    }
}