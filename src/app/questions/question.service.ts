import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { questionRepository } from './question-repository';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private jsonUrl = './../../assets/questions.json';

  constructor() { console.log(questionRepository); }

  public getNewQuestion(question: any): Observable<string> {
    let currentQuestion = question;

    while (currentQuestion === question) {
      const count = questionRepository.length;
      const randomIndex = Math.floor(Math.random() * count);
      currentQuestion = questionRepository[randomIndex];
    }

    return of(currentQuestion);
  }

  public submitQuestion(question: any): Observable<any> {
    questionRepository.push(question.question);

    return of(question.question);
  }
}
