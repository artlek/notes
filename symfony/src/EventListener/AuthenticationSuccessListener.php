<?php

namespace App\EventListener;

use App\Entity\User;
use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;;

class AuthenticationSuccessListener
{
    public function onAuthenticationSuccessResponse(AuthenticationSuccessEvent $event): void
    {
        $user = $event->getUser();
        if (!$user instanceof User) {
            return;
        }
        $data = $event->getData();
        $data['user'] = [
            'name' => $user->getName(),
            'email' => $user->getEmail(),
            'status' => $user->getStatus(),
        ];
        $event->setData($data);
    }
}
