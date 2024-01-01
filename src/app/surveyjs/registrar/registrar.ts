import {ComponentCollection, FunctionFactory, Serializer} from 'survey-core';
import {Handler, Registrar} from './typings';
import MvBaseQuestionType from './mvBaseQuestionType';
import {SurveyModel} from 'survey-core/typings/survey';
import {JsonObjectProperty} from 'survey-core/typings/jsonobject';
import merge from 'lodash.merge';

/**
 * Decorator registering custom question types and functions (beyond the function registration in custom components) with SurveyJS.
 * @param registrar - The registrar object containing the components and handlers to register.
 * @returns A function that can be called to register the components and handlers.
 */
// tslint:disable-next-line:ban-types
export function SurveyJsRegistrar(registrar: Registrar): Function {
  return () => {
    registrar.handlers?.forEach(handler => registerFunction(handler));
    // @ts-ignore
    registrar.components?.forEach(component => registerComponent(component));
  };
}

export const registerFunction = (handler: Handler): void => {
  const {name, func, isAsync} = handler;
  FunctionFactory.Instance.register(name, func, isAsync ?? false);
};

export const registerComponent = (component: MvBaseQuestionType): void => ComponentCollection.Instance.add(component);

export const registerVariable = (survey: SurveyModel, variableName: string, variableValue: any): void =>
    survey.setVariable(variableName, variableValue);

export const registerProperty = (componentName: string, propertyInfo: {}): JsonObjectProperty =>
  Serializer.addProperty(componentName, propertyInfo);


export const deepMerge = (source: Record<string, any> | undefined, overrides?: any): {}  => {
  return typeof overrides === 'object' ? merge(source, overrides) : source;
};
