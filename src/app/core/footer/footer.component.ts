import { Component, OnInit } from '@angular/core';
import { InfoService } from '../info.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  info: any;

  constructor(private service: InfoService) { }

  ngOnInit(): void {
    this.info = this.service.getAppInfo();
  }

}
