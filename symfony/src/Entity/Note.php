<?php

namespace App\Entity;

use App\Repository\NoteRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use App\State\NoteProcessor;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Patch;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use ApiPlatform\Metadata\Delete;
use Symfony\Component\Serializer\Attribute\Groups;

#[ORM\Entity(repositoryClass: NoteRepository::class)]
#[ApiResource(operations: [
    new GetCollection(
        security: "is_granted('ROLE_USER')",
    ),
    new Get(
        normalizationContext: ['groups' => ['note:read', 'note:item:read']],
        security: "is_granted('ROLE_USER') and object.getUser() == user"
    ),
    new Post(
        processor: NoteProcessor::class,
        uriTemplate: '/notes/add',
    ),
    new Delete(
        uriTemplate: '/notes/delete/{id}',
        security: "is_granted('CAN_DELETE_NOTE', object)",
        securityMessage: 'You are not allowed to delete this note.',
    ),
    new Patch(
        uriTemplate: '/notes/{id}',
        security: "is_granted('CAN_EDIT_NOTE', object)",
        securityMessage: 'You are not allowed to edit this note.',
        denormalizationContext: ['groups' => ['note:patch']],
        status: 200
    )
])]
#[UniqueEntity(
    fields: ['name', 'user'],
    message: 'This note already exists.'
)]
#[ORM\UniqueConstraint(name: 'uniq_note_user', columns: ['name', 'user_id'])]
class Note
{
    public function __construct()
    {
        $this->createdAt = new \DateTimeImmutable();
    }

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['note:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 50)]
    #[Assert\NotBlank(message: 'Note name can not be empty')]
    #[Assert\Length(
        min: 2,
        max: 50,
        minMessage: 'Minimum 2 characters',
        maxMessage: 'Maximum 50 characters'
    )]
    #[Assert\Regex(
        pattern: '/^[\p{L}\p{N}\s\-_]+$/u',
        message: 'Incorrect characters. Allowed only: numbers, letters, dash and underscore.'
    )]
    #[Groups(['note:read', 'note:patch'])]
    private ?string $name = null;

    #[ORM\Column(length: 50)]
    #[Assert\Regex(
        pattern: '/^[\p{L}\p{N}\s\-_]{2,}+$/u',
        message: 'Incorrect characters. Min. 2 marks. Allowed only: numbers, letters, dash and underscore.'
    )]
    #[Groups(['note:read', 'note:patch'])]
    private ?string $description = null;

    #[ORM\ManyToOne(inversedBy: 'notes')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $user = null;
    
    #[Assert\Length(
        min: 0,
        max: 1000000,
        maxMessage: 'Content is too long. Max {{ limit }} characters.'
    )]
    #[ORM\Column(type: 'text', length: 4294967295, nullable: true)]
    #[Groups(['note:patch', 'note:read'])]
    private ?string $content = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['note:read'])]
    private ?\DateTimeImmutable $createdAt = null;

    #[ORM\ManyToOne]
    #[Groups(['note:read', 'note:patch'])]
    #[ORM\JoinColumn(onDelete: 'SET NULL')]
    private ?Category $Category = null;

    #[ORM\ManyToOne(inversedBy: 'notes')]
    private ?User $owner = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(?string $content): static
    {
        $this->content = $content;

        return $this;
    }

    public function updateContent(string $newContent): self
    {
        $this->content = $newContent;
        $this->createdAt = new \DateTimeImmutable();

        return $this;
    }

    public function getcreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setcreatedAt(?\DateTimeImmutable $createdAt): static
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getCategory(): ?Category
    {
        return $this->Category;
    }

    public function setCategory(?Category $Category): static
    {
        $this->Category = $Category;

        return $this;
    }

    public function getOwner(): ?User
    {
        return $this->owner;
    }

    public function setOwner(?User $owner): static
    {
        $this->owner = $owner;

        return $this;
    }
}
