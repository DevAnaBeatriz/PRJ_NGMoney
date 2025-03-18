import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Output() openModal = new EventEmitter<void>();

  openTransactionModal(): void {
    this.openModal.emit();
  }
}
