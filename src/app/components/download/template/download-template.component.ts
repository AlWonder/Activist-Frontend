import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Title } from '@angular/platform-browser';

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

  private template: any;
  private id: number;
  private sub: Subscription;
  private downloadLink: string;

  constructor(
    private formService: FormService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.title.setTitle("Загрузка шаблона анкеты – Активист");
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
    });
    if (isNaN(this.id)) {
      this.router.navigate(['/404']);
      return;
    }

    this.formService.getTemplateToken(this.id)
      .subscribe(response => this.handleResponse(response),
      error => this.handleError(error));
    // Get a token
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private handleResponse(response: any) {
    if (response.ok) {
      this.template = response.template;
      this.downloadLink = "/api/download/tpl/" + response.template.organizerId
        + "/" + response.template.templatePath + "?token=" + response.token;
    }
  }

  private handleError(error: any) {
    alert(error);
  }

  private download() {
    window.location.href = this.downloadLink;
  }

}
