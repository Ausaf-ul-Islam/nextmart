import { adminDB } from "@/firebaseAdminPannel";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    try {
        // Debug: Check if request body exists
        if (!request.body) {
            return NextResponse.json({
                success: false,
                message: "Request body is missing",
            }, { status: 400 });
        }

        // Parse the request body safely
        let reqBody;
        try {
            reqBody = await request.json();
        } catch (error) {
            return NextResponse.json({
                success: false,
                message: "Invalid JSON format in request body",
            }, { status: 400 });
        }

        console.log("Received Request Body:", reqBody);

        const { cart, email, id, totalAmt } = reqBody;

        // Validate required fields
        if (!cart || !email || !id || totalAmt === undefined) {
            return NextResponse.json({
                success: false,
                message: "Missing required fields (cart, email, id, totalAmt)",
            }, { status: 400 });
        }

        const orderItem = {
            amount: totalAmt,
            items: cart || [],
        };

        if (cart.length > 0) {
            const userOrdersRef = adminDB
                .collection("users")
                .doc(email)
                .collection("orders")
                .doc(id);

            const userDoc = await userOrdersRef.get();

            if (!userDoc.exists) {
                await userOrdersRef.set({ email });
            }

            await userOrdersRef.set({ value: orderItem }, { merge: true });
        }

        return NextResponse.json({
            success: true,
            message: "Order saved successfully",
        });
    } catch (error) {
        console.error("Error in saveOrder API:", error);
        const errorMessage = error instanceof Error ? error.message : "An error occurred";
        return NextResponse.json({
            success: false,
            message: errorMessage,
        }, { status: 500 });
    }
};
