import { Component, OnInit, HostListener } from "@angular/core";
import { Router } from "@angular/router";
import { CommonModule } from '@angular/common';
import { timer, BehaviorSubject } from "rxjs";
import { take } from "rxjs/operators";

interface TourStep {
 title: string;
 content: string;
}
interface ScreenOffsets {
 top: number;
 right: number;
 bottom: number;
 left: number;
}

@Component({
  selector: 'app-guided-tour',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './guided-tour.component.html',
  styleUrls: ['./guided-tour.component.scss']
})
export class GuidedTourComponent implements OnInit {
 currentScreenType: string | null = null;

 private scrollListener: EventListener | null = null;
 private arrowKeyListener: EventListener | null = null;
 private tourAlreadyDisplayed: boolean = false;

 isTourActive = false;

 customHighlightPosition = { x: 0, y: 0, width: 0, height: 0 };

 setCustomHighlightPosition(
   x: number,
   y: number,
   width: number,
   height: number
 ): void {
   this.customHighlightPosition = { x, y, width, height };
 }

 resetCustomHighlightPosition() {
   this.setCustomHighlightPosition(10000, 10000, 100000, 100000);
 }

 updateHighlightForCardWithMargin(currentScreenType: string): void {
   const margin = 20;
   const screenOffsetsConfig: { [key: string]: ScreenOffsets } = {
     monitorHQ19p5: { top: 140, right: 50, bottom: -280, left: 380 },
     monitor22: { top: -50, right: -250, bottom: -510, left: 270 },
   };

   if (!(currentScreenType in screenOffsetsConfig)) {
     console.error(
       `Configuração de recorte não encontrada para o tipo de tela: ${currentScreenType}`
     );
     return;
   }

   const additionalOffsets = screenOffsetsConfig[currentScreenType];

   const cardElement = document.querySelector(".card-tour") as HTMLElement;
   if (cardElement) {
     const rect = cardElement.getBoundingClientRect();
     this.setCustomHighlightPosition(
       rect.left + additionalOffsets.left,
       rect.top + additionalOffsets.top,
       rect.width + (additionalOffsets.right - additionalOffsets.left),
       rect.height + (additionalOffsets.bottom - additionalOffsets.top)
     );
   }
 }

 updateHighlightForCardWithtable(currentScreenType: string): void {
   const margin = 20;
   const screenOffsetsConfig: { [key: string]: ScreenOffsets } = {
     monitorHQ19p5: { top: 90, right: 510, bottom: 100, left: -10 },
     monitor22: { top: 110, right: 1010, bottom: 200, left: -10 },
   };
   if (!(currentScreenType in screenOffsetsConfig)) {
     console.error(
       `Configuração de recorte não encontrada para o tipo de tela: ${currentScreenType}`
     );
     return;
   }
   const additionalOffsets = screenOffsetsConfig[currentScreenType];
   const cardElement = document.querySelector(".card-table") as HTMLElement;
   if (cardElement) {
     const rect = cardElement.getBoundingClientRect();
     this.setCustomHighlightPosition(
       rect.left + additionalOffsets.left,
       rect.top + additionalOffsets.top,
       rect.width + (additionalOffsets.right - additionalOffsets.left),
       rect.height + (additionalOffsets.bottom - additionalOffsets.top)
     );
   }
 }

 updateHighlightForCardWithImportButton(currentScreenType: string): void {
   const margin = 20;
   const screenOffsetsConfig: { [key: string]: ScreenOffsets } = {
     monitorHQ19p5: { top: -65, right: -270, bottom: -265, left: 0 },
     monitor22: { top: 270, right: -260, bottom: 50, left: 0 },
   };
   if (!(currentScreenType in screenOffsetsConfig)) {
     console.error(
       `Configuração de recorte não encontrada para o tipo de tela: ${currentScreenType}`
     );
     return;
   }
   const additionalOffsets = screenOffsetsConfig[currentScreenType];
   const cardElement = document.querySelector(".card-tour") as HTMLElement;
   if (cardElement) {
     const rect = cardElement.getBoundingClientRect();
     this.setCustomHighlightPosition(
       rect.left + additionalOffsets.left,
       rect.top + additionalOffsets.top,
       rect.width + (additionalOffsets.right - additionalOffsets.left),
       rect.height + (additionalOffsets.bottom - additionalOffsets.top)
     );
   }
 }

