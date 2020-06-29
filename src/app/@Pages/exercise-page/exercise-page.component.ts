import {Component, OnInit} from '@angular/core';
import {PatientRecruitmentService} from '../../@Services/patient-recruitment.service';
import {filter, take} from 'rxjs/operators';
import {Exercise} from '../../@Models/recruitment.model';

@Component({
  selector: 'app-exercise-page',
  templateUrl: './exercise-page.component.html',
  styleUrls: ['./exercise-page.component.scss'],
})
export class ExercisePageComponent implements OnInit {
  exercise: Exercise[] = [];

  constructor(private readonly patientRecruitmentService: PatientRecruitmentService) {
  }

  ngOnInit() {
    this.patientRecruitmentService.ready$.pipe(filter(s => !!s), take(1)).subscribe(() => {
      for (const item of this.patientRecruitmentService.recruitments) {
        if (item.Exercise) {
          this.exercise.push(item.Exercise);
        }
      }
    });
  }

}
