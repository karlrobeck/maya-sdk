import { MayaCheckoutService } from "./services/checkout";

export const MayaAPIEnvironment = {
	SANDBOX: {
		apiUrl: "https://pg-sandbox.paymaya.com",
		paymentPage: "https://payments-web-sandbox.paymaya.com",
		mayaManager: "https://manager-sandbox.paymaya.com",
	},
	PRODUCTION: {
		apiUrl: "https://pg.maya.ph",
		paymentPage: "https://payments.maya.ph",
		mayaManager: "https://manager.paymaya.com",
	},
};

export interface MayaRequestExecutor<Request, Response> {
	/** Validates the request and returns the validated request object */
	validate(): Request;
	/**
	 * Sends the request using the provided fetch function
	 * @param fetcher - The fetch function to use for the HTTP request
	 * @returns A promise that resolves with the response
	 * @throws {MayaError} When the API returns an error response
	 */
	send(fetcher: typeof fetch): Promise<Response>;
}

export class MayaClient {
	public checkout: MayaCheckoutService;

	constructor(
		environment: keyof typeof MayaAPIEnvironment,
		config: {
			publicKey: string;
			secretKey?: string;
		},
	) {
		this.checkout = new MayaCheckoutService(environment, config);
	}
}
