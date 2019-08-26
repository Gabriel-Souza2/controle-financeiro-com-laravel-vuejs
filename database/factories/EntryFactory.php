<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use Carbon\Carbon;
use App\Models\Entry;
use Faker\Generator as Faker;

$factory->define(Entry::class, function (Faker $faker) {
    $date = $faker->dateTimeBetween('-8 month', '+4 month');
    if($date <= now())
    {
        $due_date = $created_at = $date;
    }
    else {
        $due_date = $date;
    }

    return [
        'identify' => $faker->word,
        'value' => rand(1, 10000),
        'due_date' => Carbon::instance($due_date)->toDateString(),
        'type' => rand(1,2) % 2 == 0 ? 'gains' : 'costs',
    ];
});
