import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { FormService } from 'app/services/form.service';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.scss']
})
export class UploadFormComponent implements OnInit {

  form: File = null;
  private tplId: number;
  private sub: Subscription;


  constructor(
    private formService: FormService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.tplId = +params['tplid']; // (+) converts string 'id' to a number
    });
  }

  fileChange(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.form = fileList[0];
    }
  }

  onSubmit(event) {
    if (this.form != null) {
      let formData = new FormData();
      formData.append("file", this.form, this.form.name);
      this.formService.addVolunteerForm(formData, this.tplId)
        .subscribe(
        response => { alert("1");/*this.router.navigate(['/events/' + this.event.id]);*/ },
        error => alert("Error: " + error));
    }
  }

}
