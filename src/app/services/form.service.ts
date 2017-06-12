import { Injectable } from '@angular/core';
import { ApiService } from './';

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

  public queryUserForms() {
    return this.api.get("form", true, null);
  }

  public queryUserFormTemplates(id: number) {
    return this.api.get("tpl/" + id, true, null);
  }

  public getTemplateToken(id: number) {
    return this.api.get("xaccel/generate/tpl/" + id, true, null);
  }

  public getFormToken(id: number) {
    return this.api.get("xaccel/generate/form/" + id, true, null);
  }
}
