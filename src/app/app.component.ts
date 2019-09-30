import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { QuestionService } from './questions/question.service';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  public title = "Agile Question of the Day (QOTD)";
  public currentQuestion = 'Click to get a new question!';
  public showAddQuestion = false;
  public questionForm: FormGroup;

  constructor(private questionService: QuestionService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.questionForm = new FormGroup({ question: new FormControl('') });
  }

  public getQuestion() {
    this.questionService.getNewQuestion(this.currentQuestion).subscribe(resp => {
      this.currentQuestion = resp;
    });
  }

  public toggleQuestionForm() {
    this.showAddQuestion = true;
  }

  public addNewQuestion(question: any) {
    console.log(question);
    this.questionService.submitQuestion(question).subscribe(() => {
      this.showAddQuestion = false;
      this.snackBar.open(`Thanks for submitting a question! You asked: ${question.question}`, 'Done', { duration: 3000 });
    });
  }
}
