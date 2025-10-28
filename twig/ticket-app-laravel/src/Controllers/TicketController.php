<?php
namespace App\Controllers;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class TicketController {
    private $file;
    public function __construct() {
        $this->file = __DIR__ . '/../../storage/tickets.json';
    }

    private function read() {
        return file_exists($this->file) ? json_decode(file_get_contents($this->file), true) : [];
    }
    private function write($data) {
        file_put_contents($this->file, json_encode($data, JSON_PRETTY_PRINT));
    }

    public function index($request, $response): ResponseInterface {
        $view = \Slim\Views\Twig::fromRequest($request);
        return $view->render($response, 'tickets/index.twig', ['tickets'=>$this->read()]);
    }

    public function store($request, $response): ResponseInterface {
        $data = (array)$request->getParsedBody();
        // minimal validation:
        if (empty(trim($data['title'] ?? ''))) {
            return $response->withJson(['error'=>'Title required'], 422);
        }
        $tickets = $this->read();
        $id = uniqid('t_', true);
        $tickets[] = [
            'id'=>$id,
            'title'=>$data['title'],
            'description'=>$data['description'] ?? '',
            'status'=>$data['status'] ?? 'open',
            'priority'=>$data['priority'] ?? 'medium'
        ];
        $this->write($tickets);
        return $response->withJson(['ticket' => end($tickets)], 201);
    }

    public function update($request, $response, $args): ResponseInterface {
        $id = $args['id'];
        $data = (array)$request->getParsedBody();
        $tickets = $this->read();
        foreach ($tickets as &$t) {
            if ($t['id'] === $id) {
                $t['title'] = $data['title'] ?? $t['title'];
                $t['description'] = $data['description'] ?? $t['description'];
                $t['status'] = $data['status'] ?? $t['status'];
                $t['priority'] = $data['priority'] ?? $t['priority'];
                $this->write($tickets);
                return $response->withJson(['ticket'=>$t]);
            }
        }
        return $response->withJson(['error'=>'Not found'], 404);
    }

    public function delete($request, $response, $args): ResponseInterface {
        $id = $args['id'];
        $tickets = $this->read();
        $filtered = array_values(array_filter($tickets, fn($t)=> $t['id'] !== $id));
        $this->write($filtered);
        return $response->withJson(['success'=>true]);
    }
}
