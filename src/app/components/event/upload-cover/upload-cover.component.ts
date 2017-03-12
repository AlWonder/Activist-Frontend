import { Component, OnInit } from '@angular/core';

import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-upload-cover',
  templateUrl: './upload-cover.component.html',
  styleUrls: ['./upload-cover.component.scss']
})
export class UploadCoverComponent implements OnInit {

  public uploader: FileUploader = new FileUploader({url: "http://localhost:8070/upload", authToken: 'Bearer ' + localStorage.getItem("id_token")});

  constructor() { }

  ngOnInit() {

  }

}
