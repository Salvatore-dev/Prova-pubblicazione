import { MemoryGamesCard, Decks } from "./definitions";
import { totalCards } from "./data";
import { unstable_noStore as noStore } from "next/cache";
import { Howl } from 'howler';



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

export function errorAudioMemoryGame() {
    const errorSource = 'memory-game/sounds/error.mp3'
    const sound = new Howl({
        src: [errorSource],
      });
 return sound
}
export function startAudioMemoryGame() {
    const startSource = 'memory-game/sounds/start.mp3'
    const sound = new Howl({
        src: [startSource],
      });
 return sound
}

export function successAudioMemoryGame() {
    const successSource = 'memory-game/sounds/success.mp3'
    const sound = new Howl({
        src: [successSource],
      });
 return sound
}
export function goodAudioMemoryGame() {
    const goodSource = 'memory-game/sounds/good.mp3'
    const sound = new Howl({
        src: [goodSource],
      });
 return sound
}
export function gameOverAudioMemoryGame() {
    const gameOverSource = 'memory-game/sounds/game-over.mp3'
    const sound = new Howl({
        src: [gameOverSource],
      });
 return sound
}
export function restartAudioMemoryGame() {
    const restartAudio = 'memory-game/sounds/restart.mp3'
    const sound = new Howl({
        src: [restartAudio],
      });
 return sound
}
export function suspenseAudioMemoryGame() {
    const suspenseSource = 'memory-game/sounds/suspense.mp3'
    const sound = new Howl({
        src: [suspenseSource],
      });
 return sound
}