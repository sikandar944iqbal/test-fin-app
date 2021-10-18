import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-scan-result',
  templateUrl: './scan-result.component.html',
  styleUrls: ['./scan-result.component.scss']
})
export class ScanResultComponent implements OnInit {

  scanResult: any = {};
  searchKeys: string[] = [];
  categories: any[] = [];
  results: any[] = [];
  selectedKey: string;
  currentScanResultId: number;
  currentScanResultUserId: string;

  constructor() { }

  ngOnInit(): void {
    this.currentScanResultId = null;
    this.currentScanResultUserId = '';
    debugger
    // const keys = localStorage.getItem('searchKeys');
    // this.searchKeys = keys.split(',');
    
    const content = localStorage.getItem('result');
    this.scanResult = JSON.parse(content);
    for (let key in this.scanResult) {
      this.searchKeys.push(key);
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

  }

  processData() {
    debugger
    this.categories = [];
    let resultList = [];
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

  downloadReport() {
    let url = environment.api_url + '/scanner/download-scan-result?sr-id=' + this.currentScanResultId + '&uid=' + this.currentScanResultUserId
    window.open(url, "_blank");
  }

}
