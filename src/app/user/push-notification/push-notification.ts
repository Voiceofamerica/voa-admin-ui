// Keep this file in sync with the server version, update the version below
// version: 1

export interface IMobileApp {
  appId: string
  name: string
  disabled: boolean
  language?: string
}

export interface IPushNotification {
  title: string
  message: string
  label: string
  deliveryDate?: number
  receipientTimeZone: boolean
  articleId?: number
  target: IMobileApp[]
}

export class PushNotification implements IPushNotification {
  constructor(
    public title: string,
    public message: string,
    public label: string,
    public target: IMobileApp[],
    public deliveryDate?: number,
    public receipientTimeZone: boolean = true
  ) {}
}
