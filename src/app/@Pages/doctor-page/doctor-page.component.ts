import {Component, OnInit} from '@angular/core';
import {PatientRecruitmentService} from '../../@Services/patient-recruitment.service';
import {filter} from 'rxjs/operators';
import {Doctor} from '../../@Models/recruitment.model';
import {DomSanitizer} from '@angular/platform-browser';
import {PatientService} from '../../@Services/patient.service';
import {Caregiver} from '../../@Models/caregiver';

@Component({
  selector: 'app-doctor-page',
  templateUrl: './doctor-page.component.html',
  styleUrls: ['./doctor-page.component.scss'],
})
export class DoctorPageComponent implements OnInit {
  doctors: Doctor[] = [];
  careGiver: Caregiver;

  constructor(private readonly patientRecruitment: PatientRecruitmentService,
              private readonly domSanitizer: DomSanitizer, private patientService: PatientService) {
  }

  ngOnInit() {
    this.patientRecruitment.ready$.pipe(filter(s => !!s)).subscribe(() => {
      for (const item of this.patientRecruitment.recruitments) {
        const doctor = this.doctors.find((doctorItem) => {
          return item.Doctor.id === doctorItem.id;
        });
        if (!doctor && item.Doctor) {
          this.doctors.push(item.Doctor);
        }
      }
      this.careGiver = this.patientService.patient.Caregiver;
    });
  }

  safeURL(s: string) {
    return (this.domSanitizer.bypassSecurityTrustUrl(s));
  }
}
