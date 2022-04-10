import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  level: LogLevel = LogLevel.All;
  logWithDate: boolean = true;

  constructor() { }


  info(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Info, optionalParams);
  }

  warn(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Warn, optionalParams);
  }

  error(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Error, optionalParams);
  }


  private writeToLog(msg: string, level: LogLevel, params: any[]) {
    if (this.shouldLog(level)) {
        let value: string = "";
        
        // Build log string
        if (this.logWithDate) {
            value = new Date() + " - ";
        }
        
        value += "Type: " + LogLevel[level];
        value += " - Message: " + msg;
        if (params.length) {
            value += " - Extra Info: " + this.formatParams(params);
        }
        
        // Log the value
        console.log(value);
        let logcont = localStorage.getItem("log")
        if (logcont) {
          localStorage.setItem("log", logcont.concat("\n", value))
        } else {
          localStorage.setItem("log", value)
        }
    }
  }

  private shouldLog(level: LogLevel): boolean {
    let ret: boolean = false;
    if ((level >= this.level && level !== LogLevel.Off) || this.level === LogLevel.All) {
        ret = true;
    }
    return ret;
  }

  private formatParams(params: any[]): string {
    let ret: string = params.join(",");
    
    // Is there at least one object in the array?
    if (params.some(p => typeof p == "object")) {
        ret = "";
        
        // Build comma-delimited string
        for (let item of params) {
            ret += JSON.stringify(item) + ",";
        }
    }
    return ret;
  }

}



export enum LogLevel {
  All = 0,
  Debug = 1,
  Info = 2,
  Warn = 3,
  Error = 4,
  Fatal = 5,
  Off = 6
}
