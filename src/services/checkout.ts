import { z } from "zod";
import { MayaAPIEnvironment, type MayaRequestExecutor } from "../client";
import {
	MayaError,
	type MayaErrorResponse,
	MayaPaymentErrorCodes,
} from "../errors";
import {
	CheckoutRequestSchema,
	type MayaCheckoutRequest,
	type MayaCheckoutResponse,
} from "./types";

export class MayaCheckoutService
	implements MayaRequestExecutor<MayaCheckoutRequest, MayaCheckoutResponse>
{
	private request: MayaCheckoutRequest | undefined;
	private environment: (typeof MayaAPIEnvironment)["PRODUCTION" | "SANDBOX"];
	private config: { publicKey: string; secretKey?: string };

	constructor(
		environment: keyof typeof MayaAPIEnvironment,
		config: {
			publicKey: string;
			secretKey?: string;
		},
	) {
		this.environment = MayaAPIEnvironment[environment];
		this.config = config;
	}

	/**
	 * Validates the checkout request against either Basic or Kount schema
	 * @throws {MayaError} When validation fails
	 */
	validate(): MayaCheckoutRequest {
		if (!this.request) {
			throw new MayaError(
				"Invalid parameters",
				MayaPaymentErrorCodes.INVALID_JSON_FORMAT,
			);
		}

		try {
			// Validate and return the parsed request
			return CheckoutRequestSchema.parse(this.request);
		} catch (error) {
			if (error instanceof z.ZodError) {
				throw new MayaError(
					`Validation error`,
					MayaPaymentErrorCodes.INVALID_JSON_FORMAT,
					undefined,
					error.issues,
				);
			}
			throw new MayaError(
				"Invalid parameters",
				MayaPaymentErrorCodes.INVALID_JSON_FORMAT,
			);
		}
	}

	createCheckout(request: MayaCheckoutRequest) {
		this.request = request;
		return this;
	}

	async send(fetcher: typeof fetch = fetch): Promise<MayaCheckoutResponse> {
		const request = this.validate();

		const response = await fetcher(
			`${this.environment.apiUrl}/checkout/v1/checkouts`,
			{
				method: "POST",
				headers: {
					accept: "application/json",
					"content-type": "application/json",
					authorization: `Basic ${btoa(`${this.config.publicKey}`)}`,
				},
				body: JSON.stringify(request),
			},
		);

		if (!response.ok) {
			const error = (await response.json()) as MayaErrorResponse;

			const errorCode = Object.values(MayaPaymentErrorCodes).find(
				(code) => code === error.code,
			);

			if (!errorCode) {
				throw new MayaError(
					error.error,
					MayaPaymentErrorCodes.PAY_WITH_MAYA_ERROR,
					error.reference,
				);
			}

			throw new MayaError(error.error, errorCode, error.reference);
		}

		return (await response.json()) as MayaCheckoutResponse;
	}
}
