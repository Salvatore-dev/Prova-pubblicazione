import { Icon_treasury, Item_treasury } from "./definitions";

export function isConvertibleToNumber(str: string): boolean {
    const numberRegex = /^[0-9]+$/;
    return numberRegex.test(str);
  }

  export const treasury_campaign : Item_treasury[] = [
    {
        name: 'Belladonna',
        icon: Icon_treasury.elementum,
        purchase: 3,
        sale: 2,
        quantity: 0
    },
    {
        name: 'Cuoio',
        icon: Icon_treasury.elementum,
        purchase: 2,
        sale: 1,
        quantity: 0
    },
    {
        name: 'Legno',
        icon: Icon_treasury.elementum,
        purchase: 1,
        sale: 1,
        quantity: 0
    },
    {
        name: 'Mandragora',
        icon: Icon_treasury.elementum,
        purchase: 3,
        sale: 2,
        quantity: 0
    },
    {
        name: 'Sale',
        icon: Icon_treasury.elementum,
        purchase: 2,
        sale: 1,
        quantity: 0
    },
    {
        name: 'Mercurio',
        icon: Icon_treasury.alchimia,
        purchase: 2,
        sale: 1,
        quantity: 0
    },
    {
        name: 'Pietra Filosofale',
        icon: Icon_treasury.alchimia,
        purchase: 9,
        sale: 5,
        quantity: 0
    },
    {
        name: 'Realgar',
        icon: Icon_treasury.alchimia,
        purchase: 4,
        sale: 2,
        quantity: 0
    },
    {
        name: 'Zolfo',
        icon: Icon_treasury.alchimia,
        purchase: 2,
        sale: 1,
        quantity: 0
    },
    {
        name: 'Argento',
        icon: Icon_treasury.pecunia,
        purchase: 5,
        sale: 3,
        quantity: 0
    },
    {
        name: 'Metallo',
        icon: Icon_treasury.pecunia,
        purchase: 3,
        sale: 2,
        quantity: 0
    },
    {
        name: 'Oro',
        icon: Icon_treasury.pecunia,
        purchase: 6,
        sale: 3,
        quantity: 0
    }
]

export const popolini : Item_treasury = {
  name: 'Popolini',
  icon: Icon_treasury.popolino,
  quantity: 0
}