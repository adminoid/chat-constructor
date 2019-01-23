<!doctype html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>This is private panel for customers</title>
    <link rel="stylesheet" href="{{ asset('/css/app.css') }}">
</head>
<body>

<div class="container">
    <div id="app">
        <private-root></private-root>
    </div>
</div>

<script src="{{ asset('/js/private.js') }}"></script>

</body>
</html>
