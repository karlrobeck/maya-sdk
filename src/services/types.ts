import { z } from "zod";

/**
 * Shipping type enumeration
 * @enum {string}
 */
export enum ShippingType {
	/** Standard shipping */
	STANDARD = "ST",
	/** Same-day shipping */
	SAME_DAY = "SD",
}

/**
 * Gender enumeration
 * @enum {string}
 */
export enum Gender {
	/** Male */
	MALE = "M",
	/** Female */
	FEMALE = "F",
}

/** Represents amount breakdown details */
export type AmountDetails = {
	/** Subtotal value before applying discounts or additional fees */
	subtotal?: string;
	/** Discount applied on the amount */
	discount?: string;
	/** Service charge applied on the amount */
	serviceCharge?: string;
	/** Shipping fee on the amount */
	shippingFee?: string;
	/** Tax on the amount */
	tax?: string;
};

/** Represents the total amount for a checkout transaction. */
export type TotalAmount = {
	/** The transaction amount in the specified currency */
	value: number;
	/** The ISO 4217 currency code (e.g., 'PHP', 'USD') */
	currency: string;
	/** Optional amount breakdown details */
	details?: AmountDetails;
};

/** Represents contact information (phone and/or email) */
export type Contact = {
	/** Contact phone number */
	phone?: string;
	/** Contact email address */
	email?: string;
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

/** Represents shipping address with recipient information */
export type ShippingAddress = Address & {
	/** First name of the recipient */
	firstName?: string;
	/** Middle name of the recipient */
	middleName?: string;
	/** Last name of the recipient */
	lastName?: string;
	/** Recipient's phone number */
	phone?: string;
	/** Recipient's email address */
	email?: string;
	/** Shipping type */
	shippingType?: ShippingType;
};

/**
 * Represents buyer/payer information for a checkout transaction.
 * All fields are optional for basic buyer specification. For Kount fraud protection, additional fields may be required.
 */
export type Buyer = {
	/** Buyer's first name */
	firstName?: string;
	/** Buyer's middle name */
	middleName?: string;
	/** Buyer's last name */
	lastName?: string;
	/** Buyer's gender */
	sex?: Gender;
	/** Buyer's birthday in ISO 8601 format (YYYY-MM-DD) */
	birthday?: string;
	/** Date when buyer registered as a customer (YYYY-MM-DD) */
	customerSince?: string;
	/** Contact information (phone and/or email) */
	contact?: Contact;
	/** Billing address information */
	billingAddress?: Address;
	/** Shipping address information */
	shippingAddress?: ShippingAddress;
};

/** Represents amount per item */
export type ItemAmountObject = {
	/** Amount per 1 item quantity */
	value: number;
	/** Amount breakdown for 1 item quantity */
	details?: AmountDetails;
};

/** Represents total amount for all items */
export type ItemTotalAmountObject = {
	/** Amount of all quantity */
	value: number;
	/** Amount breakdown for all quantity */
	details?: AmountDetails;
};

/** Represents a single item in a checkout transaction. */
export type Item = {
	/** Name or title of the item */
	name: string;
	/** Number of units of this item */
	quantity?: number;
	/** Item code (e.g., SKU) in the merchant's inventory */
	code?: string;
	/** Description of the item */
	description?: string;
	/** Amount per unit with optional breakdown */
	amount?: ItemAmountObject;
	/** Total amount for this item (quantity * price) - required */
	totalAmount: ItemTotalAmountObject;
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
 * Represents payment facilitator details for sub-merchant transactions
 */
export type PaymentFacilitator = {
	/** Sub-merchant ID (required) */
	smi: string;
	/** Sub-merchant name (required) */
	smn: string;
	/** Sub-merchant city location (required) */
	mci: string;
	/** ISO 4217 Numeric currency code (required) */
	mpc: string;
	/** ISO 3166 Alpha-3 country code (required) */
	mco: string;
	/** Sub-merchant abbreviated state location (required if country is USA) */
	mst?: string;
	/** ISO 18245 merchant category code */
	mcc?: string;
	/** Sub-merchant postal code */
	postalCode?: string;
	/** Contact number without spaces, dashes, or parentheses */
	contactNo?: string;
	/** Sub-merchant state location in full text */
	state?: string;
	/** Sub-merchant street address */
	addressLine1?: string;
};

/**
 * Represents additional metadata for a checkout transaction.
 * Used to provide extra data such as payment facilitator information.
 */
export type Metadata = {
	/** Sub-merchant request reference number */
	subMerchantRequestReferenceNumber?: string;
	/** Payment facilitator details */
	pf?: PaymentFacilitator;
	/** Additional custom fields */
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

/**
 * Validation schemas for Maya Checkout API
 * Based on the official OpenAPI specification
 * @see https://developers.maya.ph/reference/createv1checkout
 */

// Amount validation: between 0.01 and 9,999,999
const AmountSchema = z
	.number()
	.min(0.01, "Amount must be at least 0.01")
	.max(9999999, "Amount must not exceed 9,999,999");

// Currency validation: 3-character ISO 4217 code
const CurrencySchema = z
	.string()
	.length(3, "Currency code must be exactly 3 characters")
	.toUpperCase();

// Total Amount schema with optional details
const AmountDetailsSchema: z.ZodType<AmountDetails> = z
	.object({
		subtotal: z.string().optional(),
		discount: z.string().optional(),
		serviceCharge: z.string().optional(),
		shippingFee: z.string().optional(),
		tax: z.string().optional(),
	})
	.strict();

const TotalAmountSchema: z.ZodType<TotalAmount> = z
	.object({
		value: AmountSchema,
		currency: CurrencySchema,
		details: AmountDetailsSchema.optional(),
	})
	.strict();

// Request Reference Number validation: 1-36 characters
const RequestReferenceNumberSchema = z
	.string()
	.min(1, "Request reference number must be at least 1 character")
	.max(36, "Request reference number must not exceed 36 characters");

// Contact schema
const ContactSchema: z.ZodType<Contact> = z
	.object({
		phone: z.string().optional(),
		email: z.string().email("Invalid email format").optional(),
	})
	.strict();

// Address schema
const AddressSchema: z.ZodType<Address> = z
	.object({
		line1: z.string().optional(),
		line2: z.string().optional(),
		city: z.string().optional(),
		state: z.string().optional(),
		zipCode: z.string().optional(),
		countryCode: z
			.string()
			.length(2, "Country code must be exactly 2 characters")
			.optional(),
	})
	.strict();

// Shipping Address schema with recipient info
const ShippingAddressSchema: z.ZodType<ShippingAddress> = z
	.object({
		line1: z.string().optional(),
		line2: z.string().optional(),
		city: z.string().optional(),
		state: z.string().optional(),
		zipCode: z.string().optional(),
		countryCode: z
			.string()
			.length(2, "Country code must be exactly 2 characters")
			.optional(),
		firstName: z.string().optional(),
		middleName: z.string().optional(),
		lastName: z.string().optional(),
		phone: z.string().optional(),
		email: z.string().email("Invalid email format").optional(),
		shippingType: z.nativeEnum(ShippingType).optional(),
	})
	.strict();

// Item Amount Objects
const ItemAmountObjectSchema: z.ZodType<ItemAmountObject> = z
	.object({
		value: AmountSchema,
		details: AmountDetailsSchema.optional(),
	})
	.strict();

const ItemTotalAmountObjectSchema: z.ZodType<ItemTotalAmountObject> = z
	.object({
		value: AmountSchema,
		details: AmountDetailsSchema.optional(),
	})
	.strict();

// Item schema
const ItemSchema: z.ZodType<Item> = z
	.object({
		name: z.string().min(1, "Item name is required"),
		quantity: z.number().optional(),
		code: z.string().optional(),
		description: z.string().optional(),
		amount: ItemAmountObjectSchema.optional(),
		totalAmount: ItemTotalAmountObjectSchema,
	})
	.strict();

// Basic Buyer schema
const BasicBuyerSchema: z.ZodType<Buyer> = z
	.object({
		firstName: z.string().optional(),
		middleName: z.string().optional(),
		lastName: z.string().optional(),
		sex: z.nativeEnum(Gender).optional(),
		birthday: z.string().optional(),
		customerSince: z.string().optional(),
		contact: ContactSchema.optional(),
		billingAddress: AddressSchema.optional(),
		shippingAddress: ShippingAddressSchema.optional(),
	})
	.strict();

// Kount Buyer schema (all address fields required, contact required)
const KountBuyerSchema: z.ZodType<Buyer> = z.object({
	firstName: z.string().min(1, "First name is required for Kount buyer"),
	middleName: z.string().optional(),
	lastName: z.string().min(1, "Last name is required for Kount buyer"),
	sex: z.enum(Gender).optional(),
	birthday: z.string().optional(),
	customerSince: z.string().optional(),
	contact: z.object({
		phone: z.string().optional(),
		email: z.string().email("Invalid email format"),
	}),
	billingAddress: z.object({
		line1: z.string().optional(),
		line2: z.string().optional(),
		city: z.string().optional(),
		state: z.string().optional(),
		zipCode: z.string().optional(),
		countryCode: z
			.string()
			.length(2, "Country code must be exactly 2 characters"),
	}),
	shippingAddress: z.object({
		line1: z.string().optional(),
		line2: z.string().optional(),
		city: z.string().optional(),
		state: z.string().optional(),
		zipCode: z.string().optional(),
		countryCode: z
			.string()
			.length(2, "Country code must be exactly 2 characters"),
		firstName: z.string().optional(),
		middleName: z.string().optional(),
		lastName: z.string().optional(),
		phone: z.string().optional(),
		email: z.string().email("Invalid email format").optional(),
		shippingType: z.enum(ShippingType).optional(),
	}),
});

// Payment Facilitator schema
const PaymentFacilitatorSchema: z.ZodType<PaymentFacilitator> = z
	.object({
		smi: z.string().min(1).max(30),
		smn: z.string().min(1).max(64),
		mci: z.string().min(1).max(13),
		mpc: z.string().min(3).max(3),
		mco: z.string().min(3).max(3),
		mst: z.string().min(2).max(3).optional(),
		mcc: z.string().optional(),
		postalCode: z.string().max(20).optional(),
		contactNo: z.string().max(20).optional(),
		state: z.string().min(1).max(100).optional(),
		addressLine1: z.string().min(1).max(100).optional(),
	})
	.strict();

// Metadata schema
const MetadataSchema: z.ZodType<Metadata> = z
	.object({
		subMerchantRequestReferenceNumber: z.string().optional(),
		pf: PaymentFacilitatorSchema.optional(),
	})
	.catchall(z.unknown());

// Redirect URL schema
const RedirectUrlSchema: z.ZodType<RedirectUrl> = z
	.object({
		success: z.string().url("Invalid redirect URL format").optional(),
		failure: z.string().url("Invalid redirect URL format").optional(),
		cancel: z.string().url("Invalid redirect URL format").optional(),
	})
	.strict();

// Main checkout request schema
export const CheckoutRequestSchema: z.ZodType<MayaCheckoutRequest> = z
	.object({
		totalAmount: TotalAmountSchema,
		requestReferenceNumber: RequestReferenceNumberSchema,
		buyer: z.union([KountBuyerSchema, BasicBuyerSchema]),
		items: z.array(ItemSchema).optional(),
		redirectUrl: RedirectUrlSchema.optional(),
		metadata: MetadataSchema.optional(),
	})
	.strict();
