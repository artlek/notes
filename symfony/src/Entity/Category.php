<?php

namespace App\Entity;

use App\Repository\CategoryRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use App\State\CategoryProcessor;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Patch;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Serializer\Attribute\Groups;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use ApiPlatform\Metadata\Delete;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;

#[ORM\Entity(repositoryClass: CategoryRepository::class)]
#[ApiResource(operations: [
    new GetCollection(),
    new Post(
        processor: CategoryProcessor::class,
        uriTemplate: '/categories/add',
    ),
    new Delete(
        uriTemplate: '/categories/delete/{id}',
        security: "is_granted('CAN_DELETE_CATEGORY', object)",
        securityMessage: 'You are not allowed to delete this category.',
    ),
    new Patch(
        uriTemplate: '/categories/{id}/name',
        security: "is_granted('CAN_EDIT_CATEGORY', object)",
        securityMessage: 'You are not allowed to edit this category.',
        denormalizationContext: ['groups' => ['note:patch']],
    )
])]
#[UniqueEntity(
    fields: ['name', 'user'],
    message: 'This category already exists.'
)]
#[ORM\UniqueConstraint(name: 'uniq_category_user', columns: ['name', 'user_id'])]
class Category
{
    public function __construct()
    {
        $this->notes = new ArrayCollection();
    }

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 50)]
    #[Assert\NotBlank(message: 'Category name can not be empty')]
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
    #[Groups(['note:patch', 'note:read'])]
    private ?string $name = null;

    #[ORM\ManyToOne(inversedBy: 'categories')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $user = null;

    #[ORM\OneToMany(mappedBy: 'Category', targetEntity: Note::class)]
    private Collection $notes;

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

    /**
     * @return Collection<int, Note>
     */
    public function getNotes(): Collection
    {
        return $this->notes;
    }
}
