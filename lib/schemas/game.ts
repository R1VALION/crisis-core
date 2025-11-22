// lib/schemas/game.ts
import { z } from 'zod';

// === ESQUEMAS DEL GAME LOOP ===

// 1. Esquema de la Petición de Tratamiento (Input para /api/treatment)
// Asegura que el Frontend envíe exactamente lo que esperamos.
export const TreatmentInputSchema = z.object({
  caseId: z.string().length(3).describe("ID del caso clínico actual (Ej: '001')."),
  tratamiento: z.array(z.string()).min(1).describe("Lista de medicamentos administrados."),
});

// 2. Esquema de la Respuesta del Tratamiento (Output de /api/treatment)
// Asegura que el Frontend reciba una respuesta fiable.
export const TreatmentOutputSchema = z.object({
  success: z.boolean().describe("Resultado: true si el tratamiento fue correcto."),
  mensaje: z.string().describe("Mensaje corto para el log del juego."),
  feedback_medico: z.string().describe("Feedback detallado para el feedback del Dr."),
});


// 3. Esquema del Estado del Juego (Output de /api/monitor)
// (Solo para tenerlo centralizado, ya lo usamos en monitor/route.ts)
export const MonitorOutputSchema = z.object({
  salud: z.number().min(0).max(100),
  estres: z.number().min(0).max(100),
  estado_medico: z.enum(["estable", "critico", "shock"]),
  evaluacion_interna: z.string(),
  juego_terminado: z.boolean(),
});