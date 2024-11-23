import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EsperandoPage } from './esperando.page';
import { EsperandoPageRoutingModule } from './esperando-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EsperandoPageRoutingModule
  ],
  declarations: [EsperandoPage],
  exports: [EsperandoPage]  // Exporta la página
})
export class EsperandoPageModule {}
