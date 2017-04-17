import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable()
export class FormService {

  constructor(private api: ApiService) { }

  public addFormTemplate(data: Object) {
    return this.api.postFile("tpl", data, true);
  }

  public addVolunteerForm(data: Object, tplId: number) {
    return this.api.postFile("form/" + tplId, data, true);
  }

  public getFormTemplateFile(path: Object) {
    return this.api.getFile("storage/internal/docs/tpl/" + path, true, null);
  }

  public queryUserFormTemplates(id: number) {
    return this.api.get("form/tpl/" + id, true, null);
  }

  public getTemplateToken() {
    return this.api.get("xaccel/generate/tpl", true, null);
  }
}
