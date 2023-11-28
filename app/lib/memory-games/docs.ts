import { MemoryGamesCard, Decks } from "./definitions";
import { totalCards } from "./data";
import { unstable_noStore as noStore } from "next/cache";

const shuffleArray = (array: MemoryGamesCard[]): MemoryGamesCard[] => { // funzione che riordina in modo casuale l'array
    const shuffledArray = array.slice(); //copia array
    const randomComparison = () => Math.random() - 0.5; //restituisce un numero casuale tra -0.5 e 0.5
    shuffledArray.sort(randomComparison); // riordina facendo un confronto con lalori casuali forniti dalla funzione precedente
    return shuffledArray;
}

export const makeDecks = (n : number) : Decks => {
    noStore()
    const deck = shuffleArray(totalCards);
    const middleIndex = Math.floor(deck?.length / n);
    const firstHalf = deck?.slice(0, middleIndex);
    const secondHalf = shuffleArray(firstHalf);
    const decks = {
        one: firstHalf,
        two: secondHalf,
        latestChoise: 0, // valore che mi occore per tenere traccia dell'ultima carta selezionata nel mazzo 1
    };

    return decks

}