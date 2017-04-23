import { Component, OnInit } from '@angular/core';

import { FormService } from 'app/services/form.service';

@Component({
  selector: 'app-upload-template',
  templateUrl: './upload-template.component.html',
  styleUrls: ['./upload-template.component.scss']
})

export class UploadTemplateComponent implements OnInit {

  template: File = null;

  constructor(
    private formService: FormService
  ) { }

  ngOnInit() {
  }

  private fileChange(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.template = fileList[0];
    }
  }

  private onSubmit(event) {
    if (this.template != null) {
      let formData = new FormData();
      formData.append("file", this.template, this.template.name);
      this.formService.addFormTemplate(formData)
        .subscribe(
        response => { alert("1");/*this.router.navigate(['/events/' + this.event.id]);*/ },
        error => alert("Error: " + error));
    }
  }
}
