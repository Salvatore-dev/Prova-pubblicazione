"use client"

import React from 'react'
import Header from '../ui/memory-game/header'
import Link from 'next/link'
import { useState, useReducer, useEffect } from 'react'
import { memo } from 'react'
import Card from '../ui/memory-game/cards'
import { backSideCards } from '../lib/memory-games/data'
//import SidePanelControl from '../ui/memory-game/sidePanelControl'
import { ActionReducerMemoryGames, Decks, MemoryGamesActionType, ReducerFunctionMemoryGames } from "@/app/lib/memory-games/definitions";
import { makeDecks, suspenseAudioMemoryGame, restartAudioMemoryGame, gameOverAudioMemoryGame, goodAudioMemoryGame, errorAudioMemoryGame, successAudioMemoryGame, startAudioMemoryGame } from '../lib/memory-games/docs'


const difficulty = 2
const limitTurns = 8;

const startAudio = startAudioMemoryGame()
const errorAudio = errorAudioMemoryGame()
const successAudio = successAudioMemoryGame()
const goodAudio = goodAudioMemoryGame()
const gameOverAudio = gameOverAudioMemoryGame()
const restartAudio = restartAudioMemoryGame()
const suspanseAudio = suspenseAudioMemoryGame()

function Page() {

  const defaultDecks = makeDecks(difficulty)
  //console.log(defaultDecks);

  const [counter, setCounter] = useState<number | null>(null);
  const [clickAlternate, setClickAlternate] = useState<boolean>(false);
  const [countMatched, setCountMatched] = useState<number>(defaultDecks.one.length) //firstHalf.length

  useEffect(() => {
    if (counter === 0) {
      //suspanseAudio.stop()
      setTimeout(() => {
        gameOverAudio.play()
      }, 1000)
      setTimeout(() => {
        suspanseAudio.stop()
      }, 2001)

    }
    if (countMatched === 0) {
      //suspanseAudio.stop()
      setTimeout(() => {
        successAudio.play()
      }, 1000)
      setTimeout(() => {
        suspanseAudio.stop()
      }, 2001)
    }

  }, [counter, countMatched])
  const actionFunction = (state: Decks, action: ActionReducerMemoryGames): Decks => {
    switch (action.type) {
      case "one":
        setClickAlternate(true);
        //const card1 = state.one?.filter((el)=> el.id === action.cardId)
        const deck1 = state?.one.map((el) => {
          //cerco la carta cliccata e modifico la spunta in true
          if (el.id === action.cardId) {
            return { ...el, isMatched: true };
          }
          return el;
        });
        console.log(deck1);
        return { ...state, one: [...deck1], latestChoise: action.cardId }; // restituisco la modifica del mazzo1 relativa alla spunta true della carta cliccata
      case "two":
        setClickAlternate(false);
        suspanseAudio.stop()
        const card1 = state.one?.filter((el) => el.id === action.cardId)[0]; // prendo la carta nel mazzo uno che ha lo stesso id della carta del mazzo due
        let deck2;
        if (card1.isMatched) {
          goodAudio.play()
          setCountMatched((prev) => --prev)
          setTimeout(() => {
            suspanseAudio.play()
          }, 2000)
          // se entro allora la carte e' stata trovata, quindi diminuisco di una unita partendo dalla lunghezza dell'array, fino a 0
          deck2 = state.two?.map((el) => { // cerco la carda con lo stesso id e spunto in true il valore isMatched
            if (el.id === action.cardId) {
              return { ...el, isMatched: true };
            }
            return el;
          });
          //const card2 = deck2?.filter((el) => el.id === action.cardId)[0]; // prendo la carta del mazzo due che risulta metchata nel mazzo due gia con spunta true
          return { ...state, two: [...deck2], latestChoise: 0 };
        } else {// se entro qui vuol dire che la carta non e' stata abbinata
          errorAudio.play()

          setCounter(prev => {
            if (prev) {
              return prev - 1
            } else return prev
          }); // diminusco il numero di tentativi

          setTimeout(() => {
            suspanseAudio.play()
          }, 2000)
          const deck1 = state?.one.map((el) => {
            //cerco la carta cliccata nel mazzo 1  e modifico la spunta in false
            if (el.id === state.latestChoise) {
              return { ...el, isMatched: false };
            }
            return el;
          });
          return { ...state, one: [...deck1], latestChoise: 0 }; // ritorno il mazzo 1 al momento del tentativo precedente
        }
      case "reload":
        setCounter(limitTurns); // ripristino i valori di partenza
        restartAudio.play()
        setTimeout(() => {
          suspanseAudio.play()
        }, 2000)

        const newDecks = makeDecks(difficulty)
        setCountMatched(newDecks.one.length)// ripristino i valori di partenza
        return newDecks; // ripristino i valori di partenza
      case "start":
        startAudio.play()
        setTimeout(() => {
          suspanseAudio.play()
        }, 2000)
        setCounter(limitTurns); // inizio il gioco dando il valore di partenza a Counter 

        return { ...state };
      default:
        return { ...state };
    }
  }
  const [cards, setCards] = useReducer(actionFunction, defaultDecks)




  return (
    <div className='max-h-screen max-w-screen'>
      <Header />
      {/* <SidePanelControl counter={counter} setCards={setCards} countMatched={countMatched} /> */}
      <div className={`h-full py-4 ${!counter && "hidden"} bg-violet-400`}>

        <div className="grid grid-cols-12 gap-2 mb-3 justify-center">
          {cards?.one.map((el) => (
            <div className="col-span-2 flex justify-center" key={el.name}>
              <Card
                card={el}
                backside={backSideCards}
                getCard={setCards}
                deck={"one"}
                alternate={clickAlternate}
              />
            </div>
          ))}
        </div>
        <div className="h-5 bg-gray-800 grid"></div>
        <div className="grid grid-cols-12 gap-2 mt-3">
          {cards.two.map((el) => (
            <div className="col-span-2 flex justify-center" key={el.name}>
              <Card
                card={el}
                backside={backSideCards}
                getCard={setCards}
                deck={"two"}
                alternate={clickAlternate}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="bg-purple-900 flex flex-col gap-2 md:flex-row justify-around items-center py-2">
        {counter === null && (
          <button
            className="p-2 w-40 rounded-md bg-green-700 text-gray-200 text-2xl italic"
            onClick={() => {
              setCards({ type: "start" });
            }}
          >
            Start...
          </button>
        )}
        {counter !== null && counter > 0 && countMatched != 0 && (
          <>
            <div className=" text-gray-200 text-lg md:text-2xl font-medium">{`Tentativi ancora rimasti: ${counter}`}</div>
            <div>
              <button
                className="p-2 w-20 md:w-40 rounded-md bg-red-700 text-center text-gray-200 text-base md:text-2xl italic"
                onClick={() =>
                  setCards({
                    type: "reload",
                  })
                }
              >
                Riprova
              </button>
            </div>
          </>
        )}
        {counter == 0 && (
          <button
            className="p-2 w-20 md:w-40 rounded-md bg-green-700 text-center text-gray-200 text-base md:text-2xl italic"
            onClick={() =>
              setCards({
                type: "reload",
              })
            }
          >
            Hai Fallito!!!!
            <br></br>
            Riprova...
          </button>
        )}
        {countMatched === 0 && (
          <button
            className="p-2 w-20 md:w-40 rounded-md bg-green-700 text-center text-gray-200 text-base md:text-2xl italic"
            onClick={() =>
              setCards({
                type: "reload",
              })
            }
          >
            Hai Vinto!!!!
            <br></br>
            Un altra partita...
          </button>
        )}
        <Link className="p-2 w-20 md:w-40 rounded-md bg-green-700 text-center text-gray-200 text-base md:text-2xl italic" href={`/`}>Home</Link>
      </div>
    </div>
  )
}

export default memo(Page)