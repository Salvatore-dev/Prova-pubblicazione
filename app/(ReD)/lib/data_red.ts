
export const regex_link = /\[(.+?)\]\((https:\/\/www\.[^\)]+)\)/;

export const regex_note = new RegExp(/\[\^\d+\].$/);

export const regex_image = /^!\[([^\]]+)\]\s*\(([^)]+)\)/;

export const regex_local_link = /\[([^\]]+)\]\((\.{0,2}\/[^\)]+)\)/;

export function convertDateString(date: Date): string {

    // Estrai il giorno, mese e anno dall'oggetto Date
    const giorno: string = date.getDate().toString().padStart(2, '0');
    const mese: string = date.getMonth().toString().padStart(2, '0'); // getMonth() restituisce un valore da 0 a 11
    const anno: number = date.getFullYear();

    // Restituisci la data nel formato "12 settembre 2024"
    return `${anno}-${mese}-${giorno}`;
}
export function convertDateToItalianString(date: Date): string {
    // Definisci i mesi in italiano
    const mesi: string[] = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'];

    // Estrai il giorno, mese e anno dall'oggetto Date
    const giorno: number = date.getDate();
    const mese: string = mesi[date.getMonth()]; // getMonth() restituisce un valore da 0 a 11
    const anno: number = date.getFullYear();

    // Restituisci la data nel formato "12 settembre 2024"
    return `${giorno} ${mese} ${anno}`;
}