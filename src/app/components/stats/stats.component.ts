import {Component, OnInit} from '@angular/core';
import {EventDiverService} from "../../state/eventdiver.service";
import {ActionEvent} from "../../state/product.state";

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css'
})
export class StatsComponent implements OnInit{
  counter:number=0;
  constructor(private eventDrivenService:EventDiverService) { }

  ngOnInit(): void {
    this.eventDrivenService.sourceEventSubjectObservable.subscribe((actionEvent:ActionEvent)=>{
      ++this.counter;
    })
  }

}
