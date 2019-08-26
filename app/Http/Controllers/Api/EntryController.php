<?php

namespace App\Http\Controllers\Api;

use App\Models\Entry;
use Illuminate\Http\Request;
use App\Http\Requests\EntryRequest;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use App\Http\Resources\EntryResource;

class EntryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return EntryResource::collection(Auth::user()->entries);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request\EntryRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(EntryRequest $request)
    {
        $data = $request->all();
        $data['user_id'] = Auth::id();
        $Entry = Entry::create($data);

        return new EntryResource($Entry);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Entry  $entry
     * @return \Illuminate\Http\Response
     */
    public function show(Entry $entry)
    {
        return new EntryResource($entry);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request\EntryRequest $request
     * @param  \App\Models\Entry  $entry
     * @return \Illuminate\Http\Response
     */
    public function update(EntryRequest $request, Entry $entry)
    {
        if(Gate::allows('modification', $entry))
        {
            $entry->fill($request->all());
            $entry->save();

            return new EntryResource($entry);
        }

        return response()->json(['message' => 'unauthorized'], 401);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Entry  $entry
     * @return \Illuminate\Http\Response
     */
    public function destroy(Entry $entry)
    {
        if(Gate::allows('modification', $entry))
        {
            $entry->delete();
            return response()->json(null, 204);
        }

        return response()->json(['message' => 'unauthorized'], 401);
    }
}