 updateHighlightForCardWithaddline(currentScreenType: string): void {
   const margin = 20;
   const screenOffsetsConfig: { [key: string]: ScreenOffsets } = {
     monitorHQ19p5: { top: 70, right: 470, bottom: -200, left: -10 },
     monitor22: { top: 110, right: 960, bottom: -160, left: -10 },
   };
   if (!(currentScreenType in screenOffsetsConfig)) {
     console.error(
       `Configuração de recorte não encontrada para o tipo de tela: ${currentScreenType}`
     );
     return;
   }
   const additionalOffsets = screenOffsetsConfig[currentScreenType];
   const cardElement = document.querySelector(
     ".card-table-lido"
   ) as HTMLElement;
   if (cardElement) {
     const rect = cardElement.getBoundingClientRect();
     this.setCustomHighlightPosition(
       rect.left + additionalOffsets.left,
       rect.top + additionalOffsets.top,
       rect.width + (additionalOffsets.right - additionalOffsets.left),
       rect.height + (additionalOffsets.bottom - additionalOffsets.top)
     );
   }
 }

 updateHighlightForCardWithsuccessline(currentScreenType: string): void {
   const margin = 20;
   const screenOffsetsConfig: { [key: string]: ScreenOffsets } = {
     monitorHQ19p5: { top: 0, right: 470, bottom: -260, left: -10 },
     monitor22: { top: -5, right: 960, bottom: -280, left: -10 },
   };
   if (!(currentScreenType in screenOffsetsConfig)) {
     console.error(
       `Configuração de recorte não encontrada para o tipo de tela: ${currentScreenType}`
     );
     return;
   }
   const additionalOffsets = screenOffsetsConfig[currentScreenType];
   const cardElement = document.querySelector(".card-tour") as HTMLElement;
   if (cardElement) {
     const rect = cardElement.getBoundingClientRect();
     this.setCustomHighlightPosition(
       rect.left + additionalOffsets.left,
       rect.top + additionalOffsets.top,
       rect.width + (additionalOffsets.right - additionalOffsets.left),
       rect.height + (additionalOffsets.bottom - additionalOffsets.top)
     );
   }
 }

 updateHighlightForCardWithErline(currentScreenType: string): void {
   const margin = 20;
   const screenOffsetsConfig: { [key: string]: ScreenOffsets } = {
     monitorHQ19p5: { top: -5, right: 440, bottom: -200, left: -10 },
     monitor22: { top: -35, right: 950, bottom: -235, left: -10 },
   };
   if (!(currentScreenType in screenOffsetsConfig)) {
     console.error(
       `Configuração de recorte não encontrada para o tipo de tela: ${currentScreenType}`
     );
     return;
   }
   const additionalOffsets = screenOffsetsConfig[currentScreenType];
   const cardElement = document.querySelector(
     ".card-table-success"
   ) as HTMLElement;
   if (cardElement) {
     const rect = cardElement.getBoundingClientRect();
     this.setCustomHighlightPosition(
       rect.left + additionalOffsets.left,
       rect.top + additionalOffsets.top,
       rect.width + (additionalOffsets.right - additionalOffsets.left),
       rect.height + (additionalOffsets.bottom - additionalOffsets.top)
     );
   }
 }

