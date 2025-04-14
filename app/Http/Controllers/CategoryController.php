<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::orderBy('created_at', 'desc')->get();
        return Inertia::render('Categories/Index',  [
            'categories' => $categories
        ]);
    }

    public function create()
    {
        return Inertia::render('Categories/Create');
    }

    public function store(Request $request)
    {
//        dd($request->all());
        $validation = Validator::make($request->all(), [
           'name' => 'required|string|max:100',
           'description' => 'required|string|max:2000',
           'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:4096',
        ]);

        if ($validation->fails()) {
            return redirect()->back()->withErrors($validation)->withInput();
        }
        $category = new Category();
        $category->name = $request->name;
        $category->slug = str($request->name)->slug();
        $category->description = $request->description;

        if ($request->hasFile('image')) {
            $category->image = Storage::disk('public')->put('categories', $request->file('image'));
        }
        $category->save();
        return to_route('categories.index')->with('success', 'Category created successfully.');

    }

    public function show(Category $category)
    {
        return Inertia::render('Categories/Show', [
            'category' => new CategoryResource($category)
        ]);
    }

    public function edit(Category $category)
    {
        return Inertia::render('Categories/Edit', [
            'category' => new CategoryResource($category)
        ]);
    }

    public function update(Request $request, Category $category)
    {
        Validator::make($request->all(), [
            'name' => 'required|string|max:100',
            'description' => 'required|string|max:2000',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:4096',
        ]);
        $category->name = $request->name;
        $category->slug = str($request->name)->slug();
        $category->description = $request->description;
        $category['image'] = $category->image;

        if ($request->hasFile('image')) {
            // Delete the old image if it exists
            if ($category->image) {
                Storage::disk('public')->delete($category->image);
            }
            $category->image = Storage::disk('public')->put('categories', $request->file('image'));
        }
        $category->save();
        return to_route('categories.index')->with('success', 'Category updated successfully.');
    }

    public function destroy($id)
    {
        $category = Category::find($id);
        if ($category) {
            $category->delete();
            return redirect()->route('categories.index');
        }
        return redirect()->route('categories.index')->with('error', 'Category not found.');
    }
}
