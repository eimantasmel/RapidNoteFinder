<?php

namespace App\Middleware;

use Symfony\Component\HttpKernel\Event\ResponseEvent;


class CorsMiddleware
{
    public function handle(ResponseEvent $event)
    {
        $response = $event->getResponse();

        $response->headers->set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        $response->headers->set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    }
}