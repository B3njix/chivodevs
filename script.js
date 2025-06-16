function doPost(e) {
  try {
    // Verificar si el evento existe
    if (!e) {
      throw new Error("No se recibió un evento válido (e es undefined). Verifica la solicitud POST.");
    }
    Logger.log('Evento recibido: ' + JSON.stringify(e));

    // ID de la hoja de cálculo de Google Sheets
    var sheetId = '1MXeywU97L5HT_AZbuPHGc168xzxsaA4zstMqQsO6Buo';
    Logger.log('Intentando abrir hoja con ID: ' + sheetId);
    var spreadsheet = SpreadsheetApp.openById(sheetId);
    Logger.log('Hoja de cálculo abierta: ' + (spreadsheet ? 'Sí' : 'No'));
    var sheet = spreadsheet.getSheetByName("Hoja 1");
    Logger.log('Hoja encontrada: ' + (sheet ? 'Sí' : 'No'));

    // Verificar si la hoja existe
    if (!sheet) {
      throw new Error("La hoja 'Hoja 1' no fue encontrada en la hoja de cálculo con ID: " + sheetId);
    }

    // Obtener los datos del formulario
    var nombre = e.parameter.Nombre || 'No proporcionado';
    var correo = e.parameter.Correo || 'No proporcionado';
    var mensaje = e.parameter.Mensaje || 'No proporcionado';

    // Validación básica de correo
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (correo !== 'No proporcionado' && !emailRegex.test(correo)) {
      throw new Error("El correo electrónico no tiene un formato válido.");
    }

    var fecha = new Date();

    // Log para depuración
    Logger.log('Datos recibidos - Nombre: ' + nombre + ', Correo: ' + correo + ', Mensaje: ' + mensaje);

    // Agregar los datos a la hoja de cálculo
    sheet.appendRow([fecha, nombre, correo, mensaje]);

    // Respuesta exitosa
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    // Manejo de errores
    Logger.log('Error: ' + error.toString());
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
