import { StaticImageData } from "next/image";
import { type } from "os";

interface MemoryGamesCard { // tipo di carta
    id: number,
    name: string;
    url: StaticImageData,
    isMatched: boolean,
    typeDeck? : string // da implemetare per uso diversi tipi di mazzetti di carte

}
interface Decks {
    one: MemoryGamesCard[],
    two :  MemoryGamesCard[],
    latestChoise : number | undefined

}
type MemoryGamesActionType = "one" | "two" | "reload" | "start"

type ActionReducerMemoryGames = {
    type: MemoryGamesActionType,
    cardId?: number

}
type ReducerFunctionMemoryGames = (state: Decks, action: ActionReducerMemoryGames) => Decks;

export type {MemoryGamesCard, Decks, ActionReducerMemoryGames, ReducerFunctionMemoryGames, MemoryGamesActionType}