<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class EntryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'identify' => $this->identify,
            'value' => $this->value,
            'due_date' => $this->due_date,
            'created' => Carbon::instance($this->created_at)->toDateString(),
            'category' => $this->category->name,
            'type' => $this->category->type 
        ];
    }
}
