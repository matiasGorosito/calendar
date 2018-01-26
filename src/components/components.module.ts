import { NgModule } from '@angular/core';
import { TimelineComponent } from './timeline/timeline';
import { EventsComponent } from './events/events';
@NgModule({
	declarations: [TimelineComponent,
    EventsComponent],
	imports: [],
	exports: [TimelineComponent,
    EventsComponent]
})
export class ComponentsModule {}
