import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { FormService } from 'app/services/form.service';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-my-form-templates',
  templateUrl: './my-form-templates.component.html',
  styleUrls: ['./my-form-templates.component.scss']
})
export class MyFormTemplatesComponent implements OnInit {

  constructor(
    private formService: FormService,
    private authService: AuthService
  ) { }

  private templates: Object;

  ngOnInit() {
    this.formService.queryUserFormTemplates(this.authService.userProfile.id)
    .subscribe(data => this.templates = data);
  }

  private getLinkToTemplate(template: any) {
    return "/download/tpl/" + template.organizerId + "/" + template.templatePath;
  }

}
