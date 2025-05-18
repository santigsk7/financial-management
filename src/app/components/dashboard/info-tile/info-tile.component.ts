import { CurrencyPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-tile',
  templateUrl: './info-tile.component.html',
  styleUrls: ['./info-tile.component.scss'],
  providers:[CurrencyPipe]
})
export class InfoTileComponent implements OnInit {
  @Input() tileInfo!: InfoTile;

  constructor() { }

  ngOnInit(): void {
  }
}

interface InfoTile {
  title: string;
  value: number;
  icon: string;
}