 Modline(currentScreenType: string): void {
   const margin = 20;
   const screenOffsetsConfig: { [key: string]: ScreenOffsets } = {
     monitorHQ19p5: { top: 390, right: 15, bottom: 150, left: 0 },
     monitor22: { top: 377, right: 510, bottom: 135, left: -10 },
   };
   if (!(currentScreenType in screenOffsetsConfig)) {
     console.error(
       `Configuração de recorte não encontrada para o tipo de tela: ${currentScreenType}`
     );
     return;
   }
   const additionalOffsets = screenOffsetsConfig[currentScreenType];

   const cardElement = document.querySelector(".card-tour") as HTMLElement;
   if (cardElement) {
     const rect = cardElement.getBoundingClientRect();
     this.setCustomHighlightPosition(
       rect.left + additionalOffsets.left,
       rect.top + additionalOffsets.top,
       rect.width + (additionalOffsets.right - additionalOffsets.left),
       rect.height + (additionalOffsets.bottom - additionalOffsets.top)
     );
   }
 }

 updateHighlightForCardWithIncline(currentScreenType: string): void {
   const margin = 40;
   const screenOffsetsConfig: { [key: string]: ScreenOffsets } = {
     monitorHQ19p5: { top: 400, right: 460, bottom: 150, left: 0 },
     monitor22: { top: 390, right: 950, bottom: 145, left: -10 },
   };
   if (!(currentScreenType in screenOffsetsConfig)) {
     console.error(
       `Configuração de recorte não encontrada para o tipo de tela: ${currentScreenType}`
     );
     return;
   }
   const additionalOffsets = screenOffsetsConfig[currentScreenType];
   const cardElement = document.querySelector(".card-tour") as HTMLElement;
   if (cardElement) {
     const rect = cardElement.getBoundingClientRect();
     this.setCustomHighlightPosition(
       rect.left + additionalOffsets.left,
       rect.top + additionalOffsets.top,
       rect.width + (additionalOffsets.right - additionalOffsets.left),
       rect.height + (additionalOffsets.bottom - additionalOffsets.top)
     );
   }
 }

 updateHighlightForCardWithCompline(currentScreenType: string): void {
   const margin = 20;
   const screenOffsetsConfig: { [key: string]: ScreenOffsets } = {
     monitorHQ19p5: { top: 320, right: 450, bottom: 80, left: 790 },
     monitor22: { top: 340, right: 920, bottom: 90, left: 1270 },
   };
   if (!(currentScreenType in screenOffsetsConfig)) {
     console.error(
       `Configuração de recorte não encontrada para o tipo de tela: ${currentScreenType}`
     );
     return;
   }
   const additionalOffsets = screenOffsetsConfig[currentScreenType];
   const cardElement = document.querySelector(".card-tour") as HTMLElement;
   if (cardElement) {
     const rect = cardElement.getBoundingClientRect();
     this.setCustomHighlightPosition(
       rect.left + additionalOffsets.left,
       rect.top + additionalOffsets.top,
       rect.width + (additionalOffsets.right - additionalOffsets.left),
       rect.height + (additionalOffsets.bottom - additionalOffsets.top)
     );
   }
 }

 steps: TourStep[] = [
   { title: "Passo 0", content: "novo" },
   { title: "Passo 1",content: "novo"  },
   { title: "Passo 2", content: "novo" },
   { title: "Passo 3", content: "novo" },
   { title: "Passo 4", content: "novo" },
   { title: "Passo 5", content: "novo" },
   { title: "Passo 6", content: "novo" },
   { title: "Passo 7", content: "novo" },
   { title: "Passo 8", content: "novo" },
   { title: "Passo 9", content: "novo" },
   { title: "Passo 10", content: "novo" },
   { title: "Passo 11", content: "novo" },
   { title: "Passo 12", content: "novo" },
   { title: "Passo 13", content: "novo" },
   { title: "Passo 14", content: "novo" },
   { title: "Passo 15", content: "novo" },
   { title: "Passo 16", content: "novo" },
   { title: "Passo 17", content: "novo" },
   { title: "Passo 18", content: "novo" },
   { title: "Passo 19", content: "novo" },
   { title: "Passo 20", content: "novo" },
 ];
 currentStepIndex = 0;

