import { Component, OnDestroy, OnInit } from '@angular/core';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { TrainingService } from '../training.service';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { UIService } from '../../shared/ui.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises: Exercise[];
  exerciseSubscription: Subscription;
  private loadingSubs: Subscription;
  isloading = true;

  constructor(
    private trainingService: TrainingService,
    private uiService: UIService,
  ) {}

  ngOnInit() {
    this.loadingSubs = this.uiService.loadingStateChanged.subscribe(isloading => {
      this.isloading = isloading;
    });

    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(exercises => {
      this.exercises = exercises;
    });

    this.fetchExercises();
  }

  public onStartTrainig(form: NgForm): void {
    this.trainingService.startExercise(form.value.exercise);
  }

  public fetchExercises(): void {
    this.trainingService.fetchAvailableExercises();
  }

  ngOnDestroy() {
    if (this.loadingSubs) {
      this.loadingSubs.unsubscribe();
    }

    if (this.exerciseSubscription) {
      this.exerciseSubscription.unsubscribe();
    }
  }
}
