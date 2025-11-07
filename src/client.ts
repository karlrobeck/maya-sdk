
export const MayaAPIEnvironment = {
  "SANDBOX": {
    apiUrl:"https://pg-sandbox.paymaya.com",
    paymentPage:"https://payments-web-sandbox.paymaya.com",
    mayaManager:"https://manager-sandbox.paymaya.com"
  },
  "PRODUCTION":{
    apiUrl:"https://pg.maya.ph",
    paymentPage:"https://payments.maya.ph",
    mayaManager:"https://manager.paymaya.com"
  }
} as const

export interface MayaRequestExecutor {
  send(fetcher:typeof fetch): Promise<{}>
}