 constructor(
   private router: Router,
 ) {}

 ngOnInit(): void {

 }

 handleKeyboardNavigation(event: KeyboardEvent): void {
   if (event.key === "Enter") {
     this.nextStep();
   } else if (event.key === "Backspace") {
     this.previousStep();
   } else if (event.key === "Escape") {
     this.closeTour();
   }
 }

 @HostListener("document:keydown", ["$event"])
 onKeyDown(event: KeyboardEvent): void {
   this.handleKeyboardNavigation(event);
 }

 get currentStep(): TourStep {
   return this.steps[this.currentStepIndex];
 }

 startTour(): void {
  this.isTourActive = true;
}

 disableArrowKeys(): void {
   this.arrowKeyListener = (event: any) => {
     if (event.key === "ArrowUp" || event.key === "ArrowDown") {
       event.preventDefault();
     }
   };
   window.addEventListener("keydown", this.arrowKeyListener);
 }

 enableArrowKeys(): void {
   if (this.arrowKeyListener) {
     window.removeEventListener("keydown", this.arrowKeyListener);
     this.arrowKeyListener = null;
   }
 }

 disableMouseScroll(): void {
   this.scrollListener = (event) => {
     event.preventDefault();
   };
   window.addEventListener("wheel", this.scrollListener, { passive: false });
 }

 enableMouseScroll(): void {
   if (this.scrollListener) {
     window.removeEventListener("wheel", this.scrollListener);
     this.scrollListener = null;
   }
 }
 handleKeyDown(event: KeyboardEvent) {
   if (event.key === "ArrowUp") {
     this.handleArrowUp();
   } else if (event.key === "ArrowDown") {
     this.handleArrowDown();
   }
 }

 handleArrowUp() {
   window.open("https://lattes.cnpq.br/", "_blank");
 }

 handleArrowDown() {
   window.open(
     "https://buscatextual.cnpq.br/buscatextual/busca.do?metodo=apresentar",
     "_blank"
   );
 }

 closeTour(): void {
   if (this.router.url === "/resultado-importacao") {
     this.router.navigate(["/dashboard"]);
   }
   this.isTourActive = false;
   this.currentStepIndex = 0;
   this.resetCustomHighlightPosition();
   this.enableMouseScroll();
   this.enableArrowKeys();
 }

 nextStep(): void {
  if (this.currentStepIndex < this.steps.length - 1) {
    this.currentStepIndex++;
    if (this.currentStepIndex === 20) {
      setTimeout(() => {
        this.closeTour();
      }, 7000);
    }
  } else {
    this.isTourActive = false;
  }
 }

 updateHighlightForCardWithBackMargin(currentScreenType: string): void {
   const margin = 20;

   const screenOffsetsConfig: { [key: string]: ScreenOffsets } = {
     monitorHQ19p5: { top: 100, right: 270, bottom: -60, left: 480 },
     monitor22: { top: -50, right: -250, bottom: -510, left: 270 },
   };

   if (!(currentScreenType in screenOffsetsConfig)) {
     console.error(
       `Configuração de recorte não encontrada para o tipo de tela: ${currentScreenType}`
     );
     return;
   }

   const additionalOffsets = screenOffsetsConfig[currentScreenType];

   const cardElement = document.querySelector(".card-tour") as HTMLElement;
   if (cardElement) {
     const rect = cardElement.getBoundingClientRect();
     const height = Math.max(
       rect.height + (additionalOffsets.bottom - additionalOffsets.top),
       0
     );

     this.setCustomHighlightPosition(
       rect.left + additionalOffsets.left,
       rect.top + additionalOffsets.top,
       rect.width + (additionalOffsets.right - additionalOffsets.left),
       height
     );
   }
 }

 previousStep(): void {
  if (this.currentStepIndex > 0) {
    this.currentStepIndex--;
    }
  }

}
