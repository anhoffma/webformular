export const json = {
  elements: [
    {
      type: 'panel',
      name: 'panel1',
      elements: [
        {
          type: 'mv.bankverbindung',
          name: 'bankverbindung',
          titleLocation: 'hidden'
        },
        {
          type: 'text',
          name: 'Built-in text SurveyJS component',
          titleLocation: 'hidden'
        }
      ],
      visible: true
    }
  ],
  showQuestionNumbers: false,
  textUpdateMode: 'onTyping',
  checkErrorsMode: 'onComplete'
};

export const jsonWithVariables = {
  elements: [
    {
      type: 'panel',
      name: 'panel1',
      elements: [
        {
          type: 'mv.bankverbindung',
          name: 'bankverbindungsdfsdf',
          variables: {
            stage: 'aen',
            mainTitle: '<h7 style="font-weight: bold">Custom composite mv.bankverbindung SurveyJS component</h7>',
            iban: {
              title: 'Hallo IBAN'
            }
          },
          titleLocation: 'hidden'
        },
        {
          type: 'text',
          name: 'Built-in text SurveyJS component'
        }
      ],
      visible: true
    }
  ],
  showQuestionNumbers: false,
  textUpdateMode: 'onTyping',
  checkErrorsMode: 'onComplete'
};

export const jsonConditionalsNotMet = {
  elements: [
    {
      type: 'panel',
      name: 'panel1',
      elements: [
        {
          type: 'mv.bankverbindung',
          name: 'bankverbindung',
          variables: {
            stage: 'prod',
            mainTitle: '<h3>+++++++Hallo</h3>',
            iban: {
              title: 'Hallo IBAN'
            }
          },
          titleLocation: 'hidden'
        }
      ],
      visible: true
    }
  ],
  showQuestionNumbers: false
};
