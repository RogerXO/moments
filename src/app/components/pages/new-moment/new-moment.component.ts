import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Moment } from 'src/app/Moment';
import { MessagesService } from 'src/app/services/messages/messages.service';
import { MomentService } from 'src/app/services/moment/moment.service';

@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrls: ['./new-moment.component.css'],
})
export class NewMomentComponent {
  constructor(
    private momentService: MomentService,
    private messagesService: MessagesService,
    private router: Router
  ) {}
  btnText: string = 'Share!';

  async createHandler(moment: Moment) {
    const formData = new FormData();

    formData.append('title', moment.title);
    formData.append('description', moment.description);
    formData.append('image', moment.image);

    await this.momentService.createMoment(formData).subscribe();

    this.messagesService.add('Moment successfully added');

    this.router.navigate(['/']);
  }
}
