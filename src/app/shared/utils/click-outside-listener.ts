import { Directive, ElementRef, HostListener } from "@angular/core";

@Directive()
export abstract class ClickOutsideListener {
  constructor(protected elementRef: ElementRef<HTMLElement>) {}

  protected abstract get isOpened(): boolean;
  protected abstract closeOnOutsideClick(): void;

  @HostListener("document:click", ["$event"])
  onDocumentClick(event: MouseEvent) {
    if (!this.isOpened) {
      return;
    }

    const target = event.target as Node | null;
    if (target && !this.elementRef.nativeElement.contains(target)) {
      this.closeOnOutsideClick();
    }
  }
}
