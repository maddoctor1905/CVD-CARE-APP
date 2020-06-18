import {Injectable} from '@angular/core';
import {RequestService} from './request.service';
import {OverlayService} from './overlay.service';
import {SymptomDialogComponent} from '../@Components/dialogs/symptom-dialog/symptom-dialog.component';
import {PatientService} from './patient.service';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {CalendarEvent} from '../@Models/calendar.model';
import {filter, mergeMap, tap} from 'rxjs/operators';
import {PatientSymptom} from '../@Models/symptom.model';
import {TranslateService} from '@ngx-translate/core';
import {AlertDialogComponent} from '../@Components/dialogs/alert-dialog/alert-dialog.component';

@Injectable()
export class PatientSymptomService {
  public ready$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private symptoms: PatientSymptom[] = [];
  public symptomChange$: Subject<PatientSymptom> = new Subject<PatientSymptom>();

  constructor(private readonly requestService: RequestService, private overlayService: OverlayService,
              private patientService: PatientService, private translateService: TranslateService) {
  }

  getSymptoms() {
    return this.requestService.getSymptoms();
  }

  init(): Observable<PatientSymptom[]> {
    return this.requestService.getPatientSymptoms(this.patientService.patient.id).pipe(tap((symp) => {
      this.symptoms = symp;
      this.ready$.next(true);
    }));
  }


  findSymptomsForDate(date: Date): Observable<CalendarEvent> {
    const result: PatientSymptom[] = [];
    date.setHours(8, 0, 0, 0);
    for (const item of this.symptoms) {
      const check = new Date(item.STDate);
      check.setHours(8, 0, 0, 0);
      if (date.getDate() === check.getDate() && date.getMonth() === check.getMonth() && date.getFullYear() === check.getFullYear()) {
        result.push(item);
      }
    }
    if (result.length === 0) {
      return of(null);
    }
    return this.translateService.get('event.symptom.title').pipe(mergeMap((key) => {
      return of({
        emoji: '🚨',
        from: new Date(Date.now()),
        to: new Date(Date.now()),
        text: result.map((item) => {
          return item.MedicationCondition.CondName + ': ' + item.STDescription;
        }),
        title: `${this.patientService.patient.PatName} - ${key}`,
        typeName: 'type',
        urgent: false,
      });
    }));
  }


  async declareSymptom(day: Date) {
    const today = new Date(Date.now());
    if (day <= today) {
      this.getSymptoms().subscribe((symptoms) => {
        this.overlayService.open(SymptomDialogComponent, {
          list: symptoms,
          mode: 'checkbox',
        }).afterClosed$.subscribe((res) => {
          if (res && res.data && res.data.symptom) {
            this.requestService.createSymptom(this.patientService.patient.id, res.data.symptom.id,
              day.toISOString().slice(0, 19).replace('T', ' '), res.data.description)
              .subscribe((data: PatientSymptom) => {
                this.symptoms.push(data);
                this.symptomChange$.next(data);
              });
          }
          console.log(res);
        });
      });
    } else {
      this.overlayService.open(AlertDialogComponent, {
        emoji: '🚨',
        title: await this.translateService.get('symptom.alert.error.title').toPromise(),
        message: await this.translateService.get('symptom.alert.error.message').toPromise(),
        status: 'error',
      });
    }
  }
}
