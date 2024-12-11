export const formHeader = "Your journey to a healed you begins here. Our comprehensive second opinion service is available for $149.99 USD. This includes a detailed review of your intake form and imaging studies (MRI), CT Scan, X-Ray) by top, independent, board-certified spine specialists. This evaluation ensures you receive the best possible advice. Gain peace of mind and avoid unnecessary procedures with our trusted service and fair pricing. To optimize your chance for a successful outcome our service includes: "

export const SELECT_TYPE_VARIABLES = {
  SINGLE_SELECT: 'single_select',
  MULTI_SELECT: 'multi_select',
  TEXT_INPUT: 'text_input',
}

export const { 
  SINGLE_SELECT,
  MULTI_SELECT, 
  TEXT_INPUT
} = SELECT_TYPE_VARIABLES

export const secondPageQuestions = {
  1: {
    attribute: "acutePainType",
    options: [
      "Acute pain in the lower back but does not extend to legs.",
      "Acute pain in the lower back that radiates into the legs"
    ],
  },
  2: {
    attribute: "painSummary",
    options: [
      "Chronic pain.",
      "Spine pain caused by accident.",
      "Second opion from our spine specialists."
    ]
  }
}

export const questionsByPage = {
  // Page 3
  3: [
    {
      question: "Activity Level",
      attribute: "activityLevel",
      options: [
        "Sedentary",
        "Moderate",
        "Active"
      ],
      type: SINGLE_SELECT,
    },
    {
      question: "Where are you having pain?",
      attribute: "painAreas",
      options: [
        "Neck",
        "Arm",
        "Back",
        "Legs"
      ],
      type: MULTI_SELECT,
    },
    {
      question: "Did your pain start suddenly or gradually?",
      attribute: "painStartType",
      options: [
        "Suddenly",
        "Gradual"
      ],
      type: SINGLE_SELECT
    },
    {
      question: "How did your current pain start?",
      attribute: "painStartCauses",
      options: [
        "Lifting",
        "Twisting",
        "Bending",
        "Slip/Fall",
        "Unsure?"
      ],
      type: MULTI_SELECT
    },
    {
      question: "Have you done physical therapy for this problem?",
      attribute: "physicalTherapyHistory",
      options: [
        "Yes",
        "No"
      ],
      type: SINGLE_SELECT
    },
  ],
  4: [
    {
      question: "Have you been offered spinal surgery for this problem?",
      attribute: "offeredSpinalSurgery",
      options: [
        "Yes",
        "No"
      ],
      ifYes: {
        type: TEXT_INPUT,
        options: [
          { 
            question: "Procedure offered/Recommended?",
            attribute: "offeredProcedure"
          },
          {
            question: "What surgeon has offered you surgery?",
            attribute: "offeredBy"
          },
          { 
            question: "Expectation of results discussed?",
            attribute: "discussedResult"
          }
        ]
      },    
      type: SINGLE_SELECT
    },
    {
      question: "Recent imaging that you have had for your spine",
      attribute: 'spineImagingTypes',
      options: [
        "MRI",
        "X-rays",
        "CT Scan"
      ],
      type: MULTI_SELECT
    },
    {
      question: "Have you had previous spinal surgery?",
      attribute: "previousSpinalSurgery",
      options: [
        "Yes",
        "No"
      ],
      ifYes: {
        question: "If yes",
        type: TEXT_INPUT,
        options: [
          {
            question: "What procedure was performed",
            attribute: "surgeryType"
          },
          {
            question: "When was procedure performed",
            attribute: "surgeryDateTime"
          },
          {
            question: "Who performed the procedure",
            attribute: "surgeon"
          }
        ]
      },
      type: SINGLE_SELECT
    },
    {
      question: "Are you experiencing weakness or numbness in your arms or legs?",
      attribute: "limbWeaknessNumbness",
      options: [
        "Yes",
        "No"
      ],
      type: SINGLE_SELECT
    },
    {
      question: "Do you have unsteadiness with walking?",
      attribute: "walkingUnsteadiness",
      options: [
        "Yes",
        "No"
      ],
      type: SINGLE_SELECT
    },
  ],
  5: [
    {
      question: "Do you have problems using your hands or manipulating objects?",
      attribute: "handObjectManipulationProblem",
      options: [
        "Yes",
        "No"
      ],
      type: SINGLE_SELECT
    },
    {
      question: "What medications have you taken for your pain in the past?",
      attribute: "pastPainMedication",
      type: TEXT_INPUT
    },
    {
      question: "What medications are you currently taking for your pain?",
      attribute: "currentPainMedication",
      type: TEXT_INPUT
    },
    {
      question: "What activities make your pain worse or are limited?",
      attribute: "painfulActivities",
      options: [
        "Standing",
        "Walking",
        "Working out",
        "Bending forward",
        "Bending backward",
        "Sitting",
        "Lifting"
      ],
      type: MULTI_SELECT
    },
    {
      question: "Do any of these activities cause pain to radiate to your legs?",
      attribute: "painfulLegActivities",
      options: [
        "Standing",
        "Walking",
        "Working out",
        "Bending forward",
        "Bending backward",
        "Sitting",
        "Lifting",
      ],
      type: MULTI_SELECT
    },
  ],
  6: [
    {
      question: "What behaviors help to improve your pain?",
      attribute: "helpfulActivities",
      options: [
        "Sitting",
        "Standing",
        "Laying down",
        "Heat/Ice",
        "Shifting positions",
        "Limiting activities"
      ],
      type: MULTI_SELECT
    },
    {
      question: "Have you missed work or daily activities due to your pain?",
      attribute: "unoperationalDueToPain",
      options: [
        "Yes",
        "No"
      ],
      type: SINGLE_SELECT
    },
    {
      question: "Have you seen a pain management physician for your pain?",
      attribute: "physicianVisitForPain",
      options: [
        "Yes",
        "No"
      ],
      type: SINGLE_SELECT
    },
    {
      question: "Have you had injection procedures for your pain?",
      attribute: "injectionProcedureForPain",
      options: [
        "Yes",
        "No"
      ],
      ifYes: {
        label: "If yes, what type of injections have you had in the past?",
        type: MULTI_SELECT,
        attribute: "injectionTypes",
        options: [
          "Epidural injections (Level/side)",
          "Interlaminar/Transforaminal",
          "Facet injections (Level/side)"
        ],
      },
      type: SINGLE_SELECT
    },
    {
      question: "Do you obtain relief at least temporarily from the injections?",
      attribute: "injectionRelief",
      options: [
        "Yes",
        "No"
      ],
      ifYes: {
        type: TEXT_INPUT,
        options: [
          {
            question: "Specifically which injections helped?",
            attribute: "helpfulInjection"
          },
          {
            question: "How long did you get relief from this injection?",
            attribute: "injectionReliefDuration"
          }
        ]
      },
      type: SINGLE_SELECT
    },
  ],
  7: [
    {
      question: "What other medical problem do you have?",
      attribute: "medicalProblem",
      type: TEXT_INPUT
    },
    {
      question: "What current medications are you taking for this problem?",
      attribute: "currentMedication",
      type: TEXT_INPUT
    }
  ]
}