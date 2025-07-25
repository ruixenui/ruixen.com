"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaPaypal } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { codeStringForm_01 } from "./Form_01";

export const codeStringForm_02= `"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaPaypal } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";

export default function Form_02() {
    return (
        <div className="flex items-center justify-center p-4">
            <Card className="max-w-md w-full rounded-2xl shadow-lg">
                <CardContent className="p-6 space-y-6">
                    {/* Payment Options */}
                    <div className="grid grid-cols-3 gap-4">
                        <Button variant="outline" className="h-14 p-0 flex items-center justify-center">
                            <FaPaypal fontSize={24} />
                            <span className="text-md">PayPal</span>
                        </Button>
                        <Button variant="outline" className="h-14 p-0 flex items-center justify-center">
                            <FaApple fontSize={24} />
                            <span className="text-md">Pay</span>
                        </Button>
                        <Button variant="outline" className="h-14 p-0 flex items-center justify-center">
                            <FcGoogle fontSize={30} />
                            <span className="text-md">Pay</span>
                        </Button>
                    </div>

                    {/* Separator */}
                    <div className="flex items-center text-gray-500">
                        <hr className="flex-grow border-t border-gray-300" />
                        <span className="mx-2 text-xs font-medium">or pay using credit card</span>
                        <hr className="flex-grow border-t border-gray-300" />
                    </div>

                    {/* Credit Card Form */}
                    <div className="space-y-4">
                        <div className="space-y-1">
                            <Label htmlFor="cardholder-name">Card holder full name</Label>
                            <Input id="cardholder-name" name="cardholderName" placeholder="Enter your full name" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="card-number">Card Number</Label>
                            <Input
                                id="card-number"
                                name="cardNumber"
                                placeholder="0000 0000 0000 0000"
                                inputMode="numeric"
                            />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="expiry">Expiry Date / CVV</Label>
                            <div className="flex gap-4">
                                <Input
                                    id="expiry"
                                    name="expiryDate"
                                    placeholder="01/23"
                                />
                                <Input
                                    id="cvv"
                                    name="cvv"
                                    placeholder="CVV"
                                    inputMode="numeric"
                                    type="password"
                                />
                            </div>
                        </div>
                    </div>

                    <Button className="w-full" size="lg">
                        <Link href="https://ruixen.com?utm_source=21st.dev&utm_medium=Form_02&utm_campaign=ruixen" target="_blank">
                            Checkout
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
`;

export default function Form_02() {
    return (
        <div className="flex items-center justify-center p-4">
            <Card className="max-w-md w-full rounded-2xl shadow-lg">
                <CardContent className="p-6 space-y-6">
                    {/* Payment Options */}
                    <div className="grid grid-cols-3 gap-4">
                        <Button variant="outline" className="h-14 p-0 flex items-center justify-center">
                            <FaPaypal fontSize={24} />
                            <span className="text-md">PayPal</span>
                        </Button>
                        <Button variant="outline" className="h-14 p-0 flex items-center justify-center">
                            <FaApple fontSize={24} />
                            <span className="text-md">Pay</span>
                        </Button>
                        <Button variant="outline" className="h-14 p-0 flex items-center justify-center">
                            <FcGoogle fontSize={30} />
                            <span className="text-md">Pay</span>
                        </Button>
                    </div>

                    {/* Separator */}
                    <div className="flex items-center text-gray-500">
                        <hr className="flex-grow border-t border-gray-300" />
                        <span className="mx-2 text-xs font-medium">or pay using credit card</span>
                        <hr className="flex-grow border-t border-gray-300" />
                    </div>

                    {/* Credit Card Form */}
                    <div className="space-y-4">
                        <div className="space-y-1">
                            <Label htmlFor="cardholder-name">Card holder full name</Label>
                            <Input id="cardholder-name" name="cardholderName" placeholder="Enter your full name" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="card-number">Card Number</Label>
                            <Input
                                id="card-number"
                                name="cardNumber"
                                placeholder="0000 0000 0000 0000"
                                inputMode="numeric"
                            />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="expiry">Expiry Date / CVV</Label>
                            <div className="flex gap-4">
                                <Input
                                    id="expiry"
                                    name="expiryDate"
                                    placeholder="01/23"
                                />
                                <Input
                                    id="cvv"
                                    name="cvv"
                                    placeholder="CVV"
                                    inputMode="numeric"
                                    type="password"
                                />
                            </div>
                        </div>
                    </div>

                    <Button className="w-full" size="lg">
                        <Link href="https://ruixen.com?utm_source=21st.dev&utm_medium=Form_02&utm_campaign=ruixen" target="_blank">
                            Checkout
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
