import { Component, OnInit } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { RequiredTextValidation, NumericInputValidation } from '../../common/validations'
import { IPushNotification, IMobileApp } from '../push-notification/push-notification'
import { PushNotificationService } from '../push-notification/push-notification.service'
import { CacheService } from '../../auth/cache.service'
import * as moment from 'moment'
import { MobileApps } from './config-data'
import { UiService } from '../../common/ui.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-send-push-notification',
  templateUrl: './send-push-notification.component.html',
  styles: [
    `
      .error {
        color: red;
      }
    `,
    `
      .bold {
        font-weight: bold;
      }
    `,
    `
      .date {
        padding-top: 6px;
      }
    `,
    `
      .mobile-apps {
        padding-top: 16px;
      }
    `,
  ],
})
export class SendPushNotificationComponent extends CacheService implements OnInit {
  isBusy = false
  pushForm: FormGroup
  formError: ''
  scheduleDelivery = false
  MobileApps = MobileApps.sort((a, b) => a.name.localeCompare(b.name)).sort(
    (a, b) => (a.disabled ? 1 : 0) - (b.disabled ? 1 : 0) || a.name.localeCompare(b.name)
  )
  minDate = moment()
    .utc()
    .toDate()
  maxDate = moment()
    .utc()
    .add(1, 'months')
    .toDate()
  constructor(
    private formBuilder: FormBuilder,
    private pushNotificationService: PushNotificationService,
    private uiService: UiService,
    private router: Router
  ) {
    super()
  }

  ngOnInit() {
    const draftPn = this.getItem<IPushNotification>('draft-pn')
    this.buildPushForm(draftPn)
  }

  scheduleDeliveryChange(event) {
    this.scheduleDelivery = event.checked
  }

  get deliveryDate(): Date {
    return this.pushForm.get('deliveryDate').value
  }

  get scheduledDate() {
    const timezone = this.pushForm.get('receipientTimeZone').value
    return timezone ? this.deliveryDate.toUTCString() : this.deliveryDate.toString()
  }

  onTimeChange(event) {
    const timeString = event.currentTarget.value
    const datetime = new Date(`1970-01-01T${timeString}Z`)
    this.deliveryDate.setHours(datetime.getHours() + 1, datetime.getMinutes(), 0)
  }

  buildPushForm(pn?: IPushNotification) {
    this.pushForm = this.formBuilder.group({
      title: [(pn && pn.title) || '', RequiredTextValidation],
      message: [(pn && pn.message) || '', RequiredTextValidation],
      label: [(pn && pn.label) || '', RequiredTextValidation],
      articleId: [(pn && pn.articleId) || '', NumericInputValidation],
      deliveryDate: [
        pn && pn.deliveryDate ? new Date(pn.deliveryDate) : this.minDate,
        Validators.required,
      ],
      deliveryTime: [
        pn && pn.deliveryDate ? new Date(pn.deliveryDate).toTimeString() : '00:00',
      ],
      receipientTimeZone: [(pn && pn.receipientTimeZone) || true, Validators.required],
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
        groups.push(this.buildTargetFormControl(i, t))
      })
    }

    return groups
  }

  private buildTargetFormControl(id, mobileApp?: IMobileApp) {
    return this.formBuilder.group({
      id: [id],
      mobileApp: mobileApp,
    })
  }

  clearCache() {
    this.pushNotificationService.clearCache()
  }

  async send(form: FormGroup) {
    if (!this.targetArray.value[0] || !this.targetArray.value[0].mobileApp) {
      this.uiService.showToast('Select a language before sending your message.')
      return
    }

    this.uiService
      .showDialog(
        `${this.targetArray.value[0].mobileApp.name} Push Notification`,
        'This message will reach all target mobile apps. This action cannot be undone.',
        'Send Notification',
        'Cancel'
      )
      .subscribe(res => {
        if (res) {
          this.sendPushNotificationHelper(form)
        }
      })
  }

  private sendPushNotificationHelper(form: FormGroup) {
    this.isBusy = true

    this.pushNotificationService.send(form.value).subscribe(
      res => {
        console.log(res)
        this.uiService.showToast('Push Notification was sent successfully!')
        this.router.navigate(['/home'])
        this.isBusy = false
      },
      err => {
        console.log(err)
        this.uiService.showToast(
          'Failed to send Push Notification. Contact system administrator.'
        )
        this.formError = err
        this.isBusy = false
      }
    )
  }
}
