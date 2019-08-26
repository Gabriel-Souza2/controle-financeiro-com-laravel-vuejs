<?php

namespace App\Models;

use App\User;
use Illuminate\Database\Eloquent\Model;

class Entry extends Model
{
    protected $fillable = ['identify', 'value', 'due_date', 'user_id', 'category_id', 'type'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
