export interface PokemonItem {
    abilities: {ability: NameUrlInterface, is_hidden: boolean, slot: number}[],
    base_experience: number,
    forms: NameUrlInterface[],
    game_indices: {game_index: number, version: NameUrlInterface}[],
    height: number,
    id: number,
    is_default: boolean,
    location_area_encounters: string,
    moves: {move: NameUrlInterface}[],
    name: string,
    order: number,
    species: NameUrlInterface,
    stats: {base_stat: number, effort: number, stat: NameUrlInterface}[],
    types: {slot: number, type: NameUrlInterface}[],
    weight: number
}

interface NameUrlInterface{
    name: string, url:string
}