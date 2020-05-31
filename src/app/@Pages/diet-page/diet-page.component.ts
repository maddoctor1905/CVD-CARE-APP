import {Component, OnInit} from '@angular/core';
import {PatientRecruitmentService} from '../../@Services/patient-recruitment.service';
import {filter, take} from 'rxjs/operators';
import {Diet, PatientRecruitment} from '../../@Models/recruitment.model';

@Component({
  selector: 'app-diet-page',
  templateUrl: './diet-page.component.html',
  styleUrls: ['./diet-page.component.scss'],
})
export class DietPageComponent implements OnInit {
  diets: Diet[] = [];

  constructor(private readonly patientRecruitmentService: PatientRecruitmentService) {
  }

  ngOnInit() {
    this.patientRecruitmentService.ready$.pipe(filter(s => !!s), take(1)).subscribe(() => {
      this.diets = this.patientRecruitmentService.recruitments.map((item) => {
        return item.Diet;
      });
    });
  }

}
