# Maya SDK

A TypeScript SDK for integrating with PayMaya's payment processing API. This library provides type-safe wrappers around Maya payment operations with built-in validation using Zod.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Examples](#examples)
- [API Reference](#api-reference)
- [Error Handling](#error-handling)
- [Roadmap](#roadmap)
- [License](#license)

## Overview

Maya SDK is a lightweight TypeScript SDK that simplifies payment processing through PayMaya's APIs. It provides a clean, type-safe interface for creating and managing payment checkouts in both sandbox and production environments.

## Why Build This?

The official [PayMaya Node SDK](https://github.com/PayMaya/PayMaya-Node-SDK) has several limitations that motivated the creation of this modern alternative:

### Issues with the Official SDK:

1. **No TypeScript Support** - The official SDK is pure JavaScript with no type definitions, making it error-prone in TypeScript projects
2. **Outdated Dependencies** - Uses deprecated packages like `requestretry` instead of modern fetch APIs
3. **Callback-Based API** - Relies on callbacks instead of Promises/async-await, making code harder to read and maintain
4. **Verbose Syntax** - Requires manual instantiation of multiple helper classes (Checkout, Buyer, Address, Contact, Item, etc.) just to create a simple checkout
5. **Poor Validation** - No built-in request validation or type safety
6. **Limited Maintenance** - Repository shows signs of stagnation with outdated dependencies and infrequent updates

### To Address These Issues, Maya SDK Was Built With:

✅ **Full TypeScript Support** - Complete type safety with IntelliSense support  
✅ **Modern Promise/Async-Await** - Clean, intuitive API using modern JavaScript patterns  
✅ **Built-in Validation** - Zod schema validation ensures requests are valid before sending  
✅ **Simple, Fluent API** - Chainable methods and minimal boilerplate  
✅ **No Legacy Dependencies** - Uses native `fetch` API for HTTP requests  
✅ **Active Maintenance** - Kept up-to-date with current best practices  
✅ **Lightweight** - Minimal bundle size with only essential dependencies

## Features

- ✅ Full TypeScript support with type safety
- ✅ Support for both Sandbox and Production environments
- ✅ Checkout API integration
- ✅ Comprehensive error handling with detailed error codes
- ✅ Built-in request validation using Zod
- ✅ Basic HTTP authentication support
- ✅ Flexible fetch implementation support

## Installation

```bash
# Using npm
npm install @karlrobeck/maya-sdk zod

# Using yarn
yarn add @karlrobeck/maya-sdk zod

# Using bun
bun add @karlrobeck/maya-sdk zod
```

**Requirements:**
- TypeScript ^5
- Node.js 16+ (or compatible runtime)

## Quick Start

```typescript
import { MayaClient } from '@karlrobeck/maya-sdk';

// Initialize the client with your API keys
const client = new MayaClient('SANDBOX', {
  publicKey: 'YOUR_PUBLIC_KEY',
  secretKey: 'YOUR_SECRET_KEY', // Optional, only needed for certain operations
});

// Create a checkout
const checkout = await client.checkout
  .createCheckout({
    totalAmount: {
      value: 100.0,
      currency: 'PHP'
    },
    requestReferenceNumber: crypto.randomUUID()
  })
  .send();

console.log(checkout.checkoutId); // Checkout ID to redirect user to payment page
console.log(checkout.redirectUrl); // URL to redirect user for payment
```

For more detailed examples, see [`tests/checkout.test.ts`](./tests/checkout.test.ts).

## Examples

For comprehensive, working examples, please refer to the test file: [`tests/checkout.test.ts`](./tests/checkout.test.ts)

### Basic Checkout Creation with Error Handling

```typescript
import { MayaClient, MayaError } from '@karlrobeck/maya-sdk';

const client = new MayaClient('SANDBOX', {
  publicKey: process.env.MAYA_PUBLIC_KEY,
  secretKey: process.env.MAYA_SECRET_KEY,
});

try {
  const checkoutResponse = await client.checkout
    .createCheckout({
      totalAmount: {
        value: 500.0,
        currency: 'PHP'
      },
      requestReferenceNumber: crypto.randomUUID()
    })
    .send();

  // Use checkout ID and redirect URL
  console.log('Checkout ID:', checkoutResponse.checkoutId);
  console.log('Redirect URL:', checkoutResponse.redirectUrl);
  
} catch (error) {
  if (error instanceof MayaError) {
    console.error('Checkout failed:', error.message);
    console.error('Error code:', error.code);
  }
}
```

### Custom Fetch Implementation

```typescript
import { MayaClient } from '@karlrobeck/maya-sdk';

const client = new MayaClient('SANDBOX', {
  publicKey: 'YOUR_PUBLIC_KEY'
});

// Use a custom fetch implementation (e.g., with logging, retry logic, etc.)
const customFetch = async (url: string, options: RequestInit) => {
  console.log(`Making request to ${url}`);
  return fetch(url, options);
};

const checkout = await client.checkout
  .createCheckout({...})
  .send(customFetch);
```

## API Reference

### MayaClient

Main client class for interacting with Maya APIs.

**Constructor:**
```typescript
new MayaClient(environment: 'SANDBOX' | 'PRODUCTION', config: {
  publicKey: string;
  secretKey?: string;
})
```

**Properties:**
- `checkout`: MayaCheckoutService - Service for handling checkout operations

### MayaCheckoutService

Service for creating and managing payment checkouts.

**Methods:**

#### `createCheckout(request: MayaCheckoutRequest)`
Creates a new checkout request and returns the service instance for chaining.

**Parameters:**
- `request`: The checkout request object

**Returns:** `this` (for method chaining)

#### `send(fetcher?: typeof fetch)`
Sends the validated checkout request to the PayMaya API.

**Parameters:**
- `fetcher` (optional): Custom fetch implementation. Defaults to global `fetch`.

**Returns:** `Promise<MayaCheckoutResponse>`

**Throws:** `MayaError` if validation fails or API returns an error

## Error Handling

The SDK provides comprehensive error handling through the `MayaError` class and detailed error codes.

```typescript
import { MayaClient, MayaError, MayaPaymentErrorCodes } from '@karlrobeck/maya-sdk';

const client = new MayaClient('SANDBOX', {
  publicKey: 'YOUR_PUBLIC_KEY'
});

try {
  const checkout = await client.checkout
    .createCheckout({...})
    .send();
} catch (error) {
  if (error instanceof MayaError) {
    console.error(`Error Code: ${error.code}`);
    console.error(`Message: ${error.message}`);
    console.error(`Reference: ${error.reference}`);
    
    // Handle specific error codes
    switch (error.code) {
      case MayaPaymentErrorCodes.INVALID_AUTH_CREDENTIALS:
        console.error('Authentication failed. Check your API keys.');
        break;
      case MayaPaymentErrorCodes.CURRENCY_NOT_SUPPORTED:
        console.error('Currency is not supported.');
        break;
      case MayaPaymentErrorCodes.INVALID_JSON_FORMAT:
        console.error('Invalid request format:', error.validationIssues);
        break;
    }
  }
}
```

## Roadmap

Features planned for future releases:

- [x] Maya Checkout - https://developers.maya.ph/reference/createv1checkout
- [ ] Maya Vault - https://developers.maya.ph/reference/createv1paymenttoken
- [ ] Pay with Maya - https://developers.maya.ph/reference/createv2singlepayment
- [ ] Managing Payment Transactions - https://developers.maya.ph/reference/capturev1payment
- [ ] Web hooks - https://developers.maya.ph/reference/createv1webhook-1
- [ ] Customization - https://developers.maya.ph/reference/setv1customizations-1
- [x] Online Payment Errors

## License

MIT