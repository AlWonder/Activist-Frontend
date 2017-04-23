import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { FormService } from 'app/services/form.service';
import { EventService } from 'app/services/event.service';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.scss']
})
export class UploadFormComponent implements OnInit {

  form: File = null;
  private tplId: number;
  private sub1: Subscription;
  private sub2: Subscription;
  private eventId: number;
  private downloadLink: string;

  constructor(
    private eventService: EventService,
    private formService: FormService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.sub1 = this.route.params.subscribe(params => {
      this.tplId = +params['tplid']; // (+) converts string 'id' to a number
    });
    this.sub2 = this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.eventId = +params['event'] || 0;
      });
    this.formService.getTemplateToken(this.tplId)
      .subscribe(response => this.handleTplResponse(response),
      error => this.handleError(error));
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }

  private fileChange(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.form = fileList[0];
    }
  }

  private onSubmit(event) {
    if (this.form != null) {
      let formData = new FormData();
      formData.append("file", this.form, this.form.name);
      this.formService.addVolunteerForm(formData, this.tplId)
        .subscribe(
        response => { this.handleUploadResponse(response) },
        error => alert("Error: " + error));
    }
  }

  private handleTplResponse(response: any) {
    if (response.ok) {
      this.downloadLink = "/api/download/tpl/" + response.template.organizerId
        + "/" + response.template.templatePath + "?token=" + response.token;
    }
  }

  private handleUploadResponse(response: any) {
    if (response.ok) {
      if (this.eventId > 0) {
        this.eventService.joinEvent(this.eventId, { asvolunteer: true })
          .subscribe(response => this.handleVolunteerResponse(response));
      }
    }
  }

  private handleVolunteerResponse(response: any) {
    if (response.ok) {
      this.router.navigate(['/events', this.eventId]);
    }
  }

  private handleError(error: any) {
    alert(error);
  }

  private download() {
    window.location.href = this.downloadLink;
  }

}
