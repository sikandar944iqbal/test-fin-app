import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SecurityScannerService } from '../services/security-scanner.service';

declare var $:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isInProgress: boolean = false;
  token = localStorage.getItem('token');
  fileToUpload: File = null;
  isFileScanFailed: boolean = false;

  afuConfig = {
        multiple: true,
    formatsAllowed: ".txt",
    fileNameIndex: true,
    uploadAPI:  {
      url:"https://example-file-upload-api",
      method:"POST",
      headers: {
     "Content-Type" : "text/plain;charset=UTF-8",
     "Authorization" : `Bearer ${this.token}`
      },
      params: {
        'page': '1'
      },
      responseType: 'blob',
    },
    maxSize: "1",
      replaceTexts: {
      selectFileBtn: 'Select Files',
      resetBtn: 'Reset',
      uploadBtn: 'Submit',
      attachPinBtn: 'Attach Files...',
      afterUploadMsg_error: 'Upload Failed !',
      sizeLimit: 'Size Limit',
    }
  };

  dataForm: FormGroup;

//   afuConfig = {
//     multiple: false,
//     formatsAllowed: ".txt",
//     maxSize: "1",
//     uploadAPI:  {
//       url:"https://example-file-upload-api",
//       method:"POST",
//     //   headers: {
//     //  "Content-Type" : "text/plain;charset=UTF-8",
//     //  "Authorization" : `Bearer ${token}`
//     //   },
//       params: {
//         'page': '1'
//       },
//       responseType: 'blob',
//     },
//     theme: "dragNDrop",
//     hideProgressBar: true,
//     hideResetBtn: true,
//     hideSelectBtn: true,
//     fileNameIndex: true,
//     replaceTexts: {
//       selectFileBtn: 'Select Files',
//       resetBtn: 'Reset',
//       uploadBtn: 'Submit',
//       dragNDropBox: 'Drag N Drop',
//       attachPinBtn: 'Attach Files...',
//       afterUploadMsg_success: 'Successfully Uploaded !',
//       afterUploadMsg_error: 'Upload Failed !',
//       sizeLimit: 'Size Limit'
//     }
// };

  constructor(
    private _service: SecurityScannerService,
    private _route: Router
  ) { }

  ngOnInit(): void {
    localStorage.removeItem('result');
    this.isInProgress = false;
    this.addFormControl();
  }

  addFormControl() {
    this.dataForm = new FormGroup({
      content: new FormControl('', Validators.compose([Validators.required]))
    });
  }

  processData() {
    this.isInProgress = true;
    let data = this.dataForm.get('content').value;
    if (!!data) {
      let datas = data.split(',');
      let content = {};
      content['data'] = datas;
      
      this._service.processData(content).subscribe(
        response => {
          let content = JSON.stringify(response);
          localStorage.setItem('result', content);
          this.isInProgress = false;
          this._route.navigateByUrl('/home/result');
        }, error => {
          this.isInProgress = false;
          console.log(error);
        }
      );
    }
 
  }

  handleFileInput(files: FileList) {
    debugger
    console.log(files);
    this.fileToUpload = files[0]
  }

  scanFile() {
    this.isInProgress = true;
    this.isFileScanFailed = false;
    this._service
            .scanFile(this.fileToUpload)
            .subscribe(event => {
                if (event.type === HttpEventType.UploadProgress) {
                    // this.progress.percentage = Math.round(
                    //     (100 * event.loaded) / event.total
                    // );
                } else if (event instanceof HttpResponse) {
                  if (event.status === 200) {
                    let content = JSON.stringify(event.body);
                    localStorage.setItem('result', content);
                    // this.isInProgress = false;
                    this._route.navigateByUrl('/home/result');
                  } else {
                    this.isFileScanFailed = true;
                  }
                  this.isInProgress = false;
                  this.fileToUpload = undefined;
                    // this.currentFileUpload = undefined;
                    // this.uploadCompleted = true;
                    // this.myInputVariable.nativeElement.value = '';
                    // this.attachmentList = [];
                    // let attachment = event['body'];
                    // attachment = JSON.parse(String(attachment));
                    // // this.attachmentList.push(attachment);
                    // attachment['image'] =
                    //     'data:' +
                    //     attachment['contentType'] +
                    //     ';base64,' +
                    //     attachment['document']['data'];
                    // this.attachmentList1.push(attachment);
                    // Notification.showNotification('Attachment Added Successfully...', 'success');
                    // this.attachmentsLength.emit(this.attachmentList1.length)

                }
            }, error => {
              this.isInProgress = false;
              this.isFileScanFailed = true;
            });

        this.fileToUpload = undefined;
  }

}
