<?php

use App\Models\Entry;
use App\Models\Category;
use Illuminate\Database\Seeder;

class CategoriesAndEntriesTablesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(Category::class, 5)->create(['user_id' => 1])->each(function ($category) {
            $category->entries()->createMany(
                factory(Entry::class, 5)->make(['user_id' => 1])->toArray()
            );
        });
    }
}
