import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { FormService } from 'app/services/form.service';
import { AuthService } from 'app/services/auth.service';
import { Event } from 'app/models/event';
import { User } from 'app/models/user';
import { Tag } from 'app/models/tag'

@Component({
  selector: 'app-download-template',
  templateUrl: './download-template.component.html',
  styleUrls: ['./download-template.component.scss']
})
export class DownloadTemplateComponent implements OnInit {

  private template: string;
  private userId: number;
  private sub1: Subscription;
  private sub2: Subscription;
  private downloadLink: string;

  constructor(
    private formService: FormService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.sub1 = this.route.params.subscribe(params => {
      this.template = params['tpl'];
    });
    this.sub2 = this.route.params.subscribe(params => {
      this.userId = +params['id']; // (+) converts string 'id' to a number
    });
    if (isNaN(this.userId)) {
      this.router.navigate(['/404']);
      return;
    }

    this.formService.getTemplateToken()
      .subscribe(response => this.handleResponse(response),
      error => this.handleError(error));
    // Get a token
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }

  private handleResponse(response: any) {
    if (response.ok) {
      this.downloadLink = "/api/download/tpl/" + this.userId + "/" + this.template + "?token=" + response.token;
    }
  }

  private handleError(error: any) {
    alert(error);
  }

  private download() {
    window.location.href = this.downloadLink;
  }

}
