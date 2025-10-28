<?php
namespace App\Controllers;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Slim\Views\Twig;

class AuthController {
    private $usersFile;
    public function __construct() {
        $this->usersFile = __DIR__ . '/../../storage/users.json';
    }

    private function readUsers(): array {
        if (!file_exists($this->usersFile)) {
            $default = [
                ['email'=>'demo@example.com','password'=>'password123','name'=>'Demo User']
            ];
            file_put_contents($this->usersFile, json_encode($default, JSON_PRETTY_PRINT));
            return $default;
        }
        return json_decode(file_get_contents($this->usersFile), true) ?? [];
    }

    private function saveUsers(array $users) {
        file_put_contents($this->usersFile, json_encode($users, JSON_PRETTY_PRINT));
    }

    public function showLogin($request, $response): ResponseInterface {
        $view = Twig::fromRequest($request);
        return $view->render($response, 'auth/login.twig');
    }

    public function showSignup($request, $response): ResponseInterface {
        $view = Twig::fromRequest($request);
        return $view->render($response, 'auth/signup.twig');
    }

    public function login($request, $response): ResponseInterface {
        $data = (array)$request->getParsedBody();
        $users = $this->readUsers();
        foreach ($users as $u) {
            if ($u['email'] === ($data['email'] ?? '') && $u['password'] === ($data['password'] ?? '')) {
                $_SESSION['ticketapp_session'] = ['email'=>$u['email'],'name'=>$u['name']];
                return $response->withHeader('Location','/dashboard')->withStatus(302);
            }
        }
        $view = Twig::fromRequest($request);
        return $view->render($response, 'auth/login.twig', ['error'=>'Invalid credentials']);
    }

    public function signup($request, $response): ResponseInterface {
        $data = (array)$request->getParsedBody();
        $errors = [];
        if (empty($data['name'])) $errors[] = 'Name required';
        if (empty($data['email']) || !filter_var($data['email'], FILTER_VALIDATE_EMAIL)) $errors[] = 'Valid email required';
        if (empty($data['password']) || strlen($data['password']) < 6) $errors[] = 'Password min 6 chars';
        if ($errors) {
            $view = Twig::fromRequest($request);
            return $view->render($response, 'auth/signup.twig', ['errors'=>$errors, 'old'=>$data]);
        }

        $users = $this->readUsers();
        foreach ($users as $u) {
            if ($u['email'] === $data['email']) {
                $view = Twig::fromRequest($request);
                return $view->render($response, 'auth/signup.twig', ['errors'=>['Email exists'], 'old'=>$data]);
            }
        }

        $users[] = ['name'=>$data['name'],'email'=>$data['email'],'password'=>$data['password']];
        $this->saveUsers($users);
        return $response->withHeader('Location','/login')->withStatus(302);
    }

    public function logout($request, $response): ResponseInterface {
        unset($_SESSION['ticketapp_session']);
        return $response->withHeader('Location','/')->withStatus(302);
    }
}
