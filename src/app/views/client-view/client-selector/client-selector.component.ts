import { Component, OnInit, Output, EventEmitter, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


@Component({
  selector: 'app-client-selector',
  templateUrl: './client-selector.component.html',
  styleUrls: ['./client-selector.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ClientSelectorComponent),
      multi: true
    }
  ]
})
export class ClientSelectorComponent implements OnInit, ControlValueAccessor {

  @Input() clients: any;
  @Output() clientSelected = new EventEmitter();

  constructor() { }
  ngOnInit() {
  }

  // Handle change of client
  onSelectClient(event) {

    this.clientSelected.emit(event.target.value);
  }

  //ControleValueAccessor Implementation, copy pasted from : https://medium.com/@majdasab/implementing-control-value-accessor-in-angular-1b89f2f84ebf
  onChange: any = () => { }
  onTouch: any = () => { }
  val = "" // this is the updated value that the class accesses
  set value(val) {  // this value is updated by programmatic changes if( val !== undefined && this.val !== val)
    {
    this.val = val
      this.onChange(val)
      this.onTouch(val)
    }
  }
  // this method sets the value programmatically
  writeValue(value: any){ this.value = value}
  // upon UI element value changes, this method gets triggered
  registerOnChange(fn: any){this.onChange = fn}
  // upon touching the element, this method gets triggered
  registerOnTouched(fn: any){this.onTouch = fn}
}

