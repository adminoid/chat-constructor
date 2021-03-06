<!doctype html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>This is private panel for customers</title>
    <link rel="stylesheet" href="{{ asset('/css/customer.css') }}">
</head>
<body>

<div id="customer-app"></div>

<footer>
    <div class="copy">
        &copy; 2019
    </div>
</footer>

<div id="modal-window"></div>

<div id="modal-form"></div>

<script src="{{ asset('/js/customer.js') }}"></script>

</body>
</html>
