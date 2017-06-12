import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { FormService } from 'app/services/form.service';
import { AuthService } from 'app/services/auth.service';
import { Event } from 'app/models/event';
import { User } from 'app/models/user';
import { Tag } from 'app/models/tag'

@Component({
  selector: 'app-download-form',
  templateUrl: './download-form.component.html',
  styleUrls: ['./download-form.component.scss']
})
export class DownloadFormComponent implements OnInit {

  private form: any;
  private id: number;
  private sub: Subscription;
  private downloadLink: string;

  constructor(
    private formService: FormService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
    });
    if (isNaN(this.id)) {
      this.router.navigate(['/404']);
      return;
    }

    this.formService.getFormToken(this.id)
      .subscribe(response => this.handleResponse(response),
      error => this.handleError(error));
    // Get a token
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private handleResponse(response: any) {
    if (response.ok) {
      this.form = response.form;
      this.downloadLink = "/api/download/form/" + response.form.participantId
        + "/" + response.form.path + "?token=" + response.token;
    }
  }

  private handleError(error: any) {
    alert(error);
  }

  private download() {
    window.location.href = this.downloadLink;
  }

}
