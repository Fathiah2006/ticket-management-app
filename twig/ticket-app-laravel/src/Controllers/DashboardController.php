<?php
namespace App\Controllers;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Slim\Views\Twig;

class DashboardController {
    public function index(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface {
        $view = Twig::fromRequest($request);
        $user = $_SESSION['ticketapp_session'] ?? null;
        $ticketsFile = __DIR__ . '/../../storage/tickets.json';
        $tickets = file_exists($ticketsFile) ? json_decode(file_get_contents($ticketsFile), true) : [];
        return $view->render($response, 'dashboard.twig', ['user'=>$user, 'tickets'=>$tickets]);
    }
}
