import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { observable, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class LogService {

  level: LogLevel = LogLevel.All;
  logWithDate: boolean = true;

  constructor(
    private datePipe: DatePipe,
    private http: HttpClient
    ) { }

  debug(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Debug, optionalParams);
  }

  info(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Info, optionalParams);
  }

  warn(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Warn, optionalParams);
  }

  error(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Error, optionalParams);
  }

  fatal(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Fatal, optionalParams);
  }

  log(msg: string, ...optionalParams: any[]) {
      this.writeToLog(msg, LogLevel.All, optionalParams);
  }


  private writeToLog(msg: string, level: LogLevel, params: any[]) {
    if (this.shouldLog(level)) {
        let value: string = "";
        
        // Build log string
        if (this.logWithDate) {
            value = this.datePipe.transform(new Date(), 'yyyy/MM/dd HH:mm:ss') + " - ";
        }
        
        value += "Type: " + LogLevel[level];
        value += " - Message: " + msg;
        if (params.length) {
            value += " - Extra Info: " + this.formatParams(params);
        }
        
        // Log the value
        this.printLog(level, value);
        try{
          let logcont = localStorage.getItem("log")
          if (logcont) {
            localStorage.setItem("log", logcont.concat("\n", value))
          } else {
            localStorage.setItem("log", value)
          }
        } catch (e) {
          console.error(e)
        }
    }
  }

  private printLog(level: LogLevel, value: string): void{
    switch (level){
      case LogLevel.Debug:
        console.debug(value);
        break;
      case LogLevel.Info:
        console.info(value);
        break;
      case LogLevel.Warn:
        console.warn(value);
        break;
      case LogLevel.Error:
        console.error(value);
        break;
      default:
        console.log(value);
    }
  }

  private shouldLog(level: LogLevel): boolean {
    let ret: boolean = false;
    if ((level >= this.level && level !== LogLevel.Off) || level === LogLevel.All) {
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

  // ローカルストレージのログを取得
  getLocalStorageLog(): string {
    let log = localStorage.getItem("log")
    if (log) {
      return log;
    } else {
      return "";
    }
  }

  // ローカルストレージのログをクリア
  clearLocalStorageLog():void {
    localStorage.removeItem("log")
  }

  // ログをバックエンド側に送る
  saveLogToBackEnd() : Observable<any>{
    let log = this.getLocalStorageLog();
    let url = "/api/log"
    return this.http.post(
      url,
      { "log": log },
      { observe: 'response' }
    );
  }
}


// ログレベルイーナム
export enum LogLevel {
  All = 0,
  Debug = 1,
  Info = 2,
  Warn = 3,
  Error = 4,
  Fatal = 5,
  Off = 6
}
