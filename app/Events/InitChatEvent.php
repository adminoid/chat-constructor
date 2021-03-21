<?php

namespace App\Events;

use App\Block;
use App\User;
use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class InitChatEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    protected $initChatData;

    /**
     * @var User
     */
    public $user;

    /**
     * Create a new event instance.
     *
     * @param $initChatData
     * @param User $user
     */
    public function __construct($initChatData, User $user)
    {
        $this->initChatData = $initChatData;
        $this->user = $user;
    }

    protected function prepareData()
    {

        // get flagship
//        $flagshipBlock = Block::findOrFail($this->initChatData->flagship);
//        $messages = $this->initChatData->messages;
//        $messages = $this->initChatData;

        return [
            'init' => 'dufos',
        ];
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return Channel|array
     */
    public function broadcastWith()
    {

        return [
            'data' => $this->prepareData(),
        ];

//        usleep(500000);

//        return [
//            'messages' => $messages,
//        ];

    }

    public function broadcastAs()
    {
        return 'InitChat';
    }

    public function broadcastOn()
    {
        return new PrivateChannel('chat.' . $this->user->id);
    }

}
