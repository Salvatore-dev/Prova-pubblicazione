- Note per autenticazione manuale -

istruzioni da:
https://nextjs.org/docs/app/building-your-application/authentication

libreria per autenticazione:
https://zod.dev/
si possono personalizzare i controlli. per controlli lato server sul formdata da client

libreria per criptare password
https://www.npmjs.com/package/bcrypt

libreria per crittografare sessioni :
https://www.npmjs.com/package/jose

libreria per assicurarsi un ambiente server:
https://www.npmjs.com/package/server-only?activeTab=versions
 - bisogna dichiarare il modulo typescript : declare module 'server-only'; in un file declarations.d.ts in radice.

 Articolo informativo da next:
 https://nextjs.org/blog/security-nextjs-server-components-actions

 Per approfondire middleware:
 https://nextjs.org/docs/app/building-your-application/routing/middleware

1. si inizia con una form di acquisizione lato client.
2. nel file definition si imposta lo schema di zod che verifica gli imput del form
3. in un file auth.tsx si gestisce la chiamata lato server 
    - considerare per gli user quali valori prevedere, in particolare i ruoli per le successive autorizzazioni. non passare al client dati sensibili, ma id utenti, ruoli, e dati che possono servire al cliente per personalizzazione navigazione.
4. nella form client si usano:
    due hooks: useFormState e useFormStatus di react
    useFormState per gestire lo stato della form
    useFormStatus per gestire lo stato di validazione della form

    il tag form viene gestito con l'attributo action.

5. passiamo alla gestione delle sessioni:
    - serve una chiave segreta di 32 caratteri
    - usare la tua libreria di gestione delle sessioni preferita per crittografare e decrittografare le sessioni, useremo Jose e React server-only pacchetto per garantire che la logica di gestione della sessione venga eseguita solo sul server.

6. creare un middleware.ts in radice

7. creare un file dal.ts in lib. deve contenere almeno una funzione di verifica della sessione. funzione che poi e' richiamata altrove per verificare accesso, autorizzazioni e ruoli... verifysession, e volendo anche un getuser quando occorrono infromazioni, non sensibili in cache del user. 
    7. 1. si puo creare un file dto.ts che gestiscea seconda dei ruoli quali dati passare al client vedi esempio su documentazione.
8. aplicazione della verifica sessione del "dal" in:
 - componenti server
 - azioni server
 - gestione percorsi "api/route.ts



prossimo step:
https://next-auth.js.org/getting-started/introduction