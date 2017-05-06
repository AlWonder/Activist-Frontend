import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { EventService } from 'app/services/event.service'
import { NotifyService } from 'app/services/notify.service'

@Component({
  selector: 'app-edit-cover',
  templateUrl: './edit-cover.component.html',
  styleUrls: ['./edit-cover.component.scss']
})
export class EditCoverComponent implements OnInit {

  private cover: File = null;
  private eventId: number;
  private sub: Subscription;

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router,
    private notifyService: NotifyService
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.eventId = +params['id']; // (+) converts string 'id' to a number
    });
  }

  private fileChange(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.cover = fileList[0];
    }
  }

  private onSubmit(event) {
    if (this.cover != null) {
      let formData = new FormData();
      formData.append("file", this.cover, this.cover.name);
      this.eventService.editCover(formData, this.eventId)
        .subscribe(
        response => { this.handleResponse(response); },
        error => alert("Error: " + error));
    } else {
      this.notifyService.throwError("Сначала загрузите обложку");
    }
  }

  private handleResponse(response: any) {
    if (response.ok) {
      this.router.navigate(['/events/' + this.eventId]);
    } else {
      this.notifyService.throwError(response.error.message);
    }
  }

  @Output() onError = new EventEmitter<string>();
    throwError(error) {
        this.onError.emit(error);
    }

}
