import { Injectable } from '@angular/core';
// import { STATUS_CODE } from '../Constants/statuscode.constant';
// import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicateService {
  isLoaderLoad: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private toastr: ToastrService) { }

  questionGroupBy(questions: any) {
    return questions.reduce((acc: any, question: any) => {
      if (!question?.isDraft) {
        const category = question.categoryName;
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(question);
      }
      return acc;
    }, {});
  }

}
