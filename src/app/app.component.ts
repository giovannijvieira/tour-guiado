import { Component, ViewChild } from '@angular/core';
import { GuidedTourComponent } from './guided-tour/guided-tour.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [GuidedTourComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tour-presentation';

  @ViewChild(GuidedTourComponent) guidedTourComponent!: GuidedTourComponent;

  startTour() {
    if (this.guidedTourComponent) {
      this.guidedTourComponent.startTour();
    }
  }
}
