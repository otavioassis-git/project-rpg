import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SoundboardRoutingModule } from './soundboard-routing.module';
import { SoundboardComponent } from './pages/soundboard/soundboard.component';


@NgModule({
  declarations: [
    SoundboardComponent
  ],
  imports: [
    CommonModule,
    SoundboardRoutingModule
  ]
})
export class SoundboardModule { }
