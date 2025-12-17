import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonSegment, IonSegmentButton, } from '@ionic/angular/standalone';
import { SettingsService, UnitSystem } from '../services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, NgIf, IonItem, IonLabel, IonSegment, IonSegmentButton, ]
})

export class SettingsPage {
  unitSystem: UnitSystem = 'metric';

  constructor(private settingsService: SettingsService) {}

  async ionViewWillEnter(): Promise<void> {
    this.unitSystem = await this.settingsService.getUnitSystem();
  }

  async onUnitChange(ev: CustomEvent): Promise<void> {
    const value = ev.detail.value as UnitSystem;
    this.unitSystem = value;
    await this.settingsService.setUnitSystem(value);
  }
}
