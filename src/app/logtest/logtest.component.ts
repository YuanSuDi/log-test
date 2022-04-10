import { Component, OnInit } from '@angular/core';
import { LogService } from '../log.service';

@Component({
  selector: 'app-logtest',
  templateUrl: './logtest.component.html',
  styleUrls: ['./logtest.component.css']
})
export class LogtestComponent implements OnInit {

  constructor(
    private logService: LogService
  ) { }

  ngOnInit(): void {
  }

  logtest() {
    this.logService.info("Test 2 Parameters", "Paul", "Smith");

    this.logService.error("Test Mixed Parameters", true, false, "Paul", "Smith");

    let values = ["1", "Paul", "Smith"];
    this.logService.warn("Test String and Array", "Some log entry", values);
  }

}
