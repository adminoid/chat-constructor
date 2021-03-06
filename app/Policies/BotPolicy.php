<?php

namespace App\Policies;

use App\User;
use App\Bot;
use Illuminate\Auth\Access\HandlesAuthorization;

class BotPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view the bot.
     *
     * @param  \App\User  $user
     * @param  \App\Bot  $bot
     * @return mixed
     */
    public function view(User $user, Bot $bot)
    {
        return $user->id === $bot->user_id;
    }

    /**
     * Determine whether the user can create bots.
     *
     * @param  \App\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        //
    }

    /**
     * Determine whether the user can update the bot.
     *
     * @param  \App\User  $user
     * @param  \App\Bot  $bot
     * @return mixed
     */
    public function update(User $user, Bot $bot)
    {
        return $user->id === $bot->user_id;
    }

    /**
     * Determine whether the user can delete the bot.
     *
     * @param  \App\User  $user
     * @param  \App\Bot  $bot
     * @return mixed
     */
    public function delete(User $user, Bot $bot)
    {
        //
    }

    /**
     * Determine whether the user can restore the bot.
     *
     * @param  \App\User  $user
     * @param  \App\Bot  $bot
     * @return mixed
     */
    public function restore(User $user, Bot $bot)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the bot.
     *
     * @param  \App\User  $user
     * @param  \App\Bot  $bot
     * @return mixed
     */
    public function forceDelete(User $user, Bot $bot)
    {
        //
    }
}
