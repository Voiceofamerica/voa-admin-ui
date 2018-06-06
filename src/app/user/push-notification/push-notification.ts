export interface IMobileApp {
  appId: string
  name: string
  disabled?: boolean
  language?: string
}

export const MobileApps: IMobileApp[] = [
  { appId: 'voavi', name: 'Vietanamese' },
  { appId: 'voako', name: 'Korean' },
  { appId: 'voafa', name: 'Farsi' },
  { appId: 'voaur', name: 'Urdu' },
  { appId: 'voazh', name: 'Mandarin' },
  { appId: 'voabo', name: 'Tibetan', disabled: true },
  { appId: 'voaen', name: 'English', disabled: true },
  { appId: 'voaru', name: 'Russian', disabled: true },
  { appId: 'voaes', name: 'Spanish', disabled: true },
  { appId: 'voaps', name: 'Pashto', language: 'ps', disabled: true },
  { appId: 'voaps', name: 'Dari', language: 'prs', disabled: true },
  { appId: 'voaam', name: 'Afaan Oromoo', language: 'om', disabled: true },
  { appId: 'voaam', name: 'Tigrinya', language: 'ti', disabled: true },
  { appId: 'voaam', name: 'Amharic', language: 'am', disabled: true },
]

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
