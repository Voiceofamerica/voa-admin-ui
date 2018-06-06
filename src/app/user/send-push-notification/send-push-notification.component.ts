import { Component, OnInit } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import {
  RequiredTextValidation,
  PushDateValidation,
  NumericInputValidation,
} from '../../common/validations'
import { IPushNotification, IMobileApp } from '../push-notification/push-notification'
import { PushNotificationService } from '../push-notification/push-notification.service'
import { CacheService } from '../../auth/cache.service'

@Component({
  selector: 'app-send-push-notification',
  templateUrl: './send-push-notification.component.html',
  styles: [
    `
      .error {
        color: red;
      }
    `,
  ],
})
export class SendPushNotificationComponent extends CacheService implements OnInit {
  pushForm: FormGroup
  formError: ''
  constructor(
    private formBuilder: FormBuilder,
    private pushNotificationService: PushNotificationService
  ) {
    super()
  }

  ngOnInit() {
    const draftPn = this.getItem<IPushNotification>('draft-pn')
    this.buildPushForm(draftPn)
  }

  buildPushForm(pn?: IPushNotification) {
    this.pushForm = this.formBuilder.group({
      title: [
        {
          value: (pn && pn.title) || '',
        },
        RequiredTextValidation,
      ],
      message: [
        {
          value: (pn && pn.message) || '',
        },
        RequiredTextValidation,
      ],
      label: [
        {
          value: (pn && pn.label) || '',
          help:
            'Used to identify this message for Analytics purposes. Not shown to users.',
        },
        RequiredTextValidation,
      ],
      articleId: [
        {
          value: (pn && pn.articleId) || '',
          help: 'Optional numerical ID of an Article that should open in the app.',
        },
        NumericInputValidation,
      ],
      deliveryDate: [
        {
          value: (pn && pn.deliveryDate) || '',
          help:
            'When this message should be sent. Now or schedule up to one month in advance.',
        },
        PushDateValidation,
      ],
      receipientTimeZone: [(pn && pn.receipientTimeZone) || true],
      target: this.formBuilder.array(this.buildTargetArray(pn ? pn.target : [])),
    })
  }

  addTarget() {
    this.targetArray.push(this.buildTargetFormControl(this.targetArray.value.length + 1))
  }

  get targetArray(): FormArray {
    return <FormArray>this.pushForm.get('target')
  }

  private buildTargetArray(targets: IMobileApp[]) {
    const groups = []

    if (!targets || (targets && targets.length === 0)) {
      groups.push(this.buildTargetFormControl(1))
    } else {
      let i = 0
      targets.forEach(t => {
        i++
        groups.push(this.buildTargetFormControl(i, t.appId, t.language))
      })
    }

    return groups
  }

  private buildTargetFormControl(id, appId?: string, language?: string) {
    return this.formBuilder.group({
      id: [id],
      appId: [appId || '', Validators.required],
      language: [language || ''],
    })
  }

  async send(form: FormGroup) {
    this.pushNotificationService
      .send(form.value)
      .subscribe(res => this.buildPushForm(res), err => (this.formError = err))
  }
}
