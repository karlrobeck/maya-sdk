import { describe, it, beforeAll, expect } from "bun:test";
import { MayaClient } from "../src/client";

describe("Checkout API test", () => {
	let client: MayaClient;

	beforeAll(() => {
		client = new MayaClient("SANDBOX", {
			publicKey: "pk-Z0OSzLvIcOI2UIvDhdTGVVfRSSeiGStnceqwUE7n0Ah",
			secretKey: "sk-X8qolYjy62kIzEbr0QRK1h4b4KDVHaNcwMYk39jInSl",
		});
	});

	it("should create a checkout link with valid values", async () => {
		const response = await client.checkout
			.createCheckout({
				totalAmount: { value: 100.0, currency: "PHP" },
				requestReferenceNumber: crypto.randomUUID(),
			})
			.send();

		expect(response.checkoutId).not.toBeUndefined();
		expect(response.redirectUrl).not.toBeUndefined();
	});
});
