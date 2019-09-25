<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>Chat debugging</title>

        <link href="{{ asset('css/chat.css') }}" rel="stylesheet">
    </head>
    <body>

        <div class="flex-center position-ref full-height">

            <div class="content">
                <div id="chat"></div>
            </div>

        </div>

        <script src="{{ asset('/js/chat.js') }}"></script>

    </body>
</html>
