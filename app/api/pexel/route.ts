"use server"


export async function POST(request : FormData) {
    const rawFormData2 = Object.fromEntries(request.entries()) // metodo alternativo quando i campi di un form sono tanti
  // Test it out:
  console.log(rawFormData2);

}