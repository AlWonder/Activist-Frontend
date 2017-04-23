import { Component, OnInit } from '@angular/core';

import { FormService } from 'app/services/form.service';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-my-forms',
  templateUrl: './my-forms.component.html',
  styleUrls: ['./my-forms.component.scss']
})
export class MyFormsComponent implements OnInit {

  constructor(
    private formService: FormService,
    private authService: AuthService
  ) { }

  private forms: Object;

  ngOnInit() {
    this.formService.queryUserForms()
    .subscribe(data => this.forms = data);
  }

}
