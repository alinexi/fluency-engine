import { GrammarDrill, GrammarLevel, LevelTier } from './grammarLibrary';

// Utility function to generate 30 structured levels for a drill
function generate30Levels(
  guidedSentences: string[], // Levels 1-10
  fadingSentences: string[], // Levels 11-20
  stressSentences: string[]  // Levels 21-30
): GrammarLevel[] {
  const levels: GrammarLevel[] = [];

  // Levels 1-10: Guided Muscle Memory
  for (let i = 1; i <= 10; i++) {
    levels.push({
      level: i,
      tier: 'guided',
      showFormula: true,
      sentences: guidedSentences.slice((i - 1) % guidedSentences.length, ((i - 1) % guidedSentences.length) + 4),
      constraints: { requiredAccuracyPercent: 90 },
    });
  }

  // Levels 11-20: Fading Support
  for (let i = 11; i <= 20; i++) {
    levels.push({
      level: i,
      tier: 'fading',
      showFormula: false,
      sentences: fadingSentences.slice((i - 11) % fadingSentences.length, ((i - 11) % fadingSentences.length) + 4),
      constraints: { hasNegatives: true, requiredAccuracyPercent: 95 },
    });
  }

  // Levels 21-30: Edge Cases & Stress Testing
  for (let i = 21; i <= 30; i++) {
    levels.push({
      level: i,
      tier: 'stress',
      showFormula: false,
      sentences: stressSentences.slice((i - 21) % stressSentences.length, ((i - 21) % stressSentences.length) + 4),
      constraints: {
        hasIrregularVerbs: true,
        hasQuestions: true,
        perfectStreakTarget: 5,
        targetWpm: 45 + (i - 20) * 2,
      },
    });
  }

  return levels;
}

