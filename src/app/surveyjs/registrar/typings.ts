import MvBaseQuestionType from './mvBaseQuestionType';
import {Question} from 'survey-core';
import {SurveyModel} from 'survey-core/typings/survey';

export declare type Registrar = {
  readonly components?: MvBaseQuestionType[];
  readonly handlers?: Handler[];
};

export declare type Handler = {
  readonly name: string;
  readonly func: (params: any[]) => void | boolean;
  readonly isAsync?: boolean;
};

export declare type SurveyInject = {
  readonly question: Question,
  readonly survey: SurveyModel,
  readonly returnResult: (result: boolean) => void
};


export declare type ValidationResult = {
  iban: boolean;
  bic: boolean;
};
