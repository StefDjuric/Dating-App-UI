import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  templateUrl: './button.component.html',
  standalone: true,
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  @Input() text: string = '';
  @Input() type: 'button' | 'submit' = 'button';
  @Input() styling: string = '';
  @Input() disabled: boolean = false;
  @Input() iconSrc: string | null = null;

  @Output() clicked = new EventEmitter<MouseEvent>();

  OnClick(event: MouseEvent): void {
    if (!this.disabled) this.clicked.emit(event);
  }
}
