import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment.development';
import { Comment } from 'src/app/Comment';
import { Response } from 'src/app/Response';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private baseApiUrl = environment.baseApiUrl;

  constructor(private http: HttpClient) {}

  createComment(data: Comment): Observable<Response<Comment>> {
    const url = `${this.baseApiUrl}api/moments/${data.momentId}/comments`;
    return this.http.post<Response<Comment>>(url, data);
  }
}
