"use client"
import { Dispatch, useState, } from "react"
import { MemoryGamesCard } from "@/app/lib/memory-games/definitions";
import Image from "next/image";
import { memo } from "react";
import { ActionReducerMemoryGames,ReducerFunctionMemoryGames, Decks, MemoryGamesActionType } from "@/app/lib/memory-games/definitions";

function Card({card, backside, getCard, deck, alternate} : {
    card: MemoryGamesCard;
    backside: MemoryGamesCard;
    getCard: Dispatch<any> // da modificare
    deck: MemoryGamesActionType;
    alternate: boolean;
}) {
    const [isFlipped, setIsFlipped] = useState(false)

    function Alternate(b : boolean, s: string) : boolean {
        if (s === 'one') {
            return b
        } else {
            return !b
        }
    }

    const flipping = () => {
        // Controlla se la carta è già abbinata prima di girarla
        if (!card.isMatched) {
          getCard({
            type: deck,
            cardId: card.id,
          });
    
          // Gira la carta
          if (!isFlipped) {
            setIsFlipped(true);
    
            setTimeout(() => {
              setIsFlipped(false);
            }, 3000);
          }
        }
      };
    
    return (
        <div className={`${(card.isMatched || Alternate(alternate, deck)) && 'pointer-events-none'} w-12 h-16  sm:w-24 sm:h-32 lg:w-40 lg:h-56 rounded-lg overflow-hidden my-1 border ${card.isMatched? "border-green-600" : "border-black"} border-3`} onClick={flipping} key={card.name}>
            <Image src={card.isMatched || isFlipped ? card.url: backside.url} alt={isFlipped? card.name: backside.name} className="w-full h-full object-cover"></Image>
        </div>
    )
}

export default memo(Card)