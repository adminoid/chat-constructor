<?php

namespace App\Events;

use App\User;
use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class TestChatEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    protected $message;

//    public $user;
    /**
     * @var User
     */
    public $user;

    /**
     * Create a new event instance.
     *
     * @param $message
     * @param User $user
     */
    public function __construct($message, User $user)
    {
        $this->message = $message;
        $this->user = $user;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return Channel|array
     */
    public function broadcastWith()
    {
        // This must always be an array. Since it will be parsed with json_encode()

        usleep(500000);
//        return ['message' => 'kuuk-237'];

        return [
            'message' => $this->message,
        ];

    }

    public function broadcastAs()
    {
        return 'ClientChat';
    }

    public function broadcastOn()
    {
//        return new PrivateChannel('chat.' . $this->message->user_id);

        return new PrivateChannel('chat.' . $this->user->id);

    }

}
