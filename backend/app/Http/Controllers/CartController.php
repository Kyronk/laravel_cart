<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cart;
use PhpParser\Node\Stmt\TryCatch;

class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        try {
            $user_id = $request->user_id || 1;
            $cartList = Cart::where('user_id', $user_id)->get();
            $total =  0;
            foreach ($cartList as $cartItem) {
                $total += $cartItem->total;
            }

            // $result = $total.map(({ $total }) => $total);
            // foreach($total as $total=>$val){
            //     $total= $val;
            // };
            // $total->map(function($value) {
            //     $totalAll  += $value;
            // });


            // dd($totalALl);
            // $cartTotal = $totalALl->count(Cart::select('total')->where('user_id', 1)->get());

            // $cartCount = $cartList->

            return response()->json([
                'cart' => $cartList,
                'total' => $total,
            ], 200);
        } catch (\Exception $ex) {
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
    public function addToCart(Request $request)
    {
        try {
            $user_id = $request->user_id || 1;
            // tìm sản phẩm đã có trong giỏ hàng chưa. nếu có thì update, không thì thêm mới.
            // điều kiện: dựa vào product_id và user_id
            $getItemInCart = Cart::where('product_id', $request->product_id)->where('user_id', $user_id)->first();
            if (isset($getItemInCart)) {
                //nếu tồn tại sản phẩm thì tăng số lượng và cập nhập lại tổng.
                $getItemInCart->count = $getItemInCart->count + $request->count;
                $getItemInCart->total = $getItemInCart->count * $getItemInCart->product_price;

                //save update
                $getItemInCart->save();
            }
            // không tìm thấy sản phẩm nào, thêm mới
            else {
                $cart = new Cart;
                $cart->user_id = 1;
                $cart->product_id = $request->product_id;
                $cart->product_name = $request->product_name;
                $cart->product_photo = $request->product_photo;
                $cart->product_price = $request->product_price;
                $cart->count = $request->count;
                $cart->total = ($request->count * $request->product_price);

                $cart->save();
            }

            return response()->json([
                'message' => 'item added successfully!'
            ], 200);
        } catch (\Exception $ex) {
            //throw $th;
            return response()->json([
                'message' => $ex
            ], 400);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
        $cart = Cart::find($id)->count;
        if ($cart) {
            return response()->json([
                'cartItem' => $cart,
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
        // $cartItem = Cart::find($id)->count;
        $cartItem = Cart::find($id);
        if ($cartItem) {
            $price = $cartItem->product_price;
            $cartItem->count = $request->count;

            $cartItem->total = ($request->count * $price);
            $cartItem->update();

            return response()->json([
                'message' => 'cart is update successfully~',
            ], 200);
        } else {
            return response()->json([
                'message' => 'no cart item'
            ], 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $cartItem = Cart::find($id);
        if ($cartItem) {
            $cartItem->delete();
            return response()->json([
                'message' => 'product deleted is successfully'
            ], 200);
        } else {
            return response()->json([
                'message' => 'product is not found',
            ], 404);
        }
    }

    public function updateManyItem(Request $request)
    {
        try {
            $listItem = $request->data;

            // return response()->json([
            //     'list data' => $listItem
            // ],200);

            foreach ($listItem as $item) {
                $cartItem = Cart::where('id', $item['id'])->first();
                if (isset($cartItem)) {
                    $cartItem->count = $item['count'];
                    $cartItem->total = $item['count'] * $cartItem->product_price;

                    $cartItem->save();
                }
            }
            return response()->json([
                'message' => "update many item successfully",
            ], 200);
        } catch (\Exception $ex) {
            return response()->json([
                'message' => $ex,
            ], 400);
        }
    }

    public function destroyManyItem(Request $request)
    {
        // try {
        //     $listDelete = $request->data;
        //     dd($listDelete);
        // }catch (\Exception $ex) {
        //     return response()->json([
        //         'message' => $ex,
        //     ],400);
        // }

        try {
            $listDelete = $request->data;
            foreach ($listDelete as $i) {
                $cartItem = Cart::where('id', $i['id'])->first();
                if (isset($cartItem)) {
                    $cartItem->delete();
                }
            }

            return response()->json([
                'message' => 'delete many item is successfully'
            ], 200);
        } catch (\Exception $ex) {
            return response()->json([
                'message' => $ex
            ], 400);
        }
    }
}
