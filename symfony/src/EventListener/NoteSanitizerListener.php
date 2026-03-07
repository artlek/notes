<?php

namespace App\EventListener;

use App\Entity\Note;
use Doctrine\Bundle\DoctrineBundle\Attribute\AsEntityListener;
use Doctrine\ORM\Events;
use HTMLPurifier;

#[AsEntityListener(event: Events::prePersist, entity: Note::class)]
#[AsEntityListener(event: Events::preUpdate, entity: Note::class)]
class NoteSanitizerListener
{
    public function __construct(
        private HTMLPurifier $purifier
    ) {}

    public function __invoke(Note $note): void
    {
        $rawContent = $note->getContent();
        if ($rawContent)
        {
            $note->setContent($this->purifier->purify($rawContent));
        }
    }
}
