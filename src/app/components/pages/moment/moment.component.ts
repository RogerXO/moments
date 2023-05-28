import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Moment } from 'src/app/Moment';

import { MomentService } from 'src/app/services/moment/moment.service';

import { environment } from 'src/environments/environment.development';

import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';
import { MessagesService } from 'src/app/services/messages/messages.service';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css'],
})
export class MomentComponent {
  allMoments?: Moment[];
  moment?: Moment;
  baseApiUrl = environment.baseApiUrl;

  faTimes = faTimes;
  faEdit = faEdit;

  constructor(
    private momentService: MomentService,
    private messagesService: MessagesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.momentService.getMoment(id).subscribe((item) => {
      this.moment = item.data;
    });

    this.momentService
      .getMoments()
      .subscribe((item) => (this.allMoments = item.data));
  }

  async removeHandler(id: number) {
    await this.momentService.removeMoment(id).subscribe({
      next: () => {
        this.messagesService.add('Moment successfully removed');
        this.router.navigate(['/']);
      },
    });
  }
}
