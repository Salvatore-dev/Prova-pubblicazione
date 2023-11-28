import { MemoryGamesCard } from "./definitions";

import retro from "@/public/memory-game/cards/Retro.jpg";
import fiveP from "@/public/memory-game/cards/cinque-picche.jpg";
import tenF from "@/public/memory-game/cards/dieci-fiori.jpg";
import queenC from "@/public/memory-game/cards/donna-cuori.jpg";
import queenf from "@/public/memory-game/cards/donna-fiori.jpg";
import jackF from "@/public/memory-game/cards/jack-fiori.jpg";
import jackQ from "@/public/memory-game/cards/jack-quadri.jpg";
import nineC from "@/public/memory-game/cards/nove-cuori.jpg";
import nineP from "@/public/memory-game/cards/nove-picche.jpg";
import kingQ from "@/public/memory-game/cards/re-quadri.jpg";
import sevenQ from "@/public/memory-game/cards/sette-quadri.jpg";
import threeF from "@/public/memory-game/cards/tre-fiori.jpg";
import threeQ from "@/public/memory-game/cards/tre-quadri.jpg";


const totalCards : MemoryGamesCard[] = [
    {
      id: 1,
      url: fiveP,
      name: "Cinque di Picche",
      isMatched: false,
    },
    {
      id: 2,
      url: tenF,
      name: "Dieci di Fiori",
      isMatched: false,
    },
    {
      id: 3,
      url: queenC,
      name: "Donna di Cuori",
      isMatched: false,
    },
    {
      id: 4,
      url: queenf,
      name: "Donna di Fiori",
      isMatched: false,
    },
    {
      id: 5,
      url: jackF,
      name: "Jack di Fiori",
      isMatched: false,
    },
    {
      id: 6,
      url: jackQ,
      name: "Jack di Quadri",
      isMatched: false,
    },
    {
      id: 7,
      url: nineC,
      name: "Nove di Cuori",
      isMatched: false,
    },
    {
      id: 8,
      url: nineP,
      name: "Nove di Picche",
      isMatched: false,
    },
    {
      id: 9,
      url: kingQ,
      name: "Re di Quadri",
      isMatched: false,
    },
    {
      id: 10,
      url: sevenQ,
      name: "Sette di Quadri",
      isMatched: false,
    },
    {
      id: 11,
      url: threeF,
      name: "Tre di Fiori",
      isMatched: false,
    },
    {
      id: 12,
      url: threeQ,
      name: "Tre di Quadri",
      isMatched: false,
    },
  ];

  const backSideCards : MemoryGamesCard = {
    id: 0,
    url: retro,
    name: "dorso della carta",
    isMatched: false,
  };

  export {totalCards, backSideCards }