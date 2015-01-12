<?php
/* Ad hoc functions to make the examples marginally prettier.*/
function isWebRequest()
{
  return isset($_SERVER['HTTP_USER_AGENT']);
}

function pageHeader()
{
  $ret = "";
  if (isWebRequest()) {
    $ret .= "<!doctype html>
    <html>
    <head>
      <link href='http://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css' rel='stylesheet' type='text/css' />
      <script src=\"http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js\"></script>
      <script src=\"http://code.jquery.com/ui/1.11.2/jquery-ui.js\"></script>
      <script src=\"http://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js\"></script>
      \n";
  }
  return $ret;
}

function initPageHeader()
{
  $ret = "";
  if (isWebRequest()) {
    $ret .= "<!doctype html>
    <html>
    <head>
      <title>TaskAmbient Initialization</title>
      <link href='styles/style.css' rel='stylesheet' type='text/css' />
      <link href='styles/init-cal.css' rel='stylesheet' type='text/css' />
      <link href='http://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css' rel='stylesheet' type='text/css' />
      <script src=\"http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js\"></script>
      <script src=\"http://code.jquery.com/ui/1.11.2/jquery-ui.js\"></script>
      <script src=\"http://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js\"></script>
      <script src=\"scripts/init-cal.js\"></script>\n";
  }
  return $ret;
}


function closeHTML()
{
    $ret = "";
    if (isWebRequest()) {
      $ret .= "</head>
      <body>\n";
    }
    return $ret;
}

function pageFooter($file = null)
{
  $ret = "";
  if (isWebRequest()) {
    // Echo the code if in an example.
    if ($file) {
      $ret .= "<h3>Code:</h3>";
      $ret .= "<pre class='code'>";
      $ret .= htmlspecialchars(file_get_contents($file));
      $ret .= "</pre>";
    }
    $ret .= "</html>";
  }
  return $ret;
}

function missingApiKeyWarning()
{
  $ret = "";
  if (isWebRequest()) {
    $ret = "
      <h3 class='warn'>
        Warning: You need to set a Simple API Access key from the
        <a href='http://developers.google.com/console'>Google API console</a>
      </h3>";
  } else {
    $ret = "Warning: You need to set a Simple API Access key from the Google API console:";
    $ret .= "\nhttp://developers.google.com/console";
  }
  return $ret;
}

function missingClientSecretsWarning()
{
  $ret = "";
  if (isWebRequest()) {
    $ret = "
      <h3 class='warn'>
        Warning: You need to set Client ID, Client Secret and Redirect URI from the
        <a href='http://developers.google.com/console'>Google API console</a>
      </h3>";
  } else {
    $ret = "Warning: You need to set Client ID, Client Secret and Redirect URI from the";
    $ret .= "Google API console:\nhttp://developers.google.com/console";
  }
  return $ret;
}

function missingServiceAccountDetailsWarning()
{
  $ret = "";
  if (isWebRequest()) {
    $ret = "
      <h3 class='warn'>
        Warning: You need to set Client ID, Email address and the location of the Key from the
        <a href='http://developers.google.com/console'>Google API console</a>
      </h3>";
  } else {
    $ret = "Warning: You need to set Client ID, Email address and the location of the Key from the";
    $ret .= "Google API console:\nhttp://developers.google.com/console";
  }
  return $ret;
}
