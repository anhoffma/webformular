import {ICustomQuestionTypeConfiguration} from 'survey-core/typings/question_custom';
import {Question} from 'survey-core';
import {SurveyModel} from 'survey-core/typings/survey';
import {Handler} from './typings';
import {deepMerge, registerFunction, registerProperty, registerVariable} from './registrar';

/**
 * Base class for all MvQuestion types.
 */
export default abstract class MvBaseQuestionType implements ICustomQuestionTypeConfiguration {

  /**
   * The component instance.
   */
  static instance: MvBaseQuestionType;
  /**
   * The name of the question type.
   */
  abstract name: string;

  /**
   * The question instance.
   */
  protected question: Question | undefined;

  /**
   * Indicates whether to check pre-conditions when loading the question.
   */
  protected readonly checkPreConditions: boolean = true;

  /**
   * An array of function handlers to register with the FunctionFactory.
   */
  protected readonly functions?: Handler[];

  /**
   * An object containing variables to set on the survey.
   */
  variables?: Record<string, any>;

  /**
   * An array of default properties to add to the question's JSON schema.
   */
  private readonly defaultProperties: any[] = [{
    name: 'variables',
    type: 'object',
    default: false,
    category: 'general',
  }, {
    name: 'functions',
    type: 'array',
    default: false,
    category: 'general',
  }];

  /**
   * An array of additional properties to add to the question's JSON schema.
   */
  protected readonly additionalProperties?: any[];

  /**
   * Tests the pre-conditionals for the question.
   * @param question The question to test.
   * @param survey The survey model.
   */
  protected testPreConditions?(question: Question, survey: SurveyModel): void;

  /**
   * Adds general properties as well as additional properties to the question's JSON schema.
   * additionalProperties win over defaultProperties ones.
   */
  onInit(): void {
    [ ...this.defaultProperties ?? [], ...this.additionalProperties ?? [] ].forEach(property => registerProperty(this.name, property));
  }

  onLoaded(question: Question): void {

    const survey = <SurveyModel>question.getSurvey(true);

    this.initInstanceData(question);
    this.mergeData(question, survey);
    this.checkPreConditionsIfAny(question, survey);

  }

  /**
   * Merge question type data with question type instance one. The latter wins.
   *
   * @param question The current question.
   * @param survey The survey model.
   * @private
   */
  private mergeData = (question: Question, survey: SurveyModel) => {
    const {variables, functions} = question;
    Object.entries(deepMerge(this.variables, variables)).forEach(entry =>
      registerVariable(survey, entry[0], entry[1]));
    const mergedFunctions = functions ? [...this.functions ?? [], ...functions ?? []] : this.functions ?? [];
    mergedFunctions.forEach(mergedFunction => registerFunction(mergedFunction));
  }

  /**
   * Check pre-conditions if enabled (default)
   *
   * @param question The current question.
   * @param survey The survey model.
   * @private
   */
  private checkPreConditionsIfAny = (question: Question, survey: SurveyModel) => {
    if (this.checkPreConditions && this.testPreConditions) {
      this.testPreConditions(question, survey);
    }
  }

  /**
   * Save the current instance for the further usage within the custom functions, where 'this'
   * has a different context as the current instance and points to the caller of the corresponding function.
   * Furthermore, save the current question reference
   *
   * @param question The current question.
   * @private
   */
  private initInstanceData = (question: Question) => {
    this.question = question;
    MvBaseQuestionType.instance = this;
  }
}
