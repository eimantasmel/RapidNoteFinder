<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
#[Route('/api', name: 'api_')]
class NoteController extends AbstractController
{
    #[Route('/note/add', name: 'add_note', methods: 'POST')]
    public function addNote(Request $request): JsonResponse
    {
        $response = new JsonResponse([
            'message' => 'Welcome to your new controller!',
            'path' => 'src/Controller/NoteController.php',
        ]);
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->headers->set('Access-Control-Allow-Methods', 'POST');
        $response->headers->set('Access-Control-Allow-Headers', 'Content-Type, XMLHttpRequest, Authorization, X-Requested-With');
        // Set CORS headers to allow requests from any origin

//        $response->headers->set('Access-Control-Allow-Origin', '*');
//        $response->headers->set('Access-Control-Allow-Methods', 'POST');
//        $response->headers->set('Access-Control-Allow-Headers', 'Content-Type');

        return $response;
    }
}
