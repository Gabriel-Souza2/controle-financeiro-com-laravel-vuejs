<?php

namespace Tests\Feature;

use App\User;
use Carbon\Carbon;
use Tests\TestCase;
use App\Models\Entry;
use App\Models\Category;
use App\Http\Resources\EntryResource;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class EntryTest extends TestCase
{

    private function getEntryData()
    {
        $category = $this->user->categories()->save(factory(Category::class)->make());

        $data['request'] = $data['response'] = factory(Entry::class)
        ->make([
            'due_date' => now()->toDateString()
        ])
        ->toArray();

        $data['request']['category_id'] = $category->id;
        $data['response']['category'] = $category->name;

        return $data;

    }

    private function createEntry()
    {
        $data = $this->getEntryData();
        $entry = (new Entry())->fill($data['request']);
        $entry = $this->user->entries()->save($entry);

        return $entry;
    }

    public function test_create_entry()
    {
        $data = $this->getEntryData();

        $response = $this->actingAs($this->user, 'api')
            ->json('POST', route('entries.store'), $data['request'])
            ->assertStatus(201)
            ->assertJson(['data' => $data['response']]);
    }

    public function test_show_entry()
    {

        $entry = $this->createEntry();

        $entryResouce = new EntryResource($entry);

        $this->actingAs($this->user, 'api')
            ->json('GET', route('entries.show', $entry->id))
            ->assertStatus(200)
            ->assertResource($entryResouce);
    }

    public function test_update_entry()
    {
        $entry = $this->createEntry();

        $data = $this->getEntryData();

        $response = $this->actingAs($this->user, 'api')
            ->json('PUT', route('entries.update', $entry->id), $data['request'])
            ->assertStatus(200)
            ->assertJson(['data' => $data['response']]);
            
    }

    public function test_delete_entry()
    {
        $entry = $this->createEntry();

        $response = $this->actingAs($this->user, 'api')
            ->json('DELETE', route('entries.destroy', $entry->id))
            ->assertStatus(204);
    }

    public function test_list_entry()
    {
        $category = $this->user->categories()->save(factory(Category::class)->make());
        
        $entries = factory(Entry::class, 10)->create([
            'user_id' => $this->user->id,
            'category_id' => $category->id
        ]);
        
        $entriesResource = EntryResource::collection($entries);
        
        $response = $this->actingAs($this->user, 'api')
            ->json('GET', route('entries.index'))
            ->assertStatus(200)
            ->assertResource($entriesResource);
    }

    public function test_user_try_pass_category_its_not_yours_or_not_exits()
    {
        $user2 = factory(User::class)->create();

        $data = $this->getEntryData();

        $this->actingAs($user2, 'api')
            ->json('POST', route('entries.store'), $data['request'])
            ->assertStatus(422);
    }

}
