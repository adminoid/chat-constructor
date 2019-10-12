<?php

namespace App\Http\Middleware;

use Closure;
use App\User;
use Illuminate\Support\Facades\Auth;

class RegisterClient
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

        // if user not logged in, create it
        if (Auth::check()) {
            echo $user = auth()->user()->id;
        } else {

            $userClient = new User;
            $userClient->client = true;
            $userClient->save();

            $userClient->client()->create([
                'ip' => $request->ip(),
                'user_agent' => $request->header('User-Agent'),
                // bot_id
            ]);

            Auth::login($userClient);

        }

//        $request->setUserResolver(function () use ($userClient) {
//            return $userClient;
//        });

        return $next($request);
    }
}
