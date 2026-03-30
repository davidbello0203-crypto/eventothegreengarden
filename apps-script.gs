// ════════════════════════════════════════════════════════════
//  The Green Garde — RSVP → Google Sheets
//  Instrucciones:
//  1. Abre https://script.google.com y crea un nuevo proyecto
//  2. Pega TODO este código
//  3. Cambia SHEET_ID por el ID de tu hoja de Google Sheets
//     (lo encuentras en la URL: .../spreadsheets/d/ESTE_ID/edit)
//  4. Clic en "Implementar" → "Nueva implementación"
//     Tipo: Aplicación web
//     Ejecutar como: Yo
//     Acceso: Cualquier persona (incluso anónima)
//  5. Copia la URL que te da y pégala en index.html donde dice
//     "TU_APPS_SCRIPT_URL_AQUI"
// ════════════════════════════════════════════════════════════

const SHEET_ID  = '1JPi_LLWamX1F8OmHOk3SIlDYJKPmiOKNK9VN_5FB1Hw';
const TAB_NAME  = 'Confirmaciones'; // nombre de la pestaña

function doPost(e) {
  try {
    const data   = JSON.parse(e.postData.contents);
    const ss     = SpreadsheetApp.openById(SHEET_ID);
    let   sheet  = ss.getSheetByName(TAB_NAME);

    // Crear pestaña y encabezados si no existen
    if (!sheet) {
      sheet = ss.insertSheet(TAB_NAME);
      sheet.appendRow(['Fecha', 'Nombre', 'Personas']);
      sheet.getRange(1, 1, 1, 3).setFontWeight('bold');
    }

    sheet.appendRow([
      data.fecha   || new Date().toLocaleString('es-MX'),
      data.nombre  || '',
      data.personas || 1
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Permite OPTIONS preflight
function doGet(e) {
  return ContentService
    .createTextOutput('OK')
    .setMimeType(ContentService.MimeType.TEXT);
}
