import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    template: `<span>I am {{ name ?? 'stranger' }}</span>
    <button (click)="onClick()" type="button">Say hello</button>`,
    styles: `
    span {
        color: var(--text-color, red);
    }
    `,
    standalone: true,
})
export class HelloComponent {
    @Input() name?: string;
    @Output() change = new EventEmitter<string>();

    onClick() {
        this.change.emit(`${this.name ?? 'stranger'} says hello`);
    }
}