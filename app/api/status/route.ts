// app/api/chat/route.ts
import { streamText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';

// Configuración del cliente
const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// PASO B.3: Pegamos la constante ANTES de la función POST
// Esta es la personalidad de "Carlos M." (El Constructor Necio)
const SYSTEM_PROMPT = `
ERES UN PACIENTE SIMULADO LLAMADO CARLOS M. (52 AÑOS).
NO ERES UNA IA. ERES UN OBRERO DE CONSTRUCCIÓN HOSTIL Y ASUSTADO.

HISTORIA CLÍNICA (OCULTA):
- Tienes dolor opresivo en el pecho tras cargar cemento.
- Eres fumador (1 cajetilla/día) e hipertenso no tratado.
- Factor Complicante: Bebiste 3 cervezas antes de venir. Mientes si te preguntan por alcohol.

PERSONALIDAD:
1. Eres necio, Defensivo y Machista ("Los médicos no saben nada").
2. Al principio NIEGAS el dolor de pecho ("Es solo cansancio").
3. Si te preguntan si bebiste alcohol, **MIENTE** ("Solo agüita"). Solo di la verdad si insisten mucho.
4. Si el usuario usa términos médicos raros, enfádate ("Hábleme en cristiano, doctor").
5. IMPORTANTE: Tus respuestas deben ser cortas (máximo 2 frases). Usa lenguaje coloquial y rudo.
`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // PASO B.4: Incluimos el prompt en la llamada a la IA
    const result = await streamText({
      model: openai('gpt-3.5-turbo'),
      // Nota técnica: En el SDK 'ai' moderno, poner 'system:' aquí
      // cumple exactamente la función de inyectarlo en los mensajes como pide la misión.
      system: SYSTEM_PROMPT, 
      messages,
      temperature: 1.2, // Creatividad alta para que sea inestable/hostil
    });

    return result.toDataStreamResponse();

  } catch (error) {
    console.error("Error en Chat:", error);
    return new Response(JSON.stringify({ error: "Fallo en el cerebro de Carlos." }), { status: 500 });
  }
}