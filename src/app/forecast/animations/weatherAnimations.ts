import { animate, query, stagger, style, transition, trigger } from "@angular/animations";

export const weatherAnimations = [
    trigger('searchFormLoaded', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-100px)' }),
          animate('.3s ease-out', style({ opacity: 1, transform: 'none' }))
      ])
    ]),
    trigger('weatherLoaded', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-300px)' }),
          animate('.3s ease-out', style({ opacity: 1, transform: 'none' }))
      ])
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        query('.fade-in-element', [
          style({ opacity: '0' }),
          stagger(50, [
            animate('.3s ease-out', style({ opacity: 1 }))
          ])
        ])
      ])
    ]),
    trigger('fadeSlideIn', [
      transition(':enter', [
        query('.location-list-element', [
          style({ opacity: '0', transform: 'translateX(-100px)' }),
          stagger(50, [
            animate('.3s ease-out', style({ opacity: 1, transform: 'none' }))
          ])
        ])
      ]),
    ]),
  ]