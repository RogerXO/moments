import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  FormGroupDirective,
} from '@angular/forms';

import { Moment } from 'src/app/Moment';

import { MomentService } from 'src/app/services/moment/moment.service';

import { environment } from 'src/environments/environment.development';

import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';
import { MessagesService } from 'src/app/services/messages/messages.service';
import { CommentService } from 'src/app/services/comment/comment.service';

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

  commentForm!: FormGroup;

  constructor(
    private momentService: MomentService,
    private messagesService: MessagesService,
    private commentService: CommentService,
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

    this.commentForm = new FormGroup({
      text: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
    });
  }

  get text() {
    return this.commentForm.get('text')!;
  }

  get username() {
    return this.commentForm.get('username')!;
  }

  async removeHandler(id: number) {
    await this.momentService.removeMoment(id).subscribe({
      next: () => {
        this.messagesService.add('Moment successfully removed');
        this.router.navigate(['/']);
      },
    });
  }

  async onSubmit(formDirective: FormGroupDirective) {
    if (this.commentForm.invalid) return;

    const data = this.commentForm.value;

    data.momentId = this.moment!.id;

    await this.commentService
      .createComment(data)
      .subscribe((comment) => this.moment!.comments!.push(comment.data));

    this.messagesService.add('Comment added');

    this.commentForm.reset();

    formDirective.resetForm();
  }
}
