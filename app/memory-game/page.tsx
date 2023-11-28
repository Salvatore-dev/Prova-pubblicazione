"use client"

import React from 'react'
import Header from '../ui/memory-game/header'
import Link from 'next/link'
import { useState, useReducer, useMemo } from 'react'
import Card from '../ui/memory-game/cards'
import { backSideCards } from '../lib/memory-games/data'
//import SidePanelControl from '../ui/memory-game/sidePanelControl'
import { ActionReducerMemoryGames, Decks, MemoryGamesActionType, ReducerFunctionMemoryGames } from "@/app/lib/memory-games/definitions";
import { makeDecks } from '../lib/memory-games/docs'


const limitTurns = 8;

const difficulty = 2


 function Page() {
  
const defaultDecks = makeDecks(difficulty)
console.log(defaultDecks);


  const [counter, setCounter] = useState<number| null>(null);
  const [clickAlternate, setClickAlternate] = useState<boolean>(false);
  const [countMatched, setCountMatched] = useState<number>(defaultDecks.one.length) //firstHalf.length
  
  const actionFunction  = (state: Decks, action: ActionReducerMemoryGames) : Decks => {
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
        const card1 = state.one?.filter((el) => el.id === action.cardId)[0]; // prendo la carta nel mazzo uno che ha lo stesso id della carta del mazzo due
        let deck2;
        if (card1.isMatched) {
          setCountMatched((prev)=> --prev) // se entro allora la carte e' stata trovata, quindi diminuisco di una unita partendo dalla lunghezza dell'array, fino a 0
          deck2 = state.two?.map((el) => { // cerco la carda con lo stesso id e spunto in true il valore isMatched
            if (el.id === action.cardId) {
              return { ...el, isMatched: true };
            }
            return el;
          });
          //const card2 = deck2?.filter((el) => el.id === action.cardId)[0]; // prendo la carta del mazzo due che risulta metchata nel mazzo due gia con spunta true
          return { ...state, two: [...deck2], latestChoise: 0 };
        } else {// se entro qui vuol dire che la carta non e' stata abbinata
          setCounter(prev => {
            if (prev) {
              return prev -1
            } else return prev
            
          }); // diminusco il numero di tentativi
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
        const newDecks = makeDecks(difficulty)
        setCountMatched(newDecks.one.length)// ripristino i valori di partenza
        return newDecks; // ripristino i valori di partenza
      case "start":
        setCounter(limitTurns); // inizio il gioco dando il valore di partenza a Counter 

        return { ...state };
      default: 
        return { ...state };
    }
  }
  const [cards, setCards] = useReducer(actionFunction, defaultDecks)
  
  

  
  return (
    <>
        <Header />
        {/* <SidePanelControl counter={counter} setCards={setCards} countMatched={countMatched} /> */}
        <div className={`h-[650px] py-4 ${!counter && "hidden"} bg-sky-200`}>
        
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
        <div className="h-5 bg-sky-300 grid"></div>
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
      <div className="bg-sky-300 flex flex-row justify-around items-center py-2">
        {counter === null && (
          <button
          className="p-2 w-40 rounded-md bg-sky-800 text-white text-2xl italic"
            onClick={() => {
              setCards({ type: "start" });
            }}
          >
            Start...
          </button>
        )}
        {counter !== null && counter > 0 && countMatched != 0 && (
          <>
            <div className=" text-sky-950 text-2xl font-medium">{`Tentativi ancora rimasti: ${counter}`}</div>
            <div>
              <button
                className="bg-red-500 text-center w-24 text-lg font-semibold p-2 border rounded-lg"
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
          className="bg-sky-800 w-48  text-center text-2xl text-white font-semibold p-2 border rounded-lg"
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
        {countMatched ===0 &&(
          <button
          className="bg-green-700 w-58  text-center text-2xl text-white font-semibold p-2 border rounded-lg"
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
      </div>
    </>
  )
}

export default Page