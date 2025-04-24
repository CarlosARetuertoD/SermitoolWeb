<?php
  /**Este código gestiona el envío de mensajes mediante un formulario, utilizando la biblioteca "PHP Email Form".
  * Requiere la biblioteca "PHP Email Form"
  * La biblioteca "PHP Email Form" está disponible solo en la versión profesional de la plantilla.
  * La biblioteca debe subirse a: vendor/php-email-form/php-email-form.php
  * Para obtener más información y ayuda: https://bootstrapmade.com/php-email-form/
  */

  // Reemplaza 'contact@example.com' con tu dirección de correo real, a la que se enviarán los mensajes
  $receiving_email_address = 'contact@example.com';

  // Verifica si el archivo de la biblioteca existe en la ruta especificada.  
  // La variable $php_email_form se asigna con la ruta al archivo.
  if( file_exists($php_email_form = '../assets/vendor/php-email-form/php-email-form.php' )) {
    // Si el archivo existe, se incluye en el script para poder utilizar la biblioteca
    include( $php_email_form );
  } else {
    // Si el archivo no existe, se detiene la ejecución mostrando un mensaje de error
    die( 'Unable to load the "PHP Email Form" Library!');
  }

  // Se crea una instancia del objeto PHP_Email_Form para gestionar el envío del formulario
  $contact = new PHP_Email_Form;
  // Se activa la funcionalidad AJAX para enviar el formulario de manera asíncrona
  $contact->ajax = true;
  
  // Configuración del correo a enviar:
  $contact->to = $receiving_email_address; // Dirección de destino para recibir los mensajes
  $contact->from_name = $_POST['name'];      // Asigna el valor del campo "name" enviado por el formulario
  $contact->from_email = $_POST['email'];    // Asigna el valor del campo "email" enviado por el formulario
  $contact->subject = $_POST['subject'];     // Asigna el valor del campo "subject" enviado por el formulario

  /*
  // Descomenta el siguiente bloque si deseas utilizar SMTP para enviar el correo.
  // Es necesario ingresar las credenciales correctas de tu servidor SMTP.
  $contact->smtp = array(
    'host' => 'example.com',   // Host del servidor SMTP
    'username' => 'example',   // Nombre de usuario SMTP
    'password' => 'pass',      // Contraseña SMTP
    'port' => '587'            // Puerto SMTP (normalmente 587 para TLS)
  );
  */

  // Agrega los mensajes del formulario a la instancia del objeto,
  // Asocia cada campo con una etiqueta descriptiva para estructurar el mensaje final.
  $contact->add_message( $_POST['name'], 'From');
  // Agrega el nombre del remitente con la etiqueta "From"
  $contact->add_message( $_POST['email'], 'Email');
  // Agrega el correo electrónico con la etiqueta "Email"
  $contact->add_message( $_POST['message'], 'Message', 10);
  // Agrega el mensaje con la etiqueta "Message" y un valor de 10 para prioridad o formato

  // Envía el correo y muestra la respuesta (la función send() retorna un mensaje que se imprime)
  echo $contact->send();
?>
