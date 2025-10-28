<?php
declare(strict_types=1);

use DI\Container;
use Slim\Factory\AppFactory;
use Slim\Views\Twig;
use Slim\Views\TwigMiddleware;
use App\Middleware\AuthMiddleware;

require __DIR__ . '/../vendor/autoload.php';

session_start();

// Create Container
$container = new Container();
AppFactory::setContainer($container);

// Register Twig in the container **with the app dependency**
$container->set('view', function () {
    return Twig::create(__DIR__ . '/../templates', ['cache' => false]);
});

// Create App instance
$app = AppFactory::create();

// Retrieve Twig instance from container and add middleware
$twig = $container->get('view');
$app->add(TwigMiddleware::create($app, $twig));

// ------------------- Routes -------------------
$app->get('/', \App\Controllers\HomeController::class . ':index');
$app->get('/login', \App\Controllers\AuthController::class . ':showLogin');
$app->post('/login', \App\Controllers\AuthController::class . ':login');
$app->get('/signup', \App\Controllers\AuthController::class . ':showSignup');
$app->post('/signup', \App\Controllers\AuthController::class . ':signup');
$app->get('/logout', \App\Controllers\AuthController::class . ':logout');

$app->get('/dashboard', \App\Controllers\DashboardController::class . ':index')->add(new AuthMiddleware());
$app->get('/tickets', \App\Controllers\TicketController::class . ':index')->add(new AuthMiddleware());
$app->post('/tickets', \App\Controllers\TicketController::class . ':store')->add(new AuthMiddleware());
$app->put('/tickets/{id}', \App\Controllers\TicketController::class . ':update')->add(new AuthMiddleware());
$app->delete('/tickets/{id}', \App\Controllers\TicketController::class . ':delete')->add(new AuthMiddleware());

// Run app
$app->run();
