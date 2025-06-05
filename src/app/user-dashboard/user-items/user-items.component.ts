import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'shared/data.service';

@Component({
  selector: 'app-user-items',
  templateUrl: './user-items.component.html',
  styleUrls: ['./user-items.component.scss']
})
export class UserItemsComponent implements OnInit {
  @Input() userDetails: { [key: string]: any } = {}

  constructor(private dataService : DataService){}
  ngOnInit(): void {
  }
}
