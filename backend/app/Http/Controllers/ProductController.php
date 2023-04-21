<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // $product = Product::all();
        // return response()->json([
        //     'products' => $product
        // ], 200);
        
        // paginate
        try {
            $per_page = \Request::get('per_page') ?: 10;

            $productList = Product::paginate($per_page);
            $productList->appends(['per_page' => 'per_page']);

            return response()->json([
                'access' => 'true',
                'productList' => $productList
            ], 200);

        }catch(\Exception $ex) {
            //throw $th
            return response()->json([
                'access' => 'fail',
                'message' => $ex
            ], 400);
        };
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        // validate
        // $request->validate([
        //     'name' => 'required| max: 191',
        //     'description' => 'required| max: 400',
        //     'photo' => 'required| max: 1000',
        //     'price' => 'required| max: 10',
        // ]);
        //
        
        $product = new Product;
        $product->name_product = $request->name_product;
        $product->description = $request->description;
        $product->photo = $request->photo;
        $product->price = $request->price;
        $product->save();
        return response()->json([
            'message' => 'product Added successfully'
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $product = Product::find($id);
        if ($product) {
            return response()->json([
                'product' => $product,
            ], 200);
        } else {
            return response()->json([
                'message' => 'No Product Found'
            ], 404);
        };
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
