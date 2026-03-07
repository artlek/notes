<?php

namespace App\Security\Voter;

use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use App\Entity\Note;
use App\Entity\User;

final class NoteVoter extends Voter
{
    public const EDIT = 'CAN_EDIT_NOTE';
    public const VIEW = 'CAN_VIEW_NOTE';
    public const DELETE = 'CAN_DELETE_NOTE';

    protected function supports(string $attribute, mixed $subject): bool
    {
        // replace with your own logic
        // https://symfony.com/doc/current/security/voters.html
        return in_array($attribute, [self::EDIT, self::VIEW, self::DELETE])
            && $subject instanceof \App\Entity\Note;
    }

    protected function voteOnAttribute(string $attribute, mixed $subject, TokenInterface $token): bool
    {
        $user = $token->getUser();

        // if the user is anonymous, do not grant access
        if (!$user instanceof User) {
            return false;
        }

        /** @var Note $note */
        $note = $subject;

        $owner = $note->getUser();
        if (!$owner) {
            return false;
        }

        return $owner->getId() === $user->getId();

        return false;
    }
}
