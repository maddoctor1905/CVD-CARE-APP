import {Component, OnInit} from '@angular/core';
import {MyOverlayRef} from '../../overlay/myoverlay-ref';
import {Symptom} from '../../../@Models/symptom.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-symptom-dialog',
  templateUrl: './symptom-dialog.component.html',
  styleUrls: ['./symptom-dialog.component.scss'],
})
export class SymptomDialogComponent implements OnInit {
  list: Array<Symptom & { selected?: boolean }> = [];
  mode: ('radio' | 'checkbox') = 'radio';
  currentItem;
  is = {
    firstStep: true,
    secondStep: false,
  };
  form: FormGroup = new FormGroup({
    description: new FormControl('', [Validators.required]),
  });

  constructor(private ref: MyOverlayRef) {
    this.list = ref.data.list || [];
    this.mode = ref.data.mode || 'radio';
  }

  ngOnInit(): void {
    this.list = this.list.map((item) => {
      return {...item, selected: false};
    });
    console.log(this.list);
  }

  close(value: string) {
    this.ref.close(value);
  }

  onRadioChange(item: { value: string; selected?: boolean }) {
    this.currentItem = item;
  }

  submit() {
    this.ref.close({symptom: this.currentItem, description: this.form.getRawValue().description});
  }

  nextStep() {
    this.is.firstStep = false;
    this.is.secondStep = true;
  }
}
