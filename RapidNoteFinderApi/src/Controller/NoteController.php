<?php

namespace App\Controller;

use App\Entity\Note;
use App\Repository\NoteRepository;
use App\Service\RedisCacheService;
use App\Service\UploadedFileService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api', name: 'api_')]
class NoteController extends AbstractController
{
    public function __construct(
        private NoteRepository $noteRepository,
        private EntityManagerInterface $em,
        private UploadedFileService $fileService,
        private RedisCacheService $cache
    ) {
    }

    #[Route('/note/add', name: 'add_note', methods: 'POST')]
    public function addNote(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent());
        try {
            $updatedContent = $this->fileService->handleNoteContent($data->content);
            $note = $this->noteRepository
                ->addNote($data->description, $updatedContent, $data->associate);
            return $this->json($note->toArray());
        } catch (\Exception $e) {
            return $this->json(['error' => $e->getMessage()], $e->getCode());
        }
    }

    #[Route('/note/update/{id}', name: 'update_note', methods: 'PUT', priority: 1)]
    public function updateNote(Request $request, Note $note): JsonResponse
    {
        $data = json_decode($request->getContent());
        try {
            $updatedContent = $this->fileService->handleNoteContent($data->content);
            $this->fileService->removeChangedImages($updatedContent, $note->getContent());
            $note = $this->noteRepository->updateNote($note, $updatedContent);
            $this->cache->deleteItems($note->getAssociate());
            return $this->json($note->toArray());
        } catch (\Exception $e) {
            return $this->json(['error' => $e->getMessage()], $e->getCode());
        }
    }

    #[Route('/note/find', name: 'find_note', methods: 'GET')]
    public function findNote(Request $request): JsonResponse
    {
        $description = $request->query->get('description');
        $associate = $request->query->get('associate');
        try {
            $note = $this->noteRepository
                ->findNoteByDescription($description, $associate);
            if($note)
                return $this->json($note->toArray());
            else
                return $this->json(['error' => 'note not found'], Response::HTTP_BAD_REQUEST);
        } catch (\Exception $e) {
            return $this->json(['error' => $e->getMessage()], $e->getCode());
        }
    }
}
