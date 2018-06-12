import { Directive, ElementRef, HostListener, Renderer, forwardRef } from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'

export const DATE_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DateValueAccessorDirective),
  multi: true,
}

// Inspired by https://github.com/JohannesHoppe/angular-date-value-accessor

@Directive({
  selector: '[appUseValueAsDate]',
  providers: [DATE_VALUE_ACCESSOR],
})
export class DateValueAccessorDirective implements ControlValueAccessor {
  @HostListener('input', ['$event.target.valueAsDate'])
  onChange = (_: any) => {
    console.log(_)
  }
  @HostListener('blur', [])
  onTouched = () => {}

  constructor(private _renderer: Renderer, private _elementRef: ElementRef) {}

  private setValue(value: number) {
    this._renderer.setElementProperty(this._elementRef.nativeElement, 'value', value)
  }

  writeValue(value: number): void {
    if (!value) {
      this.setValue(null)
      return
    }
    const dateObject = this.convertFromTimestamp(value)
    this._renderer.setElementProperty(
      this._elementRef.nativeElement,
      'valueAsDate',
      dateObject
    )
  }

  handleChange(event) {
    const timestamp = this.convertToTimestamp(event.target.value)
    this.onChange(timestamp)
  }

  convertToTimestamp(formatedDate: Date): number {
    return formatedDate.getTime()
  }

  convertFromTimestamp(timestamp: number): Date {
    return new Date(timestamp)
  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn
  }

  setDisabledState(isDisabled: boolean): void {
    this._renderer.setElementProperty(
      this._elementRef.nativeElement,
      'disabled',
      isDisabled
    )
  }
}
