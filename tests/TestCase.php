<?php

namespace Tests;

use App\User;
use Faker\Factory;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication, DatabaseMigrations;

    protected $faker;
    protected $user;

    public function setUp() :void
    {
        parent::setUp();
        $this->faker = Factory::create();
        $this->user = factory(User::class)->create([
            'email' => 'teste@user.com'
        ]);
    }
}
