import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AppConfig } from '../app.config';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SecurityScannerService {

  private handleError(error: any): Observable<any> {

    if (error.status === 500) {
      error.statusText = 'Server is not reachable. Please try again later.'
    } else if (error.status === 0) {
      error.statusText = 'Internal server error occured. Please try again later.'
    }
    return throwError(error);
  }

  constructor(public http: HttpClient) {
  }

  getHeader() {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    const token = localStorage.getItem('token');
    headers = headers.set('Authorization', 'Bearer ' + token);
    return headers;

  }



  login(data: any) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(AppConfig.APP_URL + '/login', data).pipe(map((res: Response) => {
      // if (res['errcode'] !== '00000') {
      //   return [];
      // }
      return res;
    }));
  }

  signup(data: any) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put(AppConfig.APP_URL + '/users/sign-up', data);
  }
  
  processData(data: any) {
    debugger
    const headers = this.getHeader();
    return this.http.post(AppConfig.APP_URL + '/scanner/scan-data', data, { headers: headers });
  }

  scanFile(file: File): Observable<HttpEvent<{}>> {
    let formdata: FormData = new FormData();
    let token = localStorage.getItem('token');
    formdata.append('file', file);


    const req = new HttpRequest('POST', AppConfig.APP_URL + '/scanner/scan-file', formdata, {
      headers: new HttpHeaders({
        'Authorization': token
      }),
      reportProgress: true,
      responseType: 'json',
    });

    return this.http.request(req);
  }

  getScanResults(userId, pageno, limit) {
    let headers = this.getHeader();
    headers.append('Content-Type', 'application/json');
    return this.http.get(AppConfig.APP_URL + '/scanner/scan-history?id='+userId+'&p='+pageno+'&l=' + limit, {headers: headers}).pipe(map(res => res), catchError(error => this.handleError(error)));
  }

  getScanResultDetail(userId, resultId) {
    let headers = this.getHeader();
    headers.append('Content-Type', 'application/json');
    return this.http.get(AppConfig.APP_URL + '/scanner/scan-result?id='+userId+'&rid='+ resultId, {headers: headers}).pipe(map(res => res), catchError(error => this.handleError(error)));
  }

}
