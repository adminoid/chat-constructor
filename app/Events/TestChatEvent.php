<?php

namespace App\Events;

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

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($message)
    {
        $this->message = $message;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastWith()
    {
        // This must always be an array. Since it will be parsed with json_encode()

        usleep(500000);
        return ['message' => 'kuuk-237'];

//        return [
//            'message' => $this->message,
//        ];

    }

    public function broadcastAs()
    {
        return 'ClientChat';
    }

    public function broadcastOn()
    {
        return new PrivateChannel('chat.client.' . 2370000);
    }

}
