import { describe, it, expect } from "bun:test";
import { MayaError, MayaPaymentErrorCodes } from "../src/errors";

describe("MayaError", () => {
	it("constructs with correct fields", () => {
		const err = new MayaError(
			"message",
			MayaPaymentErrorCodes.KEY_EXPIRED,
			"ref-123",
			{ foo: "bar" },
		);

		expect(err).toBeInstanceOf(MayaError);
		expect(err.name).toBe("MayaError");
		expect(err.message).toBe("message");
		expect(err.code).toBe(MayaPaymentErrorCodes.KEY_EXPIRED);
		expect(err.reference).toBe("ref-123");
		expect(err.data).toEqual({ foo: "bar" });
		expect(typeof err.stack).toBe("string");
	});

	it("toJSON returns expected keys", () => {
		const err = new MayaError(
			"msg",
			MayaPaymentErrorCodes.GENERIC_SYSTEM_ERROR,
		);
		const json = err.toJSON();

		expect(json.name).toBe("MayaError");
		expect(json.message).toBe("msg");
		expect(json.code).toBe(MayaPaymentErrorCodes.GENERIC_SYSTEM_ERROR);
		expect(typeof json.stack).toBe("string");
	});

	it("toString includes reference when present", () => {
		const err = new MayaError(
			"fail",
			MayaPaymentErrorCodes.PAYMENT_INVALID,
			"ref-xyz",
		);
		expect(err.toString()).toBe(
			`MayaError [${MayaPaymentErrorCodes.PAYMENT_INVALID}]: fail (Reference: ref-xyz)`,
		);
	});

	it("toString without reference", () => {
		const err = new MayaError("fail", MayaPaymentErrorCodes.PAYMENT_INVALID);
		expect(err.toString()).toBe(
			`MayaError [${MayaPaymentErrorCodes.PAYMENT_INVALID}]: fail`,
		);
	});
});
