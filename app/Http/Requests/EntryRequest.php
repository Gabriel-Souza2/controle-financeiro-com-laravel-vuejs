<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Http\FormRequest;

class EntryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    public function messages()
    {
        return [
            'category_id.in' => 'The category is invalid'
        ];
    }
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'identify' => 'required|max:255',
            'value' => 'required',
            'due_date' => 'required|date|after_or_equal:yesterday',
            'category_id' => [
                'required',
                Rule::in(Auth::user()->categories->map(function($category){
                    return $category->id;
                }))
            ]

        ];
    }
}
