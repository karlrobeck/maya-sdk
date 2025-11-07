
/** Base error codes for Maya API responses */
export enum MayaPaymentErrorCodes {
  // Authentication and API Key Errors
  /**
   * K001 - Missing authentication header
   * @description Missing authentication header. Kindly include a Base64 encoded key in the basic authentication header.
   * @httpStatus 401
   * @cause This is caused by sending a request without an `Authorization` header.
   * @tip Ensure that you have encoded the correct API key for Basic HTTP authentication and have included it in the `Authorization` header of your HTTP request.
   */
  MISSING_AUTHENTICATION_HEADER = "K001",
  /**
   * K002 - Key has expired
   * @description Key has expired. Please generate a new key.
   * @httpStatus 401
   * @cause This error will be encountered when the API key used is already expired.
   * @tip You should re-create a new API key via the Maya Manager.
   */
  KEY_EXPIRED = "K002",
  /**
   * K003 - Invalid authentication credentials
   * @description Invalid authentication credentials. Kindly verify if the key you are using is correct.
   * @httpStatus 401
   * @cause You will encounter this error when you provide incorrect values for the Basic HTTP authentication in the `Authorization` request header.
   * @tip Ensure that you have encoded the correct API key for Basic HTTP authentication and included it in the `Authorization` header of your HTTP request.
   */
  INVALID_AUTH_CREDENTIALS = "K003",
  /**
   * K004 - Invalid endpoint
   * @description Invalid endpoint. Please check if you are accessing the correct endpoint/resource.
   * @httpStatus 401
   * @cause This error will be encountered when you are calling an invalid endpoint, incorrect URL, or using inappropriate API keys (public or secret keys).
   * @tip Ensure you are using the appropriate API keys and calling the correct endpoint.
   */
  INVALID_ENDPOINT = "K004",
  /**
   * K006 - Invalid authentication credentials (Invalid Base64)
   * @description Invalid authentication credentials. Key provided is not a valid Base64 encoded key.
   * @httpStatus 401
   * @cause This error will be encountered when you have provided an invalid `Authorization` header value.
   * @tip Review and ensure you are sending the correct Basic HTTP authentication value for the `Authorization` HTTP request header.
   */
  INVALID_BASE64_KEY = "K006",
  /**
   * K007 - Invalid key scope
   * @description Invalid key scope. Please check the provided key's scopes.
   * @httpStatus 401
   * @cause This will be encountered when the API key does not have the scope required by the endpoint called.
   * @tip Review the scope of your API key and use the appropriate key.
   */
  INVALID_KEY_SCOPE = "K007",
  /**
   * K999 - A problem is encountered
   * @description A problem is encountered. Please contact PayMaya support.
   * @httpStatus 400
   * @cause This is caused by a generic error during API request authentication.
   * @tip You may retry the operation. If problem persists, contact your Maya Relationship Manager.
   */
  AUTHENTICATION_ERROR = "K999",
  // Payment related errors
  /**
   * PY0009 - Payment does not exist
   * @description The API call was made with a paymentId or rrn that does not exist or has no corresponding payment intent.
   * @httpStatus 404
   * @tip Verify the existence of the paymentId or rrn via the Maya Manager and use the correct values to retry the intended operation.
   */
  PAYMENT_DOES_NOT_EXIST = "PY0009",
  /**
   * PY0017 - Merchant not found
   * @description There is a problem with the configuration of your merchant account.
   * @httpStatus 404
   * @tip Contact business.support@maya.ph (PRODUCTION) or create a ticket via Maya Developer Hub Service Desk with your payment ID and error details.
   */
  MERCHANT_NOT_FOUND = "PY0017",
  /**
   * PY0019 - Forbidden
   * @description The API call was made with an API key that does not have the necessary permissions to do the operation.
   * @httpStatus 401
   * @tip Review the Welcome Letter to confirm that the feature intended to be used (e.g., Authorize and Capture) has been activated.
   */
  FORBIDDEN = "PY0019",
  /**
   * PY0037 - Currency is not supported
   * @description The API call was made with the wrong currency.
   * @httpStatus 400
   * @tip Ensure to pass the currency value that has been configured for your integration.
   */
  CURRENCY_NOT_SUPPORTED = "PY0037",
  /**
   * PY0044 - Payment is invalid
   * @description A problem was encountered while processing the payment.
   * @httpStatus 400
   * @tip Validate the error message to determine the actual error. If missing parameters or invalid values, review and correct them before retrying.
   */
  PAYMENT_INVALID = "PY0044",
  /**
   * PY0045 - Payment is not available for void
   * @description The payment is not eligible for void or the void time window has expired.
   * @httpStatus 400
   * @tip Authorized payments can only be voided before 12AM GMT+8 of the transaction date. Validate payment status via Retrieve Payment API.
   */
  PAYMENT_NOT_AVAILABLE_FOR_VOID = "PY0045",
  /**
   * PY0046 - Refund does not exist
   * @description The refundId does not exist or has been deleted.
   * @httpStatus 404
   * @tip Validate if you are using a correct refundId and it is not currently deleted, then retry the request.
   */
  REFUND_DOES_NOT_EXIST = "PY0046",
  /**
   * PY0047 - Payment is ineligible for refund
   * @description Either the transaction is not yet eligible according to cut-off rules or it is older than 180 days.
   * @httpStatus 401
   * @tip Refunds can only be initiated after 12AM GMT+8 of the transaction date. Transactions older than 180 days cannot be refunded.
   */
  PAYMENT_INELIGIBLE_FOR_REFUND = "PY0047",
  /**
   * PY0048 - Requested refund amount is greater than the original amount
   * @description The refund amount exceeds the original transaction amount.
   * @httpStatus 400
   * @tip Validate your request and ensure the requested refund amount is the same as or less than the original amount.
   */
  REFUND_AMOUNT_EXCEEDS_ORIGINAL = "PY0048",
  /**
   * PY0057 - The payment has expired and cannot be processed
   * @description The transaction exceeded the given time limit and has expired.
   * @httpStatus 422
   * @tip Once a payment has expired, it cannot be processed. Create a new payment transaction if the user wishes to proceed.
   */
  PAYMENT_EXPIRED = "PY0057",
  /**
   * PY0058 - The merchant indicated does not have P2M services enabled
   * @description P2M service is not activated in your merchant profile.
   * @httpStatus 403
   * @tip Escalate the issue to your Relationship Manager.
   */
  P2M_SERVICES_NOT_ENABLED = "PY0058",
  /**
   * PY0063 - Void does not exist
   * @description There are no void requests for the paymentId provided.
   * @httpStatus 404
   * @tip Ensure you have supplied the correct paymentId and try again.
   */
  VOID_DOES_NOT_EXIST = "PY0063",
  /**
   * PY0065 - This merchant has no customizations present
   * @description The merchant's request to Get or Delete customizations is invalid because there are no page customizations.
   * @httpStatus 404
   * @tip No further action required.
   */
  NO_CUSTOMIZATIONS_PRESENT = "PY0065",
  /**
   * PY0068 - Payment not executed due to authorization failure
   * @description A systematic error on Authentication occurred during payment processing.
   * @httpStatus 400
   * @tip Retry the transaction. If the error persists after multiple retries, escalate the issue to Support.
   */
  PAYMENT_AUTHORIZATION_FAILURE = "PY0068",
  /**
   * PY0070 - Scheme is unsupported by merchant
   * @description The card used for the transaction is from a card scheme not configured to the merchant's account.
   * @httpStatus 400
   * @tip Confirm with your Relationship Manager that your expected card scheme has been configured. Supported schemes: Visa, MasterCard, AMEX, JCB.
   */
  UNSUPPORTED_CARD_SCHEME = "PY0070",
  /**
   * PY0072 - Transaction cannot be processed. Cannot refund a transaction before cut off time
   * @description Refund was attempted before the cut-off time.
   * @httpStatus 400
   * @tip Refunds can only be initiated AFTER 12AM GMT+8 of the transaction date.
   */
  CANNOT_REFUND_BEFORE_CUTOFF = "PY0072",
  /**
   * PY0073 - Transaction cannot be processed. Cannot void a transaction after cut off time
   * @description Void was attempted after the cut-off time.
   * @httpStatus 400
   * @tip Authorized payments can only be voided BEFORE the 12AM GMT+8 cut-off time.
   */
  CANNOT_VOID_AFTER_CUTOFF = "PY0073",
  /**
   * PY0082 - Refund already exists
   * @description The paymentId already has a refund request.
   * @httpStatus 400
   * @tip Verify the paymentId and check for existing refund requests before attempting a new one.
   */
  REFUND_ALREADY_EXISTS = "PY0082",
  /**
   * PY0093 - Payment has already been updated
   * @description Concurrent calls to refund the transaction have been issued and the transaction reached a non-refundable state.
   * @httpStatus 409
   * @tip Retry the operation or check the current payment status before attempting another transaction.
   */
  PAYMENT_ALREADY_UPDATED = "PY0093",
  /**
   * PY0094 - Payment is not available for capture
   * @description The API call was made with a transaction that was not valid for capture.
   * @httpStatus 400
   * @tip Verify that payment is AUTHORIZED before calling the Capture Payment API. Review the Auth and Capture guide for more information.
   */
  PAYMENT_NOT_AVAILABLE_FOR_CAPTURE = "PY0094",
  /**
   * PY0095 - Amount must be less than or equal to amount authorized
   * @description The requested amount to capture is greater than the authorization amount.
   * @httpStatus 400
   * @tip Refer to the Manual Capture documentation and follow the recommended steps.
   */
  CAPTURE_AMOUNT_EXCEEDS_AUTHORIZED = "PY0095",
  /**
   * PY0096 - Amount must be equal to amount authorized
   * @description The requested amount to capture is not equal to the authorization amount.
   * @httpStatus 400
   * @tip Refer to the Manual Capture documentation and follow the recommended steps.
   */
  CAPTURE_AMOUNT_NOT_EQUAL_AUTHORIZED = "PY0096",
  /**
   * PY0100 - Authentication failed
   * @description The user failed to authenticate the request in 3DS.
   * @httpStatus 400
   * @note Applicable for Card payments only.
   * @tip Advise the customer to retry the transaction or use a different payment method.
   */
  THREE_DS_AUTHENTICATION_FAILED = "PY0100",
  /**
   * PY0101 - Acquirer decline due to high risk
   * @description The acquirer has declined the payment transaction because of suspected fraud.
   * @httpStatus 400
   * @tip Advise the customer to create a new transaction using a different payment method or card.
   */
  ACQUIRER_DECLINE_HIGH_RISK = "PY0101",
  /**
   * PY0103 - Payment is already expired
   * @description The transaction exceeded the given time limit and has expired.
   * @httpStatus 400
   * @tip Create a new payment transaction if the user wishes to proceed.
   */
  PAYMENT_ALREADY_EXPIRED = "PY0103",
  /**
   * PY0104 - Reference number is linked to multiple payments
   * @description The payment you are trying to process using the Reference number is linked to multiple payment records.
   * @httpStatus 400
   * @tip Use the paymentId directly instead of the reference number to process specific payments.
   */
  REFERENCE_LINKED_TO_MULTIPLE_PAYMENTS = "PY0104",
  /**
   * PY0113 - Partial refund is not allowed for this transaction
   * @description The payment is not eligible for partial refunds.
   * @httpStatus 400
   * @tip Validate the payment by calling Retrieve Payment via ID endpoint and review the Manual Capture documentation for transition and refund rules.
   */
  PARTIAL_REFUND_NOT_ALLOWED = "PY0113",
  /**
   * PY0116 - Transaction could not be completed
   * @description The operation you are trying to do with the transaction has encountered an error.
   * @httpStatus 400
   * @tip If the error persists after multiple retries, escalate to Support with paymentId or transactionId.
   */
  TRANSACTION_COULD_NOT_COMPLETE = "PY0116",
  /**
   * PY0120 - Issuer decline
   * @description The card used or associated with the payment may be expired or declined by the issuer.
   * @httpStatus 400
   * @tip Advise the customer to create a new transaction using a different payment method or card.
   */
  ISSUER_DECLINE = "PY0120",
  /**
   * PY0124 - Transaction could not be verified
   * @description The transaction verification failed, reason may vary depending on the 3DS verification.
   * @httpStatus 400
   * @note Applicable for Card payments only.
   * @tip Retry the transaction or contact Support if the issue persists.
   */
  TRANSACTION_VERIFICATION_FAILED = "PY0124",
  /**
   * PY0137 - Decline due to high risk
   * @description The transaction was suspected to be fraud and was declined.
   * @httpStatus 400
   * @tip Escalate to Support with paymentId for further investigation.
   */
  DECLINE_HIGH_RISK = "PY0137",
  /**
   * PY0138 - Acquirer decline
   * @description The transaction was declined by the acquirer, possibly due to fraud suspicion.
   * @httpStatus 400
   * @tip Escalate to Support with paymentId for further investigation.
   */
  ACQUIRER_DECLINE = "PY0138",
  /**
   * PY0146 - Login cancelled by user
   * @description The customer decided to cancel the request during user login.
   * @httpStatus 200
   * @note Applicable for CHECKOUT-MAYA product.
   * @tip No action required from the merchant side. Inform the customer if they wish to retry the transaction.
   */
  LOGIN_CANCELLED_BY_USER = "PY0146",
  // Customer, Account and Card Related Errors
  /**
   * PY0002 - Card is expired
   * @description The card used for the transaction has already expired.
   * @httpStatus 400
   * @note Applicable for Vault products.
   * @tip Advise the customer to use a valid and active card. For sandbox testing, use valid cards from Sandbox Credentials and Cards.
   */
  CARD_EXPIRED = "PY0002",
  /**
   * PY0007 - Invalid token status
   * @description The API call was made with a paymentTokenId already used or has expired.
   * @httpStatus 400
   * @note Applicable for Vault products.
   * @tip Generate a new paymentTokenId using Create Payment Token.
   */
  INVALID_TOKEN_STATUS = "PY0007",
  /**
   * PY0008 - Token is invalid
   * @description The API call was made with a paymentTokenId that is not valid or does not exist.
   * @httpStatus 400
   * @note Applicable for Vault products.
   * @tip Generate a valid paymentTokenId via the Create Payment Token endpoint.
   */
  TOKEN_INVALID = "PY0008",
  /**
   * PY0021 - Failed to add customer
   * @description A systemic error occurred when creating a customer record.
   * @httpStatus 400
   * @note Applicable for Vault products.
   * @tip Review the mandatory fields for creating a customer and try again. If the error persists, escalate to Support.
   */
  FAILED_ADD_CUSTOMER = "PY0021",
  /**
   * PY0023 - Customer does not exist
   * @description The API call was made with a customerId that does not exist.
   * @httpStatus 404
   * @note Applicable for Vault products.
   * @tip Use a customerId that exists or create a new one via Create Customer API.
   */
  CUSTOMER_DOES_NOT_EXIST = "PY0023",
  /**
   * PY0024 - Failed to delete customer
   * @description A systematic error occurred in deleting a customer record.
   * @httpStatus 400
   * @note Applicable for Vault products.
   * @tip Validate the customer record status by calling Retrieve Customer. If it still exists, retry the delete request. If the error persists, escalate to Support.
   */
  FAILED_DELETE_CUSTOMER = "PY0024",
  /**
   * PY0025 - Failed to update customer details
   * @description A systematic error occurred in updating Customer details.
   * @httpStatus 400
   * @note Applicable for Vault products.
   * @tip Validate the customer record by calling Retrieve Customer. If it exists and details need modification, retry the update request. If the error persists, escalate to Support.
   */
  FAILED_UPDATE_CUSTOMER = "PY0025",
  /**
   * PY0026 - Failed to update card details
   * @description A call to Update a Card of Customer was made with the isDefault set to false.
   * @httpStatus 400
   * @note Applicable for Vault products.
   * @tip To set a vaulted card as default, pass isDefault with the value true when using the endpoint.
   */
  FAILED_UPDATE_CARD = "PY0026",
  /**
   * PY0027 - Card does not exist
   * @description The cardToken used is not associated with the customerId or the customer's vaulted cards are not in ACTIVE state.
   * @httpStatus 404
   * @note Applicable for Vault products.
   * @tip Use the correct cardToken associated with the customerId or vault a card following Pay and Save or Save a Card only flow.
   */
  CARD_DOES_NOT_EXIST = "PY0027",
  /**
   * PY0028 - Failed to delete card
   * @description A systematic error occurred in deleting the Card.
   * @httpStatus 400
   * @note Applicable for Vault products.
   * @tip Validate the Card record by calling Retrieve Card. If it still exists, retry the delete request. If the error persists, escalate to Support.
   */
  FAILED_DELETE_CARD = "PY0028",
  /**
   * PY0029 - No card found for customer
   * @description The customer does not have an existing vaulted card.
   * @httpStatus 400
   * @note Applicable for Vault products.
   * @tip Vault a card following the Pay and Save or Save a Card only flow.
   */
  NO_CARD_FOR_CUSTOMER = "PY0029",
  /**
   * PY0030 - Invalid card token status
   * @description The card vaulting session has expired.
   * @httpStatus 400
   * @note Applicable for Vault products.
   * @tip Complete the Pay and Save or Save a Card only flow within the expiry limit. Refer to Card Vaulting Transaction Expiration in Business Rules to Code for Online Payments.
   */
  INVALID_CARD_TOKEN_STATUS = "PY0030",
  /**
   * PY0036 - Card is not supported
   * @description The card used for the transaction is from a card scheme not supported by Maya.
   * @httpStatus 400
   * @note Applicable for Invoice, Checkout, Vault, and Plugins products.
   * @tip Confirm with your Relationship Manager that your expected card scheme has been configured. Supported schemes: Visa, Mastercard, AMEX, JCB.
   */
  CARD_NOT_SUPPORTED = "PY0036",
  /**
   * PY0043 - Card already exists
   * @description The card token was already vaulted to the customer.
   * @httpStatus 400
   * @note Applicable for Vault products.
   * @tip Use a new card token when calling Create Card of Customer.
   */
  CARD_ALREADY_EXISTS = "PY0043",
  /**
   * PY0105 - Account has insufficient balance to perform this transaction
   * @description The linked account or the account being used does not have sufficient balance to make the transaction.
   * @httpStatus 400
   * @tip Inform the user that the transaction was declined due to insufficient funds and advise them to cash in before making a transaction.
   */
  INSUFFICIENT_ACCOUNT_BALANCE = "PY0105",
  /**
   * PY0117 - Card is invalid
   * @description The card being used is invalid or no longer valid (card BIN is not supported or the card is inactive).
   * @httpStatus 400
   * @note Applicable for Invoice, Checkout, Vault, and Plugins products.
   * @tip Make sure you are using a valid and active card when making a transaction.
   */
  CARD_INVALID = "PY0117",
  /**
   * PY0119 - Issuer declined card or account
   * @description The Issuer has rejected transactions to be made using this card.
   * @httpStatus 400
   * @tip Recommend trying with a different card.
   */
  ISSUER_DECLINED_CARD_ACCOUNT = "PY0119",
  /**
   * PY0121 - Card is expired
   * @description An expired card was used.
   * @httpStatus 400
   * @note Applicable for Card payments only.
   * @tip Suggest the customer to attempt the transaction using a valid and active card.
   */
  CARD_EXPIRED_ISSUER = "PY0121",
  /**
   * PY0123 - Account limit exceeded
   * @description The linked account or the account being used has reached the maximum number of transactions.
   * @httpStatus 400
   * @tip Inform the user that the transaction was declined due to a limit. They can retry the transaction on the next day or use other accounts.
   */
  ACCOUNT_LIMIT_EXCEEDED = "PY0123",
  /**
   * PY0127 - Please update incomplete customer records
   * @description The provided customer details are incomplete when Fraud protection is enabled.
   * @httpStatus 400
   * @note Applicable for Vault products.
   * @tip Provide the minimum required customer details as described in the Fraud Protection guide and retry the transaction.
   */
  INCOMPLETE_CUSTOMER_RECORD = "PY0127",
  /**
   * PY0136 - Account or Card is compromised
   * @description The account is closed and is no longer usable.
   * @httpStatus 400
   * @tip You have to unlink the account and ask the user to link another account.
   */
  ACCOUNT_CARD_COMPROMISED = "PY0136",
  // Direct Pay with Maya Related Errors
  /**
   * PYBY0001 - Missing/invalid parameters
   * @description The API call was made with missing or invalid parameters.
   * @httpStatus 400
   * @tip Review the API specifications and send the API request with complete specs and correct values.
   */
  MISSING_INVALID_PARAMETERS = "PYBY0001",
  /**
   * PYBY0003 - Merchant not found
   * @description There is a problem with the configuration of your merchant account.
   * @httpStatus 404
   * @tip Contact business.support@maya.ph (PRODUCTION) or create a ticket via Maya Developer Hub Service Desk with your payment ID and error details.
   */
  PAY_WITH_MAYA_MERCHANT_NOT_FOUND = "PYBY0003",
  /**
   * PYBY0004 - Access not allowed
   * @description There is a problem with the configuration of your merchant account.
   * @httpStatus 401
   * @tip Contact business.support@maya.ph (PRODUCTION) or create a ticket via Maya Developer Hub Service Desk with your payment ID and error details.
   */
  ACCESS_NOT_ALLOWED = "PYBY0004",
  /**
   * PYBY0006 - Payment Service Error
   * @description A problem was encountered between your server and Maya.
   * @httpStatus 400
   * @tip Retry the operation. If the issue persists, contact business.support@maya.ph (PRODUCTION) or create a ticket via Maya Developer Hub Service Desk.
   */
  PAYMENT_SERVICE_ERROR = "PYBY0006",
  /**
   * PYBY0009 - Wallet does not exist
   * @description The API call was made with the wrong linkId.
   * @httpStatus 404
   * @tip Use a correct linkId or generate a new linkId using Create Wallet Link.
   */
  WALLET_DOES_NOT_EXIST = "PYBY0009",
  /**
   * PYBY0010 - Wallet is inactive or deleted
   * @description The wallet is inactive or deleted from the system and cannot be used for this transaction.
   * @httpStatus 400
   * @tip Use a correct linkId or generate a new linkId using Create Wallet Link.
   */
  WALLET_INACTIVE_OR_DELETED = "PYBY0010",
  /**
   * PYBY0012 - A problem is encountered
   * @description A problem was encountered between your server and Maya.
   * @httpStatus 400
   * @tip Retry the operation. If the issue persists, contact business.support@maya.ph (PRODUCTION) or create a ticket via Maya Developer Hub Service Desk.
   */
  PAY_WITH_MAYA_ERROR = "PYBY0012",
  /**
   * PYBY0014 - Currency not supported
   * @description The API call was made with the wrong currency.
   * @httpStatus 400
   * @tip Ensure to pass the currency value that has been configured for your integration.
   */
  PAY_WITH_MAYA_CURRENCY_NOT_SUPPORTED = "PYBY0014",
  /**
   * PYBY9999 - A problem is encountered
   * @description A problem was encountered between your server and Maya.
   * @httpStatus 400
   * @tip Retry the operation. If the issue persists, contact business.support@maya.ph (PRODUCTION) or create a ticket via Maya Developer Hub Service Desk.
   */
  PAY_WITH_MAYA_GENERIC_ERROR = "PYBY9999",
  // QRPH Payment Related Errors
  /**
   * PY0169 - QR Service unreachable / timed out
   * @description A problem was encountered between your server and Maya.
   * @httpStatus 400
   * @note Applicable for Checkout QRPH and Dynamic QRPH products.
   * @tip Retry the operation. If the issue persists, contact business.support@maya.ph (PRODUCTION) or create a ticket via Maya Developer Hub Service Desk.
   */
  QR_SERVICE_UNREACHABLE = "PY0169",
  /**
   * PY0170 - QR Service error
   * @description A problem was encountered between your server and Maya.
   * @httpStatus 400
   * @note Applicable for Checkout QRPH and Dynamic QRPH products.
   * @tip Retry the operation. If the issue persists, contact business.support@maya.ph (PRODUCTION) or create a ticket via Maya Developer Hub Service Desk.
   */
  QR_SERVICE_ERROR = "PY0170",
  // Other Payment Errors - General Errors
  /**
   * 2553 - Missing/invalid parameters
   * @description The API call was made with missing or invalid parameters.
   * @httpStatus 400
   * @tip Review the API specifications and send the API request with complete specs and correct values.
   */
  MISSING_INVALID_PARAMETERS_2553 = "2553",
  /**
   * PY0001 - Generic system error
   * @description A problem was encountered in Maya.
   * @httpStatus 400
   * @tip Retry the operation. If the issue persists, contact business.support@maya.ph (PRODUCTION) or create a ticket via Maya Developer Hub Service Desk.
   */
  GENERIC_SYSTEM_ERROR = "PY0001",
  /**
   * PY0064 - Invalid JSON Format
   * @description The payload request is not a valid JSON format.
   * @httpStatus 400
   * @tip Check your payload and ensure that you are sending the correct JSON format.
   */
  INVALID_JSON_FORMAT = "PY0064",
  // Other Payment Errors - Server Related Errors
  /**
   * PY0013 - Card vault server unreachable / timed out
   * @description A problem was encountered between your server and Maya.
   * @httpStatus 400
   * @note Applicable for Vault products.
   * @tip Retry the operation. If the issue persists, contact business.support@maya.ph (PRODUCTION) or create a ticket via Maya Developer Hub Service Desk.
   */
  CARD_VAULT_UNREACHABLE = "PY0013",
  /**
   * PY0014 - Card Vault service error
   * @description A problem was encountered between your server and Maya.
   * @httpStatus 400
   * @note Applicable for Vault products.
   * @tip Retry the operation. If the issue persists, contact business.support@maya.ph (PRODUCTION) or create a ticket via Maya Developer Hub Service Desk.
   */
  CARD_VAULT_SERVICE_ERROR = "PY0014",
  /**
   * PY0015 - System has encountered a systematic error or is unreachable / timed out
   * @description A systematic error occurred or the system is unreachable or timing out.
   * @httpStatus 400
   * @tip Confirm the transaction using GET endpoint with requestReferenceNumber. If no response, retry the transaction. If persists, escalate to Support.
   */
  SYSTEM_ERROR_PY0015 = "PY0015",
  /**
   * PY0016 - System has encountered a systematic error or is unreachable / timed out
   * @description A systematic error occurred or the system is unreachable or timing out.
   * @httpStatus 400
   * @tip Confirm the transaction using GET endpoint with requestReferenceNumber. If no response, retry the transaction. If persists, escalate to Support.
   */
  SYSTEM_ERROR_PY0016 = "PY0016",
  /**
   * PY0040 - System has encountered a systematic error or is unreachable / timed out
   * @description A systematic error occurred or the system is unreachable or timing out.
   * @httpStatus 400
   * @tip Confirm the transaction using GET endpoint with requestReferenceNumber. If no response, retry the transaction. If persists, escalate to Support.
   */
  SYSTEM_ERROR_PY0040 = "PY0040",
  /**
   * PY0041 - System has encountered a systematic error or is unreachable / timed out
   * @description A systematic error occurred or the system is unreachable or timing out.
   * @httpStatus 400
   * @tip Confirm the transaction using GET endpoint with requestReferenceNumber. If no response, retry the transaction. If persists, escalate to Support.
   */
  SYSTEM_ERROR_PY0041 = "PY0041",
  /**
   * PY0059 - Customer Vault server unreachable / timed out
   * @description A problem was encountered between your server and Maya.
   * @httpStatus 400
   * @note Applicable for Vault products.
   * @tip Retry the operation. If the issue persists, contact business.support@maya.ph (PRODUCTION) or create a ticket via Maya Developer Hub Service Desk.
   */
  CUSTOMER_VAULT_UNREACHABLE = "PY0059",
  /**
   * PY0066 - System has encountered a systematic error or is unreachable / timed out
   * @description A systematic error occurred or the system is unreachable or timing out.
   * @httpStatus 400
   * @tip Confirm the transaction using GET endpoint with requestReferenceNumber. If no response, retry the transaction. If persists, escalate to Support.
   */
  SYSTEM_ERROR_PY0066 = "PY0066",
  /**
   * PY0067 - System has encountered a systematic error or is unreachable / timed out
   * @description A systematic error occurred or the system is unreachable or timing out.
   * @httpStatus 400
   * @tip Confirm the transaction using GET endpoint with requestReferenceNumber. If no response, retry the transaction. If persists, escalate to Support.
   */
  SYSTEM_ERROR_PY0067 = "PY0067",
  /**
   * PY0069 - System has encountered a systematic error or is unreachable / timed out
   * @description A systematic error occurred or the system is unreachable or timing out.
   * @httpStatus 400
   * @tip Confirm the transaction using GET endpoint with requestReferenceNumber. If no response, retry the transaction. If persists, escalate to Support.
   */
  SYSTEM_ERROR_PY0069 = "PY0069",
  /**
   * PY0143 - System has encountered a systematic error or is unreachable / timed out
   * @description A systematic error occurred or the system is unreachable or timing out.
   * @httpStatus 400
   * @tip Confirm the transaction using GET endpoint with requestReferenceNumber. If no response, retry the transaction. If persists, escalate to Support.
   */
  SYSTEM_ERROR_PY0143 = "PY0143",
  /**
   * PY0144 - System has encountered a systematic error or is unreachable / timed out
   * @description A systematic error occurred or the system is unreachable or timing out.
   * @httpStatus 400
   * @tip Confirm the transaction using GET endpoint with requestReferenceNumber. If no response, retry the transaction. If persists, escalate to Support.
   */
  SYSTEM_ERROR_PY0144 = "PY0144",
  /**
   * PY9999 - System has encountered a systematic error or is unreachable / timed out
   * @description A systematic error occurred or the system is unreachable or timing out.
   * @httpStatus 400
   * @tip Confirm the transaction using GET endpoint with requestReferenceNumber. If no response, retry the transaction. If persists, escalate to Support.
   */
  SYSTEM_ERROR_GENERIC = "PY9999",
  // Other Payment Errors - Third Party Errors
  /**
   * PY0114 - WeChat Service unreachable / timed out
   * @description WeChat service is unreachable or taking too long to respond.
   * @httpStatus 400
   * @tip Retry the transaction. If the error persists after multiple retries, escalate to Support.
   */
  WECHAT_SERVICE_UNREACHABLE = "PY0114",
  /**
   * PY0115 - WeChat Service error
   * @description This is a systematic error on WeChat Service.
   * @httpStatus 400
   * @tip Retry the transaction. If the error persists after multiple retries, escalate to Support.
   */
  WECHAT_SERVICE_ERROR = "PY0115",
  /**
   * PY0129 - GCash Service unreachable / timed out
   * @description GCash Service is unreachable or taking too long to respond.
   * @httpStatus 400
   * @tip Retry the transaction. If the error persists after multiple retries, escalate to Support.
   */
  GCASH_SERVICE_UNREACHABLE = "PY0129",
  /**
   * PY0130 - GCash Service error
   * @description This is a systematic error on GCash Service.
   * @httpStatus 400
   * @tip Retry the transaction. If the error persists after multiple retries, escalate to Support.
   */
  GCASH_SERVICE_ERROR = "PY0130",
  /**
   * PY0140 - ShopeePay Service unreachable / timed out
   * @description ShopeePay Service is unreachable or taking too long to respond.
   * @httpStatus 400
   * @tip Retry the transaction. If the error persists after multiple retries, escalate to Support.
   */
  SHOPEEPAY_SERVICE_UNREACHABLE = "PY0140",
  /**
   * PY0141 - ShopeePay Service error
   * @description This is a systematic error in the ShopeePay Service.
   * @httpStatus 400
   * @tip Retry the transaction. If the error persists after multiple retries, escalate to Support.
   */
  SHOPEEPAY_SERVICE_ERROR = "PY0141",
  // Other Payment Errors - Webhook Errors
  /**
   * PY0038 - Webhook does not exist
   * @description The webhook registration was unsuccessful or the webhook endpoint is incorrect for the environment.
   * @httpStatus 404
   * @tip Check if the registered webhook exists via Maya Manager or by calling Get Webhooks endpoint. Note webhook endpoints differ between sandbox and production.
   */
  WEBHOOK_DOES_NOT_EXIST = "PY0038",
  /**
   * PY0039 - Webhook already exists
   * @description A webhook has already been created with the same configuration.
   * @httpStatus 400
   * @tip Check if the registered webhook exists via Maya Manager or by calling Get Webhooks endpoint. Delete the existing webhook and define a new one if needed.
   */
  WEBHOOK_ALREADY_EXISTS = "PY0039",
  /**
   * PY0091 - Payment state is invalid for sending webhooks
   * @description The payment is in an invalid state for webhook dispatch.
   * @httpStatus 400
   * @tip Review the Webhooks for Payment Solutions guide for more details on webhook usage and payment states.
   */
  INVALID_PAYMENT_STATE_FOR_WEBHOOK = "PY0091",
  /**
   * PY0092 - Merchant's registered webhook is unreachable
   * @description The merchant's webhook endpoint is not responding.
   * @httpStatus 408
   * @tip Make sure you have registered the correct webhook URL that is up and running. See Webhooks for Payment Solutions guide for details.
   */
  WEBHOOK_UNREACHABLE = "PY0092",
  // Other Payment Errors - Subscription Related Errors
  /**
   * PY0049 - Subscription does not exist
   * @description The subscription does not exist or is invalid.
   * @httpStatus 404
   * @tip Make sure you have supplied a correct subscription ID and retry again.
   */
  SUBSCRIPTION_DOES_NOT_EXIST = "PY0049",
  /**
   * PY0051 - Failed to update subscription details
   * @description A systematic error occurred in updating subscription details.
   * @httpStatus 400
   * @tip Retry the transaction. If the error persists after multiple retries, escalate to Support with the subscriptionId.
   */
  FAILED_UPDATE_SUBSCRIPTION = "PY0051",
  /**
   * PY0052 - Failed to cancel subscription
   * @description An error occurred while canceling the subscription.
   * @httpStatus 400
   * @tip Retry the transaction. If the error persists after multiple retries, escalate to Support with the subscriptionId.
   */
  FAILED_CANCEL_SUBSCRIPTION = "PY0052",
  /**
   * PY0054 - Subscription already charged
   * @description The subscription you are trying to process has already been charged.
   * @httpStatus 400
   * @tip Validate the status of the subscription via the retrieve endpoint before attempting to charge again.
   */
  SUBSCRIPTION_ALREADY_CHARGED = "PY0054",
}

/**
 * Represents a Maya API error response
 * Extends the native Error class for better error handling and stack traces
 * @template T - The error code type (extends MayaPaymentErrorCodes)
 */
export class MayaErrorResponse extends Error {
  /** Error code identifier */
  code: MayaPaymentErrorCodes
  /** Optional reference identifier for tracking */
  reference?: string
  /** Additional error data */
  data?: any

  /**
   * Creates a new MayaErrorResponse instance
   * @param error - Error message description
   * @param code - Error code identifier
   * @param reference - Optional reference identifier for tracking
   * @param data - Optional additional error data
   */
  constructor(error: string, code: MayaPaymentErrorCodes, reference?: string, data?: any) {
    super(error)
    this.name = 'MayaErrorResponse'
    this.code = code
    this.reference = reference
    this.data = data

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, MayaErrorResponse)
    }
  }

  /**
   * Convert error to JSON representation
   */
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      reference: this.reference,
      data: this.data,
      stack: this.stack,
    }
  }

  /**
   * Convert error to string representation
   */
  override toString() {
    return `${this.name} [${this.code}]: ${this.message}${this.reference ? ` (Reference: ${this.reference})` : ''}`
  }
}