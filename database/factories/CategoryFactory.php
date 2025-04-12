<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = $this->faker->sentence(2);
        return [
            'name' => rtrim($title, '.'),
            'slug' => Str::slug($title, '-'),
            'image' => 'https://placehold.co/600x400',
            'description' => fake()->paragraph(2),
        ];
    }
}