export const GRAMMAR_DRILLS: GrammarDrill[] = [
  // ─── 1. Tenses & Aspects (Foundational & Advanced) ─────────────────────

  // Foundational Drill 1: Simple Present Mastery
  {
    id: 'tenses-simple-present',
    moduleId: 'tenses',
    title: 'Simple Present & 3rd Person Singular',
    ruleFormula: 'Subject + V1 (add -s/-es for he/she/it)',
    ruleSummary: 'Express habits, general truths, and routines. Pay close attention to third-person singular verb endings.',
    difficultyLabel: 'A1-A2 Foundation',
    targetCategory: 'Verb Tenses',
    explanation: 'Trains muscle memory for subject-verb agreement (e.g. "he works" vs "they work").',
    levels: generate30Levels(
      [
        'She works in a hospital.',
        'He drinks coffee every morning.',
        'The sun rises in the east.',
        'Water freezes at zero degrees.',
        'They study at the library daily.',
        'She manages the team project.',
      ],
      [
        'He does not enjoy long meetings, but he attends them faithfully.',
        'She works hard every day because she wants to succeed.',
        'The research team collects data and analyzes the results monthly.',
        'They do not agree on every detail, yet they respect each other.',
      ],
      [
        'Does the manager authorize travel expenses for international business trips?',
        'Why does the system automatically restart every midnight during backup operations?',
        'She seldom arrives late to class, even when traffic is heavy.',
        'Does he consistently fulfill all contractual obligations without assistance?',
      ]
    ),
  },

  // Foundational Drill 2: Simple Past Irregular Verbs
  {
    id: 'tenses-simple-past-irregular',
    moduleId: 'tenses',
    title: 'Simple Past — Irregular Verbs',
    ruleFormula: 'Subject + V2 (Irregular Form: went, saw, brought, taught)',
    ruleSummary: 'Master high-frequency irregular past tense verb forms that require rote muscle memory.',
    difficultyLabel: 'A2 Foundation',
    targetCategory: 'Verb Tenses',
    explanation: 'Eliminates regular "-ed" overgeneralizations (e.g. "go -> went", "think -> thought").',
    levels: generate30Levels(
      [
        'She wrote a detailed summary.',
        'They built a strong foundation.',
        'He bought a new textbook yesterday.',
        'The professor taught the lesson clearly.',
        'We found the missing document quickly.',
      ],
      [
        'She did not bring her laptop, so she wrote notes by hand.',
        'They understood the problem and chose an effective solution.',
        'He spoke to the director and expressed his concerns clearly.',
        'The government took action after the report was released.',
      ],
      [
        'Did the researchers foresee the unexpected complications during the experiment?',
        'Why did the board choose to withdraw its financial support last year?',
        'He had not thought that the outcome would be so favorable.',
        'Did she catch the earlier train before the snowstorm started?',
      ]
    ),
  },

  // Foundational Drill 3: Present Continuous
  {
    id: 'tenses-present-continuous',
    moduleId: 'tenses',
    title: 'Simple Present vs. Present Continuous',
    ruleFormula: 'Subject + am/is/are + V-ing (Ongoing action right now)',
    ruleSummary: 'Distinguish permanent routine states (Simple Present) from ongoing temporary actions (Present Continuous).',
    difficultyLabel: 'A1-A2 Foundation',
    targetCategory: 'Verb Tenses',
    explanation: 'Focuses on the "-ing" suffix and auxiliary "be" verb matching.',
    levels: generate30Levels(
      [
        'She is writing an essay now.',
        'They are conducting a survey.',
        'He is analyzing the latest data.',
        'The economy is growing steadily.',
        'Scientists are observing the pattern.',
      ],
      [
        'He usually walks to work, but today he is taking the subway.',
        'She is preparing a report while her colleague is reviewing the budget.',
        'They are not attending the lecture today because they are sick.',
      ],
      [
        'Are the researchers currently investigating the secondary effects of the medication?',
        'Why are global energy consumption rates increasing despite conservation efforts?',
        'Is she demonstrating the software update to the prospective clients right now?',
      ]
    ),
  },

  // Foundational Drill 4: Future Forms
  {
    id: 'tenses-future-forms',
    moduleId: 'tenses',
    title: 'Future Intentions: Will vs. Going To',
    ruleFormula: 'will + V1 (prediction/spontaneous)  vs.  be going to + V1 (planned intent)',
    ruleSummary: 'Drill distinctions between spontaneous predictions (will) and pre-planned intentions (going to).',
    difficultyLabel: 'A2-B1 Intermediate',
    targetCategory: 'Verb Tenses',
    explanation: 'Builds intuition for modal future auxiliary structures.',
    levels: generate30Levels(
      [
        'She will present her findings tomorrow.',
        'They are going to launch the product.',
        'He will complete the assignment soon.',
        'We are going to visit the lab next week.',
      ],
      [
        'She is going to study medicine because she wants to help patients.',
        'If the weather improves tomorrow, we will conduct the field test.',
        'They are not going to compromise on environmental standards.',
      ],
      [
        'Will the committee approve the revised budget proposal during next week meeting?',
        'Are they going to implement the new safety regulations before the end of the quarter?',
        'Will advanced automation displace more administrative jobs over the coming decade?',
      ]
    ),
  },

  // Existing Drill 5: Present Perfect vs Simple Past
  {
    id: 'tenses-present-perfect',
    moduleId: 'tenses',
    title: 'Present Perfect vs. Simple Past',
    ruleFormula: 'Subject + have/has + V3  vs.  Subject + V2',
    ruleSummary: 'Use Present Perfect for past actions with present relevance; use Simple Past for completed past events at a specific time.',
    difficultyLabel: 'B1-B2 Intermediate',
    targetCategory: 'Verb Tenses',
    explanation: 'Notice how "has increased" emphasizes current status, while "increased in 2010" specifies a closed past timeframe.',
    levels: generate30Levels(
      [
        'Global urbanization has accelerated rapidly.',
        'Governments have implemented several policies.',
        'Research has shown a clear link.',
        'The company introduced new rules in 2021.',
      ],
      [
        'Scientists have identified critical vulnerabilities, but politicians have not taken action.',
        'Many nations experienced growth in the past, whereas developing economies have surged recently.',
        'He has worked here for five years, but he worked in London previously.',
      ],
      [
        'Have international regulators established comprehensive standards for artificial intelligence yet?',
        'Why did the project fail last year even though the team had secured funding?',
        'Have you ever evaluated the long-term environmental consequences of urban sprawl?',
      ]
    ),
  },

  // Existing Drill 6: Past Perfect
  {
    id: 'tenses-past-perfect',
    moduleId: 'tenses',
    title: 'Past Perfect for Chronological Sequence',
    ruleFormula: 'Subject + had + V3 (happened before another past action)',
    ruleSummary: 'Use Past Perfect to establish which of two past actions occurred first.',
    difficultyLabel: 'B2 Intermediate',
    targetCategory: 'Verb Tenses',
    explanation: 'Establishes clear temporal precedence before a secondary past benchmark.',
    levels: generate30Levels(
      [
        'Factories had discharged waste freely.',
        'Researchers had gathered extensive data.',
        'The city had expanded significantly.',
        'Opinions had already shifted completely.',
      ],
      [
        'Before the new regulations were enacted, factories had discharged toxic waste without penalty.',
        'By the time the report was published, public opinion had already shifted against the proposal.',
        'The committee had reached a consensus before the director called for a final vote.',
      ],
      [
        'Had the engineers completed structural testing before the severe earthquake struck the region?',
        'Why had the institution not disclosed the financial discrepancy prior to the annual audit?',
        'Had she already finished her doctoral thesis when she accepted the research position?',
      ]
    ),
  },

  // Existing Drill 7: Future Perfect
  {
    id: 'tenses-future-perfect',
    moduleId: 'tenses',
    title: 'Future Perfect & Completion',
    ruleFormula: 'Subject + will have + V3 + by [time]',
    ruleSummary: 'Expresses an action that will be completed prior to a specific point in the future.',
    difficultyLabel: 'B2-C1 Advanced',
    targetCategory: 'Verb Tenses',
    explanation: 'Projects completion relative to a future deadline.',
    levels: generate30Levels(
      [
        'By 2050, the population will have doubled.',
        'Scientists will have developed alternatives.',
        'Automated systems will have transformed farms.',
        'The team will have finalized the trial.',
      ],
      [
        'By the end of this decade, automated systems will have transformed agricultural efficiency worldwide.',
        'Researchers will have published their conclusions before the global summit convenes in November.',
      ],
      [
        'Will humanity have achieved sustainable clean energy before fossil reserves are exhausted?',
        'How many urban centers will have adopted zero-emission public transport by 2040?',
      ]
    ),
  },

  // Foundational Drill 8: Perfect Continuous
  {
    id: 'tenses-perfect-continuous',
    moduleId: 'tenses',
    title: 'Perfect Continuous — Duration Emphasis',
    ruleFormula: 'Subject + have/has/had + been + V-ing',
    ruleSummary: 'Emphasize the ongoing duration of an activity up to a present or past point in time.',
    difficultyLabel: 'B2-C1 Advanced',
    targetCategory: 'Verb Tenses',
    explanation: 'Highlights continuous temporal duration ("for three hours", "since 2015").',
    levels: generate30Levels(
      [
        'She has been studying for hours.',
        'They have been researching the topic.',
        'He had been working continuously.',
        'The climate has been warming steadily.',
      ],
      [
        'Scientists have been studying the impact of microplastics on marine life for over a decade.',
        'The company had been operating at a loss for two years before it declared bankruptcy.',
      ],
      [
        'How long have international negotiators been deliberating the terms of the trade agreement?',
        'Had the team been testing the software prototype continuously prior to the system crash?',
      ]
    ),
  },

  // ─── 2. Conditionals & Hypotheses ─────────────────────────────────────────
  {
    id: 'cond-second-conditional',
    moduleId: 'conditionals',
    title: 'Second Conditional (Hypothetical Present/Future)',
    ruleFormula: 'If + Subject + Past Simple, Subject + would + V1',
    ruleSummary: 'Express hypothetical, unlikely, or imaginary situations in the present or future.',
    difficultyLabel: 'B1-B2 Intermediate',
    targetCategory: 'Conditionals',
    explanation: 'Used when proposing theoretical policy solutions or imaginary choices.',
    levels: generate30Levels(
      [
        'If tuition were free, more people would study.',
        'If cities planted trees, heat would decrease.',
        'If taxes were lower, savings would grow.',
      ],
      [
        'If public transport were completely free, urban pollution levels would decrease substantially.',
        'If companies rewarded remote productivity, employee turnover would diminish significantly.',
      ],
      [
        'Would global carbon emissions drop if all automobile manufacturers switched to electric vehicles?',
        'If governments allocated more funds to basic research, what discoveries would scientists make?',
      ]
    ),
  },
  {
    id: 'cond-third-conditional',
    moduleId: 'conditionals',
    title: 'Third Conditional (Unreal Past)',
    ruleFormula: 'If + Subject + had + V3, Subject + would have + V3',
    ruleSummary: 'Speculates about imaginary past situations that did not happen and their hypothetical past results.',
    difficultyLabel: 'C1 Advanced',
    targetCategory: 'Conditionals',
    explanation: 'Essential for IELTS Task 2 counterfactual evaluation and analytical reflection.',
    levels: generate30Levels(
      [
        'If they had invested early, emissions would have dropped.',
        'Had he known the truth, he would have reacted.',
        'If doctors had acted sooner, containment would have succeeded.',
      ],
      [
        'If governments had invested earlier in renewable energy, greenhouse gas emissions would have dropped.',
        'Had the company foreseen the financial downturn, it would have diversified its investment portfolio.',
      ],
      [
        'Would the outbreak have been contained if health authorities had declared an emergency immediately?',
        'Had strict environmental regulations been enforced, would river contamination have been prevented?',
      ]
    ),
  },
  {
    id: 'cond-mixed-conditional',
    moduleId: 'conditionals',
    title: 'Mixed Conditionals (Past Cause → Present Result)',
    ruleFormula: 'If + Subject + had + V3, Subject + would + V1 (now)',
    ruleSummary: 'Connects an unfulfilled past action to a present hypothetical outcome.',
    difficultyLabel: 'C1 Advanced',
    targetCategory: 'Conditionals',
    explanation: 'Binds past decisions directly to present consequences.',
    levels: generate30Levels(
      [
        'If planners had built parks, cities would be greener now.',
        'Had we adopted technology, our work would be easier today.',
      ],
      [
        'If urban planners had prioritized green infrastructure decades ago, cities would be far more livable today.',
        'Had the country embraced digital infrastructure earlier, its national economy would be stronger now.',
      ],
      [
        'Would the university be leading international research today if it had secured federal funding years ago?',
        'If regulators had banned harmful chemicals in the past, would marine ecosystems be healthier today?',
      ]
    ),
  },

  // ─── 3. Modal Auxiliary Verbs ──────────────────────────────────────────────
  {
    id: 'modals-hedging-academic',
    moduleId: 'modals',
    title: 'Academic Hedging with Modals',
    ruleFormula: 'may / might / could + V1',
    ruleSummary: 'Avoid overly definitive claims in academic writing by softening assertions with modal verbs.',
    difficultyLabel: 'B2 Intermediate',
    targetCategory: 'Modal Verbs',
    explanation: 'Academic tone requires cautious claims rather than absolute generalizations.',
    levels: generate30Levels(
      [
        'Screen time may affect sleep.',
        'Tariffs might raise local prices.',
        'Exercise could lower stress levels.',
      ],
      [
        'Excessive screen usage may contribute to reduced attention spans among young elementary school learners.',
        'Implementing strict trade tariffs might exacerbate existing economic tensions between partner nations.',
      ],
      [
        'Could automated artificial intelligence diagnostic tools assist physicians in detecting rare genetic diseases early?',
        'Might higher taxation on sugary beverages encourage healthier dietary habits across urban populations?',
      ]
    ),
  },
  {
    id: 'modals-deduction-past',
    moduleId: 'modals',
    title: 'Past Modals of Deduction & Regret',
    ruleFormula: 'must have / should have / could have + V3',
    ruleSummary: 'Deduce past events (must have) or evaluate past errors and missed opportunities (should have / could have).',
    difficultyLabel: 'C1 Advanced',
    targetCategory: 'Modal Verbs',
    explanation: 'Ideal for critical evaluation in academic essays.',
    levels: generate30Levels(
      [
        'Policymakers should have acted.',
        'The error must have occurred early.',
        'Banks could have lowered rates.',
      ],
      [
        'Policymakers should have addressed regional infrastructure disparities much sooner than they did.',
        'The unexpected laboratory anomaly must have resulted from improper sensor calibration during setup.',
      ],
      [
        'Could the central bank have lowered interest rates earlier to prevent severe market contraction?',
        'Should government health agencies have issued public advisories before the seasonal flu peaked?',
      ]
    ),
  },

  // ─── 4. Connecting Words & Cohesion ────────────────────────────────────────
  {
    id: 'connectors-subordinating',
    moduleId: 'connectors',
    title: 'Subordinating Conjunctions & Contrast',
    ruleFormula: 'Although / Even though / Whereas + Clause, Main Clause',
    ruleSummary: 'Introduce concession or contrast within a single complex sentence structure.',
    difficultyLabel: 'B2 Intermediate',
    targetCategory: 'Cohesion & Coherence',
    explanation: 'Boosts Coherence & Coherence scores in IELTS Task 2 essays.',
    levels: generate30Levels(
      [
        'Although tech improved, fossil fuels dominate.',
        'Whereas retail is physical, e-commerce is online.',
      ],
      [
        'Although renewable energy technology has advanced, fossil fuels still dominate global energy production.',
        'Whereas traditional retail relies on physical storefronts, e-commerce operates seamlessly around the clock.',
      ],
      [
        'Despite significant initial financial capital costs, can electric mass transit systems deliver long-term savings?',
        'While automation boosts industrial productivity, does it inevitably displace entry-level factory workers?',
      ]
    ),
  },
  {
    id: 'connectors-causal-transitions',
    moduleId: 'connectors',
    title: 'Causal Discourse Markers',
    ruleFormula: 'Consequently, / Therefore, / As a result, + Sentence',
    ruleSummary: 'Connect sentences by showing clear cause-and-effect relationships.',
    difficultyLabel: 'B2 Intermediate',
    targetCategory: 'Cohesion & Coherence',
    explanation: 'Establishes logical flow across paragraph ideas.',
    levels: generate30Levels(
      [
        'Prices rose; consequently, buyers left.',
        'Drought hit; as a result, crops failed.',
      ],
      [
        'Urban housing prices have skyrocketed; consequently, many young professionals are moving to suburban areas.',
        'The agricultural region experienced severe drought; as a result, total crop yields dropped by thirty percent.',
      ],
      [
        'Digital literacy is now vital; therefore, shouldn’t educational authorities update national core curricula immediately?',
        'Strict conservation laws were enforced; subsequently, did endangered wildlife populations recover as expected?',
      ]
    ),
  },

  // ─── 5. Sentence Structure ────────────────────────────────────────────────
  {
    id: 'struct-relative-clauses',
    moduleId: 'structure',
    title: 'Non-Defining Relative Clauses',
    ruleFormula: 'Main Subject, who/which + Clause, Main Verb',
    ruleSummary: 'Embed additional descriptive information smoothly inside commas without breaking main sentence flow.',
    difficultyLabel: 'B2 Intermediate',
    targetCategory: 'Complex Grammar',
    explanation: 'Demonstrates grammatical range and sophisticated sentence architecture.',
    levels: generate30Levels(
      [
        'AI, which transforms health, needs rules.',
        'The solar farm, which is huge, powers homes.',
      ],
      [
        'Artificial intelligence, which is transforming modern healthcare, requires transparent ethical oversight.',
        'The solar farm, which covers five hundred hectares, supplies clean electricity to fifty thousand homes.',
      ],
      [
        'Did Dr. Aris, who chaired the international climate council, emphasize immediate binding carbon limits?',
        'Do urban green spaces, which effectively reduce ambient summer heat, measurably improve community mental health?',
      ]
    ),
  },
  {
    id: 'struct-passive-voice',
    moduleId: 'structure',
    title: 'Academic Passive Voice',
    ruleFormula: 'Subject + be + V3 + (by Agent)',
    ruleSummary: 'Shift focus to the action or object rather than the actor, standard in scientific and academic writing.',
    difficultyLabel: 'B2 Intermediate',
    targetCategory: 'Complex Grammar',
    explanation: 'Removes subjective personal pronouns and elevates academic register.',
    levels: generate30Levels(
      [
        'Advancements have been made in AI.',
        'Protocols were maintained during trials.',
      ],
      [
        'Significant advancements have been made in quantum computing hardware architectures over recent years.',
        'Strict confidentiality protocols were maintained by researchers throughout the multi-stage clinical trial.',
      ],
      [
        'Were the proposal guarantees rejected by the executive board due to inadequate environmental impact assessments?',
        'Has raw data from thousands of patient profiles been thoroughly analyzed using validated algorithms?',
      ]
    ),
  },

  // ─── 6. Parts of Speech & Mechanics ───────────────────────────────────────
  {
    id: 'parts-dependent-prepositions',
    moduleId: 'parts-of-speech',
    title: 'Dependent Prepositions & Collocations',
    ruleFormula: 'Verb/Adjective + specific preposition (attribute to, crucial for)',
    ruleSummary: 'Drill fixed prepositional pairings essential for precise, natural English phrasing.',
    difficultyLabel: 'B2 Intermediate',
    targetCategory: 'Grammar Mechanics',
    explanation: 'Eliminates common L2 preposition errors.',
    levels: generate30Levels(
      [
        'They attribute inflation to supply shortages.',
        'Clean water is vital to public health.',
      ],
      [
        'Economists attribute the recent global inflation spike primarily to severe international supply chain disruptions.',
        'Universal clean water access is fundamental to preventing widespread waterborne disease outbreaks in urban centers.',
      ],
      [
        'Is the newly proposed corporate tax structure fully compatible with existing international trade treaties?',
        'Why do academic scholars frequently take exception to unverified empirical statements in published literature?',
      ]
    ),
  },
];
