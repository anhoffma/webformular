import {Component, OnInit} from '@angular/core';
import {useBankverbindung} from './surveyjs/components/bankverbindung';
import {jsonWithVariables} from './surveyjs/examples/bankverbindung';
import {SurveyJsRegistrar} from './surveyjs/registrar/registrar';
import {SurveyInject} from './surveyjs/registrar/typings';
import { Model } from 'survey-core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
@SurveyJsRegistrar({
  components: [useBankverbindung()]
})
export class AppComponent implements OnInit {
  title = 'My First Survey';
  surveyModel: Model = new Model();
  ngOnInit(): void {
    this.surveyModel = new Model(jsonWithVariables);
  }
}
