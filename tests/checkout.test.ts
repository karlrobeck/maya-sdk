import { describe, it, beforeAll, expect } from "bun:test";
import { MayaClient } from "../src/client";
import type { MayaCheckoutRequest } from "../src/services/types";

type CheckOutTestCases = {
	name: string;
	input: MayaCheckoutRequest;
	success: boolean;
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
			success: false,
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
		}
	});
});
