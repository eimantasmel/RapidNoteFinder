<?php

namespace App\Controller;

use App\Entity\Note;
use App\Repository\NoteRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api', name: 'api_')]
class NoteController extends AbstractController
{
    public function __construct(
        private NoteRepository $noteRepository,
        private EntityManagerInterface $em
    ) {
    }

    #[Route('/note/add', name: 'add_note', methods: 'POST')]
    public function addNote(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent());
        try {
            $note = $this->noteRepository
                ->addNote($data->description, $data->content, 'pavargau');

            return $this->json($note->toArray());
        } catch (\Exception $e) {
            return $this->json(['error' => $e->getMessage()], $e->getCode());
        }
    }

    #[Route('/note/find/{description}', name: 'find_note', methods: 'GET')]
    public function findNote(Request $request, string $description): JsonResponse
    {
        try {
            $note = $this->noteRepository
                ->findNoteByDescription($description);
            return $this->json($note->toArray());
        } catch (\Exception $e) {
            return $this->json(['error' => $e->getMessage()], $e->getCode());
        }
    }
}
