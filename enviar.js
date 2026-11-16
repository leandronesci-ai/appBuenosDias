const saludos = [
  "¡Buen día amor! ☀️",
  "Despierta hermosa 🥰",
  "Buenos días mi vida ❤️",
  "¡Arriba reina! 🌸",
  "Hola mi amor 💕"
];

const mensajes = [
  "Quiero que sepas que te amo muchísimo.",
  "Hoy me levanté pensando en lo lindo que es tenerte.",
  "Sos lo mejor que me pasó, te amo con todo mi corazón.",
  "No te olvides nunca de lo mucho que te amo.",
  "Te amo más que ayer y menos que mañana."
];

const cierres = [
  "Que tengas un día hermoso ✨",
  "Te mando un beso gigante 😘",
  "Ojalá tengas una mañana increíble 💖",
  "Te extraño mucho 🥰"
];

const elegir = (lista) => lista[Math.floor(Math.random() * lista.length)];
const fraseFinal = `${elegir(saludos)} ${elegir(mensajes)} ${elegir(cierres)}`;

async function enviarNotificacion() {
  const dominio = "api." + "onesignal" + ".com";
  const ruta = "/api/v1/" + "notifications";
  const url = "https://" + dominio + ruta;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Authorization": `Key ${process.env.ONESIGNAL_API_KEY}`
    },
    body: JSON.stringify({
      app_id: process.env.ONESIGNAL_APP_ID,
      included_segments: ["Total Subscriptions"],
      headings: { en: "Para vos ❤️", es: "Para vos ❤️" },
      contents: { en: fraseFinal, es: fraseFinal }
    })
  });
  const data = await response.json();
  console.log("Respuesta:", fraseFinal, data);
}

enviarNotificacion();
