<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(\App\User::class)->create([
            'email' => 'admin@user.com'
        ]);

        factory(\App\User::class)->create([
            'email' => 'user@user.com'
        ]);
    }
}
