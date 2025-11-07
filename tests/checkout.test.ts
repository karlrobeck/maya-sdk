import { describe, it, beforeAll, expect } from "bun:test";
import { MayaClient } from "../src/client";
import type { MayaCheckoutRequest } from "../src/services/types";
import { MayaError, MayaPaymentErrorCodes } from "../src/errors";

type CheckOutTestCases = {
	name: string;
	input: MayaCheckoutRequest;
	success: boolean;
	expectedError?: MayaError;
};

describe("Checkout API test", () => {
	let client: MayaClient;

	beforeAll(() => {
		client = new MayaClient("SANDBOX", {
			publicKey: "pk-Z0OSzLvIcOI2UIvDhdTGVVfRSSeiGStnceqwUE7n0Ah",
			secretKey: "sk-X8qolYjy62kIzEbr0QRK1h4b4KDVHaNcwMYk39jInSl",
		});
	});

	const cases: CheckOutTestCases[] = [
		{
			name: "should create a checkout link with valid values",
			input: {
				totalAmount: { value: 100.0, currency: "PHP" },
				requestReferenceNumber: crypto.randomUUID(),
			},
			success: true,
		},
		{
			name: "should throw an error with invalid values",
			input: {
				// biome-ignore lint/suspicious/noExplicitAny: for test case only
				totalAmount: { value: "string", currency: "PHP" } as any,
				requestReferenceNumber: crypto.randomUUID(),
			},
			expectedError: new MayaError(
				"Validation error",
				MayaPaymentErrorCodes.INVALID_JSON_FORMAT,
			),
			success: false,
		},
		{
			name: "should create a checkout with basic user information",
			input: {
				totalAmount: { value: 100.0, currency: "PHP" },
				buyer: {
					firstName: "john james",
					lastName: "doe",
					billingAddress: {
						city: "Caloocan",
						countryCode: "PH",
						line1: "123 street",
						line2: "Village subdivision",
						state: "NCR",
						zipCode: "1400",
					},
				},
				items: [
					{
						name: "Shoe box",
						totalAmount: {
							value: 100,
							details: {
								discount: 0.5,
								subtotal: 100,
								serviceCharge: 10,
								shippingFee: 150,
								tax: 20,
							},
						},
					},
				],
				requestReferenceNumber: crypto.randomUUID(),
			},
			success: true,
		},
	];

	it.each(cases)("$name", async (testCase) => {
		const response = async () =>
			await client.checkout.createCheckout(testCase.input).send();

		if (testCase.success) {
			const result = await response();
			expect(result.checkoutId).not.toBeUndefined();
			expect(result.redirectUrl).not.toBeUndefined();
		} else {
			expect(response).toThrowError(testCase.expectedError);
		}
	});
});
