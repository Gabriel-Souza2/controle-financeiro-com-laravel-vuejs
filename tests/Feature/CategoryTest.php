<?php

namespace Tests\Feature;

use App\User;
use Tests\TestCase;
use App\Models\Entry;
use App\Models\Category;
use App\Http\Resources\CategoryResource;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class CategoryTest extends TestCase
{

    private function category_factory()
    {
        return $this->user->categories()->save(factory(Category::class)->make());
    }

    public function test_create_category()
    {
        $data = factory(category::class)->make()->toArray();

        $this->actingAs($this->user, 'api')
            ->json('POST', route('categories.store'), $data)
            ->assertStatus(201)
            ->assertJson(['data' => $data]);
    }

    public function test_update_category()
    {
        $category = $this->category_factory();

        $data = factory(category::class)->make()->toArray();
        
        $this->actingAs($this->user, 'api')
            ->json('PUT', route('categories.update', $category->id), $data)
            ->assertStatus(200)
            ->assertJson(['data' => $data]);
    }

    public function test_delete_category()
    {
        $category = $this->category_factory();

        $this->actingAs($this->user, 'api')
            ->json('DELETE', route('categories.destroy', $category->id))
            ->assertStatus(204);
    }

    public function test_list_categories()
    {
        $categories = factory(Category::class, 10)->create(['user_id' => $this->user->id]);

        $resouce = CategoryResource::collection($categories);

        $response = $this->actingAs($this->user, 'api')
            ->json('GET', route('categories.index'))
            ->assertStatus(200)
            ->assertResource($resouce);
    }

    public function test_delete_many_categories()
    {
        $categories = factory(Category::class, 3)->create(['user_id' => $this->user->id])->toArray();

        $ids = array_map(function($category){
            return $category['id'];
        }, $categories);

        $this->actingAs($this->user, 'api')
            ->json('DELETE', route('categories.delete_many'), $ids)
            ->assertStatus(204);
        
        array_map(function($category){
            $this->assertDatabaseMissing('categories', $category);
        }, $categories);
    }

    public function test_user_try_delete_category_its_not_your(){

        $category = $this->category_factory();

        $user2 = factory(User::class)->create();

        $this->actingAs($user2, 'api')
            ->json('DELETE', route('categories.destroy',  $category->id))
            ->assertStatus(401);
    }

    public function test_user_try_update_category_its_not_your(){

        $category = $this->category_factory();

        $user2 = factory(User::class)->create();

        $data = ['name' => 'update category'];

        $this->actingAs($user2, 'api')
            ->json('PUT', route('categories.update',  $category->id), $data)
            ->assertStatus(401);
    }
}
