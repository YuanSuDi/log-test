import { Component, OnInit,Input } from '@angular/core';
import { LogLevel, LogService } from '../log.service';

@Component({
  selector: 'app-logtest',
  templateUrl: './logtest.component.html',
  styleUrls: ['./logtest.component.css']
})
export class LogtestComponent implements OnInit {

  constructor(
    private logger: LogService
  ) { }

  ngOnInit(): void {
  }

  logCon:string = ''
  logLevel: string = LogLevel.All.toString()

  logtest() {
    if(this.logCon){
      switch (this.logLevel){
        case LogLevel.Debug.toString():
          this.logger.debug(this.logCon);
          break;
        case LogLevel.Info.toString():
          this.logger.info(this.logCon);
          break;
        case LogLevel.Warn.toString():
          this.logger.warn(this.logCon);
          break;
        case LogLevel.Error.toString():
          this.logger.error(this.logCon);
          break;
        default:
          this.logger.log(this.logCon);
      }
    }
  }

  logClear() {
    this.logger.clearLocalStorageLog()
  }
}
