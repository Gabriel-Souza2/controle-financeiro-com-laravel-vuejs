<?php

namespace App\Http\Resources;

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
            'type' => $this->type,
            'category' => $this->category->name,
        ];
    }
}
