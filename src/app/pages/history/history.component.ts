import { Component, OnInit } from '@angular/core';
import { SecurityScannerService } from 'src/app/services/security-scanner.service';
import 'jquery';
import { environment } from 'src/environments/environment';
declare var $:any;

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  isInProgress: boolean = false;
  histories: any[] = [];
  totalPages: number = 0;
  currentPage: number = 1;
  scanResult: any = {};
  searchKeys: string[] = [];
  categories: any[] = [];
  results: any[] = [];
  selectedKey: string;
  noResultFound: boolean = false;
  currentScanResultId: number;
  currentScanResultUserId: string;


  constructor(
    private _service: SecurityScannerService
  ) { }

  ngOnInit(): void {
    this.currentScanResultId = null;
    this.currentScanResultUserId = '';
    this.getHistoryList(0);
  }

  getHistoryList(pageno) {
    this.isInProgress = true;
    let userId = localStorage.getItem('user_id');
    this._service.getScanResults(userId, pageno, 10).subscribe(
      response => {
        if (!!response && !!response['content']) {
          this.histories = response['content'];
          this.totalPages = response['totalPages'];
          this.currentPage = pageno + 1;
        }
        this.isInProgress = false;
      },error => {
        console.error(error);
        this.isInProgress = false;
      }
    );
    
  }

  goToFirst() {
    this.getHistoryList(0);
  }

  goToPrevious() {
    debugger
    this.getHistoryList(this.currentPage-2);
  }

  goToNext() {
    debugger
    this.getHistoryList(this.currentPage);
  }

  goToLast() {
    this.getHistoryList(this.totalPages-1);
  }

  openModal(scanResult){
    this.categories = [];
    this.results = [];
    this.noResultFound = false;
    this.isInProgress = true;
    this.searchKeys = [];
    let userId = localStorage.getItem('user_id');
    this._service.getScanResultDetail(userId, scanResult.scanResultIdentity.scanResultId).subscribe(
      response => {
        this.scanResult = response;
        for (let key in this.scanResult) {
          this.searchKeys.push(key);
        }

        if (!this.searchKeys || this.searchKeys.length <= 0) {
          this.noResultFound = true;
          this.isInProgress = false;
          $('#exampleModal').modal('show');
          return;
        }
        for (let key of this.searchKeys) {
          key = key.replace(/(\r\n|\n|\r)/gm, "");
          this.selectedKey = key;
          break;
        }
        // for (let key of this.searchKeys) {
        if (!!this.selectedKey) {
          this.processData();
        }

        $('#exampleModal').modal('show');
        this.isInProgress = false;
      }, error => {
        this.isInProgress = false;
      }
    );
    
    }

    closeModal() {
      $('#exampleModal').modal('hide');
    }

    processData() {
      this.categories = [];
      let resultList = [];
      this.results = [];
      let data = this.scanResult[this.selectedKey];
      this.currentScanResultId = data.scanResultId;
      this.currentScanResultUserId = data.userId;
      const categoryData = JSON.parse(data['categories']);
      const resultData = JSON.parse(data['results']);
      if (!!categoryData) {
        for (var category in categoryData) {
          let item = {};
          item['key'] = category;
          item['value'] = categoryData[category];
          this.categories.push(item);
        }
        if (this.categories.length % 2 !== 0) {
          let item = {};
          item['key'] = '';
          item['value'] = '';
          this.categories.push(item);
        }
      }
  
      if (!!resultData) {
  
  
        for (var result in resultData) {
  
          let item = {};
          item['key'] = result;
          const values = resultData[result];
          item['category'] = values['category'];
          item['result'] = values['result'];
          resultList.push(item);
        }
        // resultData.sort((a, b) => (a.key > b.key) ? 1 : -1);
  
        const maliciousList = resultList.filter(item => item.category === 'malicious');
        this.results = maliciousList;
        const harmless = resultList.filter(item => item.category === 'harmless');
        for (let item of harmless) {
          this.results.push(item);
        }
  
        const others = resultList.filter(item => (item.category !== 'harmless' && item.category !== 'malicious'));
        for (let item of others) {
          this.results.push(item);
        }
  
        if (this.results.length % 2 !== 0) {
          let item = {};
          item['key'] = '';
          item['category'] = '';
          item['result'] = '';
          this.results.push(item);
        }
  
      }
      console.log(resultData);
    }

    changeKey(event) {
      this.selectedKey = event.target.value;
      this.selectedKey = this.selectedKey.replace(/(\r\n|\n|\r)/gm, "");
      this.processData();
    }

    downloadResult(history) {
      const scanResultId = history.scanResultIdentity.scanResultId;
      const userId = history.scanResultIdentity.userId;
      let url = environment.api_url + '/scanner/download-scan-result?sr-id=' + scanResultId + '&uid=' + userId
      window.open(url, "_blank");
    }

    downloadReport() {
      let url = environment.api_url + '/scanner/download-scan-result?sr-id=' + this.currentScanResultId + '&uid=' + this.currentScanResultUserId
      window.open(url, "_blank");
    }
  

}
