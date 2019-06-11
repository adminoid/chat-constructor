<?php

namespace App\Policies;

use App\User;
use App\Block;
use App\Bot;
use Illuminate\Auth\Access\HandlesAuthorization;

class BlockPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view the block.
     *
     * @param  \App\User  $user
     * @param  \App\Block  $block
     * @return mixed
     */
    public function view(User $user, Block $block)
    {
        return $user->id === $block->bot->user_id;
    }

    /**
     * Determine whether the user can create blocks.
     *
     * @param  \App\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        //
    }

    /**
     * Determine whether the user can update the block.
     *
     * @param User $user
     * @param Block $block
     * @param Bot $bot
     * @return bool
     */
    public function update(User $user, Block $block)
    {

        return $user->id === $block->bot->user_id;

    }

    /**
     * Determine whether the user can delete the block.
     *
     * @param  \App\User  $user
     * @param  \App\Block  $block
     * @return mixed
     */
    public function delete(User $user, Block $block)
    {
        return $user->id === $block->bot->user_id;
    }

    /**
     * Determine whether the user can restore the block.
     *
     * @param  \App\User  $user
     * @param  \App\Block  $block
     * @return mixed
     */
    public function restore(User $user, Block $block)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the block.
     *
     * @param  \App\User  $user
     * @param  \App\Block  $block
     * @return mixed
     */
    public function forceDelete(User $user, Block $block)
    {
        //
    }
}
