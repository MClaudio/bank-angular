import { CommonModule } from '@angular/common';
import {
  AfterContentInit,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @ViewChild('modal') modal!: ElementRef;

  /**
   * @description
   * Constructor
   *
   * @param {ModalService} _modalService - ModalService
   */
  constructor(private _modalService: ModalService) {}

  /**
   * @description
   * Get show modal.
   *
   * @returns
   */
  public get show() {
    return this._modalService.show;
  }

  /**
   * @description
   * Set show modal.
   *
   * @param {boolean} show - Show modal
   * @returns
   */
  public set show(show: boolean) {
    this._modalService.show = show;
  }

  /**
   * @description
   * On event press in ok button.
   *
   * @returns
   */
  public onOk() {
    this._modalService.eventOnOk.emit(true);
    this.show = false;
  }

  /**
   * @description
   * Get is decision modal.
   *
   * @returns
   */
  public get isDecision() {
    return this._modalService.isDecision;
  }

  /**
   * @description
   * Get type modal.
   *
   * @returns
   */
  public get type() {
    return this._modalService.type;
  }

  /**
   * @description
   * Get title modal.
   *
   * @returns
   */
  public get title() {
    return this._modalService.title;
  }

  /**
   * @description
   * Get body modal.
   *
   * @returns
   */
  public get body() {
    return this._modalService.body;
  }
}
