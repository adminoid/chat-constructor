<?php

namespace App\Http\Middleware;

use Closure;
use App;

class DetectLocalization
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {

        $langStuff = $request->server('HTTP_ACCEPT_LANGUAGE');
        $lang = substr($langStuff, 0, 2);
        $acceptLang = ['ru', 'en'];
        $langAccepted = in_array($lang, $acceptLang, true) ? $lang : 'en';

        // ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,fr;q=0.6,de;q=0.5,la;q=0.4,sv;q=0.3
        // en-US,en;q=0.9,ru-RU;q=0.8,ru;q=0.7,fr;q=0.6,de;q=0.5,la;q=0.4,sv;q=0.3

        App::setLocale($langAccepted);

        return $next($request);
    }
}
