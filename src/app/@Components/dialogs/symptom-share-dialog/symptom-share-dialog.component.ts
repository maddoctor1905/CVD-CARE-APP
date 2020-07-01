import {Component, OnInit} from '@angular/core';
import {MyOverlayRef} from '../../overlay/myoverlay-ref';
import {PatientService} from '../../../@Services/patient.service';
import {PatientRecruitmentService} from '../../../@Services/patient-recruitment.service';
import {Caregiver} from '../../../@Models/caregiver';
import {Doctor} from '../../../@Models/recruitment.model';

@Component({
  selector: 'app-symptom-share-dialog',
  templateUrl: './symptom-share-dialog.component.html',
  styleUrls: ['./symptom-share-dialog.component.scss'],
})
export class SymptomShareDialogComponent implements OnInit {
  caregiver: Caregiver;
  doctors: Doctor[] = [];
  currentItem: string;

  constructor(private ref: MyOverlayRef, private patientService: PatientService,
              private patientRecruitment: PatientRecruitmentService) {
  }

  ngOnInit(): void {
    console.log(this.patientRecruitment.recruitments)
    for (const item of this.patientRecruitment.recruitments) {
      const doctor = this.doctors.find((doctorItem) => {
        return item.Doctor.id === doctorItem.id;
      });
      if (!doctor && item.Doctor) {
        this.doctors.push(item.Doctor);
      }
    }
    this.caregiver = this.patientService.patient.Caregiver;
  }

  onRadioChange(item: number) {
    this.currentItem = item.toString();
  }

  close(value: string) {
    this.ref.close(value);
  }

  submit() {
    this.ref.close(this.currentItem);
  }
}
