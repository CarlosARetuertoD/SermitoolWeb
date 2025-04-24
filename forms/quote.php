<?php
  /**Esta estructura permite gestionar el envío de mensajes a través del formulario de contacto utilizando la biblioteca "PHP Email Form". 
   * Requiere la biblioteca "PHP Email Form"
   * La biblioteca "PHP Email Form" está disponible sólo en la versión profesional de la plantilla.
   * La biblioteca debe subirse a: vendor/php-email-form/php-email-form.php
   */

  // Sustituye 'contact@example.com' por tu dirección de correo real a la que se enviarán los mensajes
  $receiving_email_address = 'contact@example.com';

  // Verifica si el archivo de la biblioteca PHP Email Form existe en la ruta especificada
  if( file_exists($php_email_form = '../assets/vendor/php-email-form/php-email-form.php' )) {
    // Si el archivo existe, se incluye para poder usar la biblioteca
    include( $php_email_form );
  } else {
    // Si el archivo no se encuentra, se finaliza el script mostrando un mensaje de error
    die( 'Unable to load the "PHP Email Form" Library!');
  }

  // Se crea una nueva instancia de la clase PHP_Email_Form para procesar el formulario
  $contact = new PHP_Email_Form;
  // Se activa la opción AJAX para enviar el formulario de forma asíncrona
  $contact->ajax = true;
  
  // Configuración del destinatario y datos del email a enviar:
  $contact->to = $receiving_email_address;  // Dirección de correo a la que se enviará el mensaje
  $contact->from_name = $_POST['name'];       // Asigna el nombre del remitente, obtenido del formulario (campo "name")
  $contact->from_email = $_POST['email'];     // Asigna el correo electrónico del remitente, obtenido del formulario (campo "email")
  $contact->subject = 'Request for a quote';  // Asigna el asunto del mensaje

  /* 
  // Descomenta este bloque si deseas usar SMTP para el envío de correos. 
  // Asegúrate de ingresar las credenciales correctas de tu servidor SMTP.
  $contact->smtp = array(
    'host' => 'example.com',        // Dirección del servidor SMTP
    'username' => 'example',        // Nombre de usuario del SMTP
    'password' => 'pass',           // Contraseña del SMTP
    'port' => '587'                 // Puerto SMTP (generalmente 587 para TLS)
  );
  */

  // Agrega los mensajes usando los datos enviados por el formulario (variable $_POST)
  $contact->add_message( $_POST['name'], 'From');
  // Añade el campo "name" con la etiqueta "From"
  $contact->add_message( $_POST['email'], 'Email');
  // Añade el campo "email" con la etiqueta "Email"
  $contact->add_message( $_POST['phone'], 'Phone');
  // Añade el campo "phone" con la etiqueta "Phone"
  $contact->add_message( $_POST['message'], 'Message', 10);
  // Añade el mensaje del formulario con la etiqueta "Message" y un límite (o peso) de 10, que puede usarse para establecer prioridad o formato

  // Envía el mensaje y muestra el resultado. La función send() retorna la respuesta que luego se imprime.
  echo $contact->send();
?>
