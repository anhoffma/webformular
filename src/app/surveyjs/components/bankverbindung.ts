import {Model, Question, QuestionCompositeModel, SurveyError} from 'survey-core';
import {SurveyModel} from 'survey-core/typings/survey';
import MvBaseQuestionType from '../registrar/mvBaseQuestionType';
import {Handler, SurveyInject, ValidationResult} from '../registrar/typings';
import toPairs from 'lodash.topairs';

class Bankverbindung extends MvBaseQuestionType {

  override name = 'mv.bankverbindung';

  override additionalProperties: any[] = [
    {
      name: 'test',
      type: 'object',
      default: false,
      category: 'general'
    }
  ];

  override variables: Record<string, any> = {
    stage: 'prod',
    mainTitle: '<h3>Bankverbindung</h3><p>Für eine künftige Bearbeitung von Leistungsanträgen und Auszahlung von Versicherungsleistungen benötigen wir Ihre Bankverbindung (IBAN).</p>',
    iban: {
      title: 'IBAN:',
      inputFormat: 'AA9999 9999 9999 9999 9999',
      requiredErrorText: 'Die IBAN darf nicht leer sein.',
      validationErrorText: 'Bitte geben Sie eine gültige IBAN ein.'
    },
    bic: {
      title: 'BIC:',
      requiredErrorText: 'Der BIC darf bei ausländischen Bankverbinungen nicht leer sein.',
      validationErrorText: 'Bitte geben Sie einen gültigen BIC ein.'
    },
    bankverbindungZugestimmt: {
      requiredErrorText: 'Bitte bestätigen Sie, dass Sie der Inhaber der eingegebenen Bankverbindung sind.',
      checkBoxText: 'Durch Klick auf den Button "Absenden" bestätige ich, dass ich Inhaber der eingetragenen Bankverbindung bin.'
    },
    hintTitle: 'Die angegebene Bankverbindung werden wir in unseren Systemen als Standardempfänger für alle künftigen Auszahlungen zu diesem Vertrag speichern.',
    kontaktText: 'Wenn Sie eine Bankverbindung hinterlegen möchten, bei der Sie nicht der Inhaber sind, <a target="_blank" href="https://{stage}.muenchener-verein.de/service-kontakt/online-services/kontakt-aufnehmen/">kontaktieren Sie uns</a> bitte.'
  };

  elementsJSON: object[] = [{
    type: 'html',
    html: '{mainTitle}'
  }, {

    name: 'iban',
    title: '{iban.title}',
    inputFormat: '{iban.inputFormat}',
    requiredErrorText: '{iban.requiredErrorText}',
    type: 'text',
    isRequired: true

  }, {

    name: 'bic',
    title: '{bic.title}',
    clearIncomplete: false,
    requiredErrorText: '{bic.requiredErrorText}',
    type: 'text',
    visible: false,
    isRequired: false
  },
    {
      type: 'html',
      html: '{hintTitle}'
    },
    {
      type: 'checkbox',
      name: 'bankverbindungZugestimmt',
      titleLocation: 'hidden',
      isRequired: true,
      requiredErrorText: '{bankverbindungZugestimmt.requiredErrorText}',
      choices: [
        {
          value: 'ja',
          text: '{bankverbindungZugestimmt.checkBoxText}'
        }
      ]
    },
    {
      type: 'html',
      html: '{kontaktText}'
    }];

  override onLoaded(question: Question): void {
    super.onLoaded(question);
    // @ts-ignore
    const ibanQuestion = question.contentPanel.getQuestionByName('iban');
    ibanQuestion.surveyValue.onServerValidateQuestions.add(this.validateSurvey);
  }

  validateSurvey(survey: Model, x: { data: Record<string, any>; errors: any; }): void {
    const currentInstance = <Bankverbindung>Bankverbindung.instance;
    //complete();

    const compositeModel = <QuestionCompositeModel>survey.findQuestionByName(<string>currentInstance.question?.name);
    const ibanQuestion = <Question>compositeModel.findQuestionByName('iban');

    // @ts-ignore
    const error = new SurveyError(Bankverbindung.instance.variables?.iban.validationErrorText);

    ibanQuestion.errors.push(error);
  }
  onValueChanged(question: Question, name: string, newValue: any): void {
    if (name === 'iban') {
      // Get the questions with the names 'iban' and 'bic'
      // @ts-ignore
      const ibanQuestion = question.getQuestionByName('iban');
      // @ts-ignore
      const bicQuestion = question.getQuestionByName('bic');
      // Set the visibility and required properties of the 'bic' question based on the value of the 'iban' question
      bicQuestion.visible = bicQuestion.isRequired = ibanQuestion.value.length > 1 && !/^de/i.test(ibanQuestion.value);
    }
  }
  override testPreConditions(question: Question, survey: SurveyModel): void {
    const {checkErrorsMode, textUpdateMode, isUpdateValueTextOnTyping} = survey;

    if (!isUpdateValueTextOnTyping) {
      console.error(`textUpdateMode: '${textUpdateMode}'`);
      throw new Error(`textUpdateMode must be set to 'onTyping' in order to use the onValueChanged method of '${this.name}' component.
       See https://surveyjs.io/form-library/documentation/api-reference/questiontextbase#textUpdateMode`);
    }

    if (checkErrorsMode !== 'onComplete') {
      console.error(`checkErrorsMode: '${checkErrorsMode}'`);
      throw new Error(`checkErrorsMode must be set to 'onComplete' in order to use the onValueChanged method of '${this.name}' component.
       See https://surveyjs.io/form-library/documentation/api-reference/survey-data-model#checkErrorsMode`);
    }
  }
}

export function useBankverbindung(): MvBaseQuestionType {
  return new Bankverbindung();
}
