import { StatsInterface } from "./stats";

export interface PokemonInterface {
    id: string;
    name: string;
    type1: string;
    type2?: string;
    sprite: string;
    height: string;
    weight: string;
    abilities: string;
    hiddenAbility?: string;
    stats: StatsInterface[];
}
