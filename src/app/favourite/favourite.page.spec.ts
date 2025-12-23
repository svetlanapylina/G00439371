import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavouritePage } from './favourite.page';
import { RouterLink } from '@angular/router';
import { IonButtons, IonButton, IonIcon } from '@ionic/angular/standalone';


describe('FavouritePage', () => {
  let component: FavouritePage;
  let fixture: ComponentFixture<FavouritePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FavouritePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});