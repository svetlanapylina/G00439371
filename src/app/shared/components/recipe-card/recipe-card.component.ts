import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonIcon} from '@ionic/angular/standalone';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonIcon, RouterLink, NgIf],
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss'],
})
export class RecipeCardComponent {
  @Input() id!: number;
  @Input() title = '';
  @Input() image = '';

  // Show remove icon (used on Favourites)
  @Input() showRemove = false;

  // Optional label for the details button
  @Input() detailsLabel = 'DETAILS';

  @Output() remove = new EventEmitter<number>();

  onRemoveClick(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
    this.remove.emit(this.id);
  }
}