import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Moment } from 'src/app/Moment';
import { MessagesService } from 'src/app/services/messages/messages.service';

import { MomentService } from 'src/app/services/moment/moment.service';

@Component({
  selector: 'app-edit-moment',
  templateUrl: './edit-moment.component.html',
  styleUrls: ['./edit-moment.component.css'],
})
export class EditMomentComponent {
  moment?: Moment;
  btnText: string = 'Edit';

  constructor(
    private momentService: MomentService,
    private messagesService: MessagesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.momentService
      .getMoment(id)
      .subscribe((item) => (this.moment = item.data));
  }

  async editHandler(momentData: Moment) {
    const id = this.moment!.id;

    const formData = new FormData();

    formData.append('title', momentData.title);
    formData.append('description', momentData.description);
    formData.append('image', momentData.image);

    await this.momentService.updateMoment(id!, formData).subscribe({
      next: () => {
        this.messagesService.add(`Moment ${id} successfully edited`);
        this.router.navigate(['/']);
      },
    });
  }
}
