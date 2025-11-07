import { type MayaRequestExecutor, MayaAPIEnvironment } from "../client";
import {
	MayaError,
	MayaPaymentErrorCodes,
	type MayaErrorResponse,
} from "../errors";

/** Represents the total amount for a checkout transaction. */
export type TotalAmount = {
	/** The transaction amount in the specified currency */
	value: number;
	/** The ISO 4217 currency code (e.g., 'PHP', 'USD') */
	currency: string;
};
/** Represents address information for billing or shipping. */
export type Address = {
	/** First line of the address */
	line1?: string;
	/** Second line of the address */
	line2?: string;
	/** City name */
	city?: string;
	/** State or province */
	state?: string;
	/** Postal or ZIP code */
	zipCode?: string;
	/** ISO 3166-1 alpha-2 country code */
	countryCode?: string;
};
/**
 * Represents buyer/payer information for a checkout transaction.
 * All fields are optional for basic buyer specification. For Kount fraud protection, additional fields may be required.
 */
export type Buyer = {
	/** Buyer's first name */
	firstName?: string;
	/** Buyer's last name */
	lastName?: string;
	/** Buyer's middle name */
	middleName?: string;
	/** Buyer's email address */
	email?: string;
	/** Buyer's phone number */
	phone?: string;
	/** Buyer's gender ('M' or 'F') */
	sex?: string;
	/** Buyer's birth date (format: YYYY-MM-DD) */
	birthDate?: string;
	/** Billing address information */
	billingAddress?: Address;
	/** Shipping address information */
	shippingAddress?: Address;
};
/** Represents a single item in a checkout transaction. */
export type Item = {
	/** Name or title of the item */
	name: string;
	/** Number of units of this item */
	quantity: number;
	/** Price per unit */
	price: number;
	/** Description of the item */
	description?: string;
	/** Total amount for this item (quantity * price) */
	totalAmount?: number;
};
/**
 * Represents redirect URLs for checkout flow events.
 * These URLs are where the customer will be redirected after payment.
 */
export type RedirectUrl = {
	/** URL to redirect to on successful payment */
	success?: string;
	/** URL to redirect to on failed payment */
	failure?: string;
	/** URL to redirect to when customer cancels the transaction */
	cancel?: string;
};
/**
 * Represents additional metadata for a checkout transaction.
 * Used to provide extra data such as payment facilitator information.
 */
export type Metadata = {
	[key: string]: unknown;
};
/**
 * Represents the complete request body for creating a checkout transaction with Maya.
 * This type follows the Maya Checkout API v1 specification.
 * @see https://developers.maya.ph/reference/createv1checkout
 */
export type MayaCheckoutRequest = {
	/** The total amount and currency for the transaction (required) */
	totalAmount: TotalAmount;
	/** Merchant's unique reference number for the transaction (required, 1-36 chars) */
	requestReferenceNumber: string;
	/** Information about the buyer/payer (optional for basic, required for Kount fraud protection) */
	buyer?: Buyer;
	/** List of items being purchased */
	items?: Item[];
	/** URLs for post-payment redirects */
	redirectUrl?: RedirectUrl;
	/** Additional custom data for the transaction */
	metadata?: Metadata;
};

export type MayaCheckoutResponse = {
	checkoutId?: string;
	redirectUrl?: string;
};

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

	validate(): MayaCheckoutRequest {
		// todo: use validation library for this case
		if (this.request) {
			return this.request;
		}
		throw new MayaError(
			"Invalid parameters",
			MayaPaymentErrorCodes.INVALID_JSON_FORMAT,
		);
	}

	createCheckout(request: MayaCheckoutRequest) {
		this.request = request;
		return this;
	}

	async send(fetcher: typeof fetch): Promise<MayaCheckoutResponse> {
		const request = this.validate();

		const response = await fetcher(this.environment.apiUrl, {
			method: "POST",
			headers: {
				accept: "application/json",
				"content-type": "application/json",
				authorization: `Basic ${this.config.publicKey}:${this.config.secretKey}`,
			},
			body: JSON.stringify(request),
		});

		if (!response.ok) {
			const error = (await response.json()) as MayaErrorResponse;

			const errorCode = Object.values(MayaPaymentErrorCodes).find(
				(code) => code === error.code,
			);

			if (!errorCode) {
				throw new MayaError(
					"Internal Error",
					MayaPaymentErrorCodes.PAY_WITH_MAYA_ERROR,
				);
			}

			throw new MayaError(error.error, errorCode, error.reference);
		}

		return response as MayaCheckoutResponse;
	}
}
