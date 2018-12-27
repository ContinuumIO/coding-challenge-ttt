import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs/index';
import { takeUntil } from 'rxjs/internal/operators';

@Component({
  selector: 'app-board-space',
  templateUrl: './board-space.component.html',
  styleUrls: ['./board-space.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: BoardSpaceComponent,
    multi: true
  }]
})
export class BoardSpaceComponent implements OnInit, OnDestroy, ControlValueAccessor {

  selectedByPlayer = null;
  @Input() player;
  @Output() spaceSelected = new EventEmitter();
  disabled: boolean = false;
  destroy$: Subject<boolean> = new Subject();
  @ViewChild('space') spaceElement;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSelect(player) {
    this.selectedByPlayer = player;
    this.disabled = true;
    this.spaceSelected.emit(this.selectedByPlayer);

  }

  writeValue(val) {
    this.selectedByPlayer = val;
  }

  registerOnChange(fn) {
    this.spaceSelected.pipe(takeUntil(this.destroy$)).subscribe(fn);
  }

  registerOnTouched(fn) {
    this.spaceSelected.pipe(takeUntil(this.destroy$)).subscribe(fn);
  }

  setDisabledState(val) {
    this.disabled = val;
  }

  get spaceVal() {
    if (this.selectedByPlayer === null) return '';
    return ((this.selectedByPlayer) ? 'O' : 'X');
  }

}
