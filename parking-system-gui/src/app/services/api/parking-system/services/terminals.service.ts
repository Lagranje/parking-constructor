import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Terminal } from "../models/terminals.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class TerminalsService {
  readonly rootUrl = environment.api.parkingSystem;

  constructor(private httpClient: HttpClient) {
  }

  public getTerminals(): Observable<[Terminal]> {
    return this.httpClient.get<[Terminal]>(`${this.rootUrl}/terminals`);
  }

  public postTerminal(terminal: Terminal): Observable<Terminal> {
    return this.httpClient.post<Terminal>(`${this.rootUrl}/terminals`, terminal);
  }

  public deleteTerminal(id: string) {
    return this.httpClient.delete<Terminal>(`${this.rootUrl}/terminals/${id}`);
  }
}

