import {Component, OnInit} from '@angular/core';
import {PatientRecruitmentService} from '../../@Services/patient-recruitment.service';
import {filter} from 'rxjs/operators';
import {Doctor} from '../../@Models/recruitment.model';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-doctor-page',
  templateUrl: './doctor-page.component.html',
  styleUrls: ['./doctor-page.component.scss'],
})
export class DoctorPageComponent implements OnInit {
  doctors: Doctor[] = [];

  constructor(private readonly patientRecruitment: PatientRecruitmentService,
              private readonly domSanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.patientRecruitment.ready$.pipe(filter(s => !!s)).subscribe(() => {
      for (const item of this.patientRecruitment.recruitments) {
        const doctor = this.doctors.find((doctorItem) => {
          return item.Doctor.id === doctorItem.id;
        });
        if (!doctor) {
          this.doctors.push(item.Doctor);
        }
      }
    });
  }

  safeURL(s: string) {
    return (this.domSanitizer.bypassSecurityTrustUrl(s));
  }
}
