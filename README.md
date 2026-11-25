# Buenos Días Amor — mensajes automáticos y programados

Este proyecto conserva la página de GitHub Pages y OneSignal, y añade: un mensaje romántico diario a las 10:00 y cuatro recordatorios de agua a las 11:00, 14:00, 17:00 y 21:00 (zona horaria `America/Argentina/Buenos_Aires`). Las frases se alternan con listas de mensajes; no es un modelo de IA generando texto nuevo, sino un generador que combina y rota frases. Los mensajes manuales del panel `admin.html` siguen funcionando.

## Antes de empezar
- No pongas claves privadas en HTML/JS ni en GitHub.
- Si una clave REST de OneSignal se compartió en un chat o archivo público, revocala y generá una nueva.
- Los envíos automáticos se dirigen solo al External ID `novia-buenos-dias`. La página asigna ese ID al dispositivo que la activa; verificá que el ID esté asociado únicamente al teléfono destinatario. Para probar ahora, si solo tu teléfono está registrado con ese ID, las notificaciones automáticas te llegarán a vos.

## Configuración (se hace una vez)
1. Subí los archivos de este ZIP a la raíz del repositorio `leandronesci-ai.github.io`, reemplazando los archivos correspondientes. Conservá `OneSignalSDKWorker.js` en la raíz.
2. En Supabase → SQL Editor, ejecutá el contenido completo de `supabase/schema.sql`. Es seguro volver a ejecutarlo para crear la tabla nueva `recurring_delivery_log`.
3. En Supabase → Edge Functions → Secrets, configurá: `SUPABASE_URL`, `SUPABASE_SECRET_KEY` (clave secreta de servidor, nunca publishable), `ONESIGNAL_APP_ID`, `ONESIGNAL_API_KEY` (REST API Key nueva) y `SCHEDULER_SECRET` (una cadena larga aleatoria). No compartas ni subas esos valores a GitHub.
4. En GitHub, repositorio → Settings → Secrets and variables → Actions, creá `SUPABASE_URL` y `SCHEDULER_SECRET` con los mismos valores que en Supabase.
5. Desplegá la función con Supabase CLI desde la carpeta raíz del proyecto:
   ```bash
   supabase login
   supabase link --project-ref sjnwkdcftmiqucnkicsr
   supabase functions deploy send-scheduled --no-verify-jwt
   ```
6. En GitHub → Actions, ejecutá manualmente `Revisar mensajes programados` con `Run workflow`. Revisá el resultado. El cron se ejecuta cada cinco minutos, pero GitHub puede retrasarlo.
7. Probá primero con el dispositivo que ya recibe notificaciones. Luego hacé que tu novia abra `https://leandronesci-ai.github.io/`, active las notificaciones y verificá en OneSignal que su suscripción está asociada al External ID `novia-buenos-dias` antes de dejar los avisos dirigidos a ella.

## Horarios y rotación
- 10:00: buenos días romántico con tono tierno, apasionado y gracioso.
- 11:00, 14:00, 17:00 y 21:00: recordatorio de agua.
- Cada evento tiene una clave única por fecha y horario para evitar duplicados. El procesador admite hasta 90 minutos de retraso del cron.

## Seguridad
El envío ocurre desde una Supabase Edge Function. La REST API Key de OneSignal y la clave secreta de Supabase viven solo en secretos del servidor. No uses `enviar.js` como script público con claves: el envío automático se realiza desde `supabase/functions/send-scheduled/index.ts`.
