<!doctype html>
<html class="no-js" lang="">
<head>
  <link href='http://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="/css/style.css">
  <script src="/js/vendor/modernizr.js"></script>
  <link rel="shortcut icon" href="/favicon.ico" />
</head>
<body>
<!--[if lte IE 8]>
  <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
<![endif]-->
<%= content %>
<script src="/js/vendor/fastclick.js"></script>
<script src="/js/app.js"></script>
<script>
  reactspa.renderToDom();
</script>
</body>
</html>
