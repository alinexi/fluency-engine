import { ExamPrompt } from './examLibrary';

export const EXAM_PROMPTS: ExamPrompt[] = [

  // ─── IELTS Academic · Task 1 ────────────────────────────────────────────

  {
    id: 'ielts-ac-t1-linegraph-001',
    exam: 'IELTS Academic',
    task: 'Task 1',
    questionType: 'Line Graph',
    targetWordCount: 175,
    tags: ['#Band_9', '#Technology', '#Internet'],
    promptText:
      'The graph below shows the percentage of households in a European country with access to the internet between 1999 and 2009. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
    sampleAnswer:
      'The line graph illustrates the proportion of European households with internet access over a ten-year period from 1999 to 2009. Overall, there was a dramatic and sustained rise in connectivity throughout this period, with the figure more than tripling by the end of the decade. In 1999, only around 10 percent of households were connected to the internet. This figure climbed steadily to approximately 25 percent by 2002, before accelerating sharply to reach 35 percent in 2003. Growth continued at a consistent pace over the following years, and by 2006 the proportion stood at roughly 55 percent. The most notable surge occurred between 2006 and 2007, when connectivity jumped by nearly 10 percentage points to approach 65 percent. By 2009, the figure had reached approximately 70 percent, suggesting that internet access was becoming near-universal among European households.',
    scoringNotes:
      'This response achieves Band 9 through its precise data referencing, logical progression, accurate use of approximation language ("approximately", "roughly"), and a clear overview sentence identifying the overarching trend before the detail.',
    highlightedVocab: [
      { word: 'illustrates', cefr: 'C1', explanation: 'Formal verb for describing data visualisations; preferred over "shows" in academic writing.' },
      { word: 'proportion', cefr: 'C1', explanation: 'Academic synonym for percentage/share; avoids repetition of "percent".' },
      { word: 'accelerating', cefr: 'C1', explanation: 'Precisely describes growth that is increasing in speed, not merely continuing.' },
      { word: 'sustained', cefr: 'C1', explanation: 'Signals that the rise was consistent over time without reversal.' },
      { word: 'surge', cefr: 'C1', explanation: 'High-register noun for a sudden, sharp increase; adds lexical variety.' },
    ],
    highlightedStructures: [
      { phrase: 'Overall, there was a dramatic and sustained rise', label: 'Overview sentence', explanation: 'IELTS Task 1 Band 9 responses include a clear overview that is separate from the introduction and does not copy the prompt.' },
      { phrase: 'climbed steadily to approximately 25 percent by 2002, before accelerating sharply', label: 'Contrast within one clause', explanation: 'Linking two contrasting time phases in one complex sentence using "before + gerund" is a high-scoring structural technique.' },
    ],
  },

  {
    id: 'ielts-ac-t1-barchart-001',
    exam: 'IELTS Academic',
    task: 'Task 1',
    questionType: 'Bar Chart',
    targetWordCount: 170,
    tags: ['#Band_9', '#Education', '#Employment'],
    promptText:
      'The chart below shows the number of men and women in further education in Britain in three periods and whether they were studying full-time or part-time. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
    sampleAnswer:
      'The bar chart compares male and female participation in further education in Britain across three time periods, distinguishing between full-time and part-time enrolment. Overall, female participation grew considerably over the period, eventually surpassing male enrolment, while part-time study remained the dominant mode for both genders. In the earliest period shown, men outnumbered women across both study modes. However, by the second period, female full-time enrolment had risen markedly, drawing level with that of their male counterparts. The most dramatic shift occurred in the final period, when the number of women studying both full-time and part-time exceeded that of men. Part-time enrolment was consistently higher than full-time across all groups and periods, suggesting that many students in further education balance study with other commitments such as employment. The data clearly indicate a long-term trend toward greater female participation in higher education throughout Britain.',
    scoringNotes:
      'This response scores Band 9 by accurately comparing across two variables simultaneously (gender and study mode), including a clear overview, and using precise comparative language without copying the prompt wording.',
    highlightedVocab: [
      { word: 'enrolment', cefr: 'C1', explanation: 'Academic noun for the act of registering in a course; preferable to "sign-up" or "joining".' },
      { word: 'surpassing', cefr: 'C1', explanation: 'Formal verb meaning to exceed or go beyond; signals a reversal of position.' },
      { word: 'counterparts', cefr: 'C1', explanation: 'Used to compare equivalent groups; avoids repeating "men" or "women".' },
      { word: 'consistently', cefr: 'C1', explanation: 'Adverb indicating a pattern that holds across all data points.' },
    ],
    highlightedStructures: [
      { phrase: 'while part-time study remained the dominant mode for both genders', label: 'Contrastive subordinate clause', explanation: 'Adding "while" to introduce a contrasting secondary trend in the overview is a hallmark of Band 9 Task 1 responses.' },
      { phrase: 'suggesting that many students in further education balance study with other commitments', label: 'Speculation from data', explanation: 'Making an informed inference from the data demonstrates critical thinking and earns marks for Task Achievement.' },
    ],
  },

  {
    id: 'ielts-ac-t1-map-001',
    exam: 'IELTS Academic',
    task: 'Task 1',
    questionType: 'Map',
    targetWordCount: 165,
    tags: ['#Band_9', '#Urban Development', '#Environment'],
    promptText:
      'The maps below show a small town called Islip as it is now, and plans for its future development. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
    sampleAnswer:
      'The two maps illustrate the current layout of Islip town centre and proposed changes to its infrastructure in the future. Overall, the redevelopment plan involves significant expansion to the south of the town, the construction of a ring road to reduce through-traffic, and the replacement of several existing facilities with new amenities. At present, Islip features a main road running through the centre, flanked by shops and a park to the north. To the south, there is currently open countryside. Under the proposed development, this southern area would be converted into a residential zone, housing new homes and a school. The existing shops would be relocated to an enclosed shopping centre situated to the north of the ring road. The park would be retained, though reduced in size. Crucially, the new ring road would encircle the town, diverting traffic away from the central shopping zone and improving pedestrian access throughout.',
    scoringNotes:
      'Band 9 map responses use precise spatial language ("to the south", "flanked by", "encircle"), describe changes using appropriate future forms ("would be converted"), and synthesise all major features without listing every minor detail.',
    highlightedVocab: [
      { word: 'infrastructure', cefr: 'C1', explanation: 'Formal academic noun for the physical structures and systems of a place.' },
      { word: 'amenities', cefr: 'C1', explanation: 'Collective noun for facilities that make a place comfortable or convenient.' },
      { word: 'encircle', cefr: 'C1', explanation: 'Formal verb meaning to surround completely; precise spatial language.' },
      { word: 'diverting', cefr: 'C1', explanation: 'Used here in its technical sense: redirecting a flow of traffic away from an area.' },
    ],
    highlightedStructures: [
      { phrase: 'this southern area would be converted into a residential zone', label: 'Future passive (plans)', explanation: 'For map tasks describing proposals, the future passive ("would be + past participle") is the most appropriate and accurate structure.' },
      { phrase: 'The park would be retained, though reduced in size', label: 'Concessive clause (reduced form)', explanation: '"Though + past participle" is an elegant way to note a partial change, showing grammatical range.' },
    ],
  },

  // ─── IELTS Academic · Task 2 ────────────────────────────────────────────

  {
    id: 'ielts-ac-t2-agree-001',
    exam: 'IELTS Academic',
    task: 'Task 2',
    questionType: 'Agree / Disagree',
    targetWordCount: 280,
    tags: ['#Band_9', '#Technology', '#Society'],
    promptText:
      'Some people believe that modern technology is increasing the gap between rich and poor people in society. To what extent do you agree or disagree with this statement?',
    sampleAnswer:
      'It is widely argued that technological advancement is exacerbating economic inequality by concentrating wealth among those with the resources and education to exploit new digital tools. While this concern is legitimate, I would argue that, on balance, technology also creates powerful mechanisms for social mobility and therefore does not inevitably widen the divide between rich and poor. The primary reason technology can deepen inequality is that high-quality devices, reliable internet connectivity, and digital literacy are not equally distributed. In developing regions, prohibitive costs mean that the digital revolution largely bypasses the poorest communities, leaving them unable to access the economic and educational opportunities that technology provides to wealthier populations. Furthermore, automation driven by artificial intelligence disproportionately displaces low-skilled workers, whose livelihoods are most precarious. However, these challenges are not inherent to technology itself but reflect pre-existing structural inequalities. In many instances, technology has demonstrably levelled the playing field. Mobile banking has given millions of unbanked individuals in sub-Saharan Africa access to financial services for the first time. Similarly, low-cost smartphones and open educational platforms such as Khan Academy provide high-quality instruction to anyone with internet access, regardless of income. These developments suggest that, with appropriate policy interventions, technology can be a powerful equaliser rather than a driver of disparity. In conclusion, while technology can reinforce inequality when access is unevenly distributed, its net effect on society depends largely on political will and investment in digital infrastructure. I therefore partially agree with the statement but maintain that technology\'s potential to reduce inequality is greater than its capacity to entrench it.',
    scoringNotes:
      'This response earns Band 9 through its nuanced, partially-agreed position, sophisticated use of real-world examples (mobile banking in Africa, Khan Academy), and a logical three-part structure: opposing view acknowledged, counter-argument developed, qualified conclusion.',
    highlightedVocab: [
      { word: 'exacerbating', cefr: 'C2', explanation: 'C2 verb meaning to make a problem worse; a hallmark of Band 9 lexical resource.' },
      { word: 'precarious', cefr: 'C2', explanation: 'Describes a situation that is uncertain and could worsen at any moment.' },
      { word: 'demonstrably', cefr: 'C2', explanation: 'Formal adverb meaning "in a way that can be clearly shown"; signals evidential confidence.' },
      { word: 'disparities', cefr: 'C1', explanation: 'Formal plural noun for significant differences, especially inequalities.' },
      { word: 'interventions', cefr: 'C1', explanation: 'Policy/academic term for deliberate actions taken to change a situation.' },
    ],
    highlightedStructures: [
      { phrase: 'While this concern is legitimate, I would argue that, on balance', label: 'Concessive + qualified thesis', explanation: 'Acknowledging the opposing view before stating your position is a Band 9 technique that signals critical engagement.' },
      { phrase: 'These developments suggest that, with appropriate policy interventions, technology can be a powerful equaliser', label: 'Embedded conditional in a concluding claim', explanation: 'Embedding a condition ("with appropriate policy interventions") within a main clause demonstrates complex syntactic control.' },
    ],
  },

  {
    id: 'ielts-ac-t2-advantages-001',
    exam: 'IELTS Academic',
    task: 'Task 2',
    questionType: 'Advantages & Disadvantages',
    targetWordCount: 275,
    tags: ['#Band_9', '#Globalisation', '#Culture'],
    promptText:
      'Today, more and more people are choosing to live and work in cities, leaving rural areas depopulated. Do the advantages of this trend outweigh the disadvantages?',
    sampleAnswer:
      'Rapid urbanisation is one of the defining demographic shifts of the modern era. While the movement of people from rural areas to cities brings undeniable economic and social benefits, it simultaneously creates serious environmental, social, and cultural problems, both in urban and rural settings. I believe the disadvantages ultimately outweigh the advantages. On the positive side, cities offer residents significantly greater access to employment, healthcare, and education. Concentrated populations make it economically viable to maintain hospitals, universities, and transport networks that would be unsustainable in sparsely populated regions. For individuals, particularly those from disadvantaged backgrounds, urban migration can represent a genuine path out of poverty. Furthermore, the density of cities drives innovation, as proximity between workers in diverse fields fosters collaboration and the exchange of ideas. Nevertheless, the costs of this trend are substantial. As rural communities depopulate, they lose the economic base required to sustain local services, schools, and cultural traditions, often leading to irreversible decline. Meanwhile, rapidly growing cities face chronic shortages of affordable housing, overstretched public services, worsening air quality, and rising social tensions. Moreover, the psychological toll of city life — including isolation, noise, and the pressures of competitive job markets — should not be underestimated. In conclusion, while urbanisation creates opportunity for individuals, the systemic damage it inflicts on rural communities and the quality of urban life suggests that its negative consequences are more profound and harder to reverse. Governments must therefore prioritise policies that incentivise rural development rather than simply managing the consequences of unchecked urban growth.',
    scoringNotes:
      'A strong advantages/disadvantages response takes a clear stance on whether one side outweighs the other, rather than sitting on the fence. This response develops each side with specific, concrete details and gives a fully justified conclusion.',
    highlightedVocab: [
      { word: 'urbanisation', cefr: 'C1', explanation: 'Key academic term for the process by which more people come to live in cities.' },
      { word: 'depopulate', cefr: 'C2', explanation: 'Formal verb describing the process of a place losing its population.' },
      { word: 'proximity', cefr: 'C1', explanation: 'Formal noun meaning physical closeness; used here in its causal sense.' },
      { word: 'incentivise', cefr: 'C1', explanation: 'Policy/academic verb meaning to create financial or other motivation for behaviour.' },
    ],
    highlightedStructures: [
      { phrase: 'the psychological toll of city life — including isolation, noise, and the pressures of competitive job markets — should not be underestimated', label: 'Em-dash parenthetical + passive modal', explanation: 'Using dashes to embed an elaborating list mid-sentence, combined with the impersonal "should not be underestimated", demonstrates high grammatical range.' },
    ],
  },

  {
    id: 'ielts-ac-t2-discuss-001',
    exam: 'IELTS Academic',
    task: 'Task 2',
    questionType: 'Discuss Both Sides',
    targetWordCount: 275,
    tags: ['#Band_9', '#Education', '#Children'],
    promptText:
      'Some parents believe it is better for children to grow up in the city, while others think that the countryside provides a healthier and safer environment. Discuss both views and give your own opinion.',
    sampleAnswer:
      'The question of whether children benefit more from an urban or a rural upbringing reflects deeper tensions between educational opportunity and environmental quality, and between social diversity and natural space. While cities offer unparalleled access to resources and cultural experiences, rural environments provide children with physical freedom and developmental benefits that urban settings often cannot replicate. Those who favour raising children in cities argue that metropolitan environments give young people access to superior schools, a wider range of extracurricular activities, and exposure to diverse cultures and social groups. This breadth of experience is seen as essential preparation for an increasingly interconnected world. In addition, proximity to museums, libraries, and technology hubs can stimulate intellectual curiosity from an early age. On the other hand, proponents of rural upbringings contend that children raised in the countryside develop greater self-reliance, physical fitness, and an appreciation of the natural world. Research consistently suggests that access to green spaces is associated with lower levels of anxiety and improved attention in children. Furthermore, smaller, tighter-knit communities often provide a safer social environment, with lower rates of crime and less exposure to the pressures of peer competition. In my view, while both environments have genuine merits, children raised in rural areas tend to enjoy better physical and psychological wellbeing during their formative years. Cities can later provide access to professional and cultural opportunities, but the benefits of a grounded, outdoor childhood are difficult to replicate in an urban setting and have lasting positive effects.',
    scoringNotes:
      'Discuss Both Sides responses must present each view fairly before giving a personal opinion. This response avoids the common error of letting the personal view dominate one side — each body paragraph is roughly equal in length and depth.',
    highlightedVocab: [
      { word: 'unparalleled', cefr: 'C2', explanation: 'Means having no equal; a strong intensifier for academic descriptions of advantage.' },
      { word: 'proponents', cefr: 'C1', explanation: 'Formal noun for people who support a particular idea or course of action.' },
      { word: 'contend', cefr: 'C1', explanation: 'Formal verb meaning to assert or argue; signals academic reporting of a view.' },
      { word: 'formative', cefr: 'C1', explanation: 'Used to describe the early years when character and habits are established.' },
    ],
    highlightedStructures: [
      { phrase: 'While cities offer unparalleled access to resources and cultural experiences, rural environments provide children with physical freedom', label: 'Parallel contrast clause', explanation: 'Using a "While A, B" structure with parallel noun phrases on both sides is a precise and elegant way to present two sides simultaneously.' },
    ],
  },

  {
    id: 'ielts-ac-t2-cause-001',
    exam: 'IELTS Academic',
    task: 'Task 2',
    questionType: 'Cause & Solution',
    targetWordCount: 280,
    tags: ['#Band_9', '#Health', '#Obesity'],
    promptText:
      'In many countries, obesity in young people is a growing problem. What do you think are the causes of this, and what measures could be taken to address it?',
    sampleAnswer:
      'Childhood obesity has become a pressing public health crisis in numerous nations, with rates rising sharply across income levels and geographic regions. This essay will examine the principal causes of this trend and propose a range of viable solutions. The most significant driver of youth obesity is the widespread availability and aggressive marketing of energy-dense, nutrient-poor foods. Fast food chains and snack manufacturers specifically target young consumers through social media, television advertising, and product placement in schools. When children are persistently exposed to these stimuli from an early age, unhealthy dietary preferences become entrenched. Compounding this issue is the dramatic reduction in children\'s physical activity, driven partly by increased screen time and partly by the design of urban environments that offer few safe spaces for outdoor play. Sedentary lifestyles, when combined with poor dietary habits, create conditions in which weight gain is almost inevitable. Addressing this problem requires coordinated action at multiple levels. Governments should introduce comprehensive regulations on the marketing of unhealthy foods to children, including restrictions on advertising before the watershed and clear mandatory nutritional labelling. Schools must be empowered to serve balanced meals, provide daily physical education, and incorporate nutritional literacy into curricula from an early age. At the community level, investment in accessible parks, cycle lanes, and recreational facilities would encourage children to be more physically active as a natural part of daily life. In conclusion, childhood obesity is the product of an environment that simultaneously promotes unhealthy consumption and discourages movement. Only through systemic change at governmental, institutional, and community levels can this trajectory be meaningfully reversed.',
    scoringNotes:
      'Cause & Solution essays must clearly identify causes first, then propose solutions that logically address those specific causes. This response demonstrates the link explicitly — marketing causes poor diet, so the solution targets marketing regulation.',
    highlightedVocab: [
      { word: 'entrenched', cefr: 'C2', explanation: 'Describes habits or beliefs that are deeply fixed and difficult to change.' },
      { word: 'compounding', cefr: 'C1', explanation: 'Participial adjective meaning making worse by adding another factor.' },
      { word: 'sedentary', cefr: 'C1', explanation: 'Formal adjective describing a lifestyle with little physical movement.' },
      { word: 'trajectory', cefr: 'C2', explanation: 'Metaphorical academic noun meaning the course or path a trend is following.' },
      { word: 'watershed', cefr: 'C2', explanation: 'Broadcasting term for the time after which adult content can be shown; used here in its technical context.' },
    ],
    highlightedStructures: [
      { phrase: 'Sedentary lifestyles, when combined with poor dietary habits, create conditions in which weight gain is almost inevitable', label: 'Fronted absolute + relative clause', explanation: 'Starting a sentence with a noun phrase and inserting a conditional parenthetical before the verb is an advanced technique that signals sophisticated control of complex syntax.' },
    ],
  },

  {
    id: 'ielts-ac-t2-twopart-001',
    exam: 'IELTS Academic',
    task: 'Task 2',
    questionType: 'Two-Part Question',
    targetWordCount: 270,
    tags: ['#Band_9', '#Environment', '#Responsibility'],
    promptText:
      'Some people think that environmental problems are too big for individuals to solve, while others believe that individuals can make a difference. Discuss both views. What is your opinion? Also: Why is it important to address environmental issues today?',
    sampleAnswer:
      'Environmental degradation is widely recognised as the defining challenge of our time, yet there is genuine disagreement about whether individual actions can meaningfully contribute to solutions that appear to require systemic, governmental intervention. To answer the two questions posed, I will first evaluate the role of the individual before explaining why urgency is essential. Those who argue that individuals are powerless point to the scale of industrial pollution, which dwarfs the combined environmental impact of all consumer behaviour. Major corporations account for the vast majority of global carbon emissions, and no amount of individual recycling or dietary change will offset the damage caused by fossil fuel industries without regulatory pressure on those industries. Conversely, individual action, when aggregated across millions of people, can drive meaningful change. Consumer choices signal market demand; reduced consumption of single-use plastics, for example, has already influenced corporate packaging decisions in several major markets. Moreover, individuals who change their behaviour tend to influence those around them, creating a social multiplier effect that extends their impact far beyond their own household. The importance of addressing environmental issues without delay cannot be overstated. Climate change, biodiversity loss, and ocean acidification operate on timescales that render delay catastrophic. The window for limiting global warming to manageable levels is narrowing rapidly, and solutions delayed by a decade may prove wholly inadequate. In conclusion, while systemic change is necessary, individuals have both the capacity and the moral responsibility to act, and the urgency of the environmental crisis makes inaction at any level unconscionable.',
    scoringNotes:
      'Two-Part Question responses must explicitly answer both parts of the question. This response uses clear signposting ("To answer the two questions posed") and devotes clear paragraphs to each, avoiding the common error of only partially answering the prompt.',
    highlightedVocab: [
      { word: 'aggregated', cefr: 'C2', explanation: 'Technical/academic verb meaning combined into a total; used precisely here for collective impact.' },
      { word: 'acidification', cefr: 'C2', explanation: 'Scientific noun for the process of becoming more acidic; demonstrates domain-specific vocabulary.' },
      { word: 'unconscionable', cefr: 'C2', explanation: 'Means morally unacceptable to a degree that shocks the conscience; very high register.' },
      { word: 'offset', cefr: 'C1', explanation: 'To compensate for or balance out a negative effect; widely used in environmental discourse.' },
    ],
    highlightedStructures: [
      { phrase: 'Consumer choices signal market demand; reduced consumption of single-use plastics, for example, has already influenced corporate packaging decisions', label: 'Semicolon + concrete exemplification', explanation: 'Using a semicolon to connect two closely related independent clauses, then grounding the claim with a specific real-world example, is a Band 9 technique that combines structural sophistication with Task Achievement.' },
    ],
  },

  // ─── IELTS General · Task 2 ─────────────────────────────────────────────

  {
    id: 'ielts-gen-t2-agree-001',
    exam: 'IELTS General',
    task: 'Task 2',
    questionType: 'Agree / Disagree',
    targetWordCount: 260,
    tags: ['#Band_9', '#Work', '#Remote Work'],
    promptText:
      'Some people believe that working from home is beneficial for both employees and employers. To what extent do you agree or disagree?',
    sampleAnswer:
      'The shift towards remote working, accelerated dramatically by the global pandemic, has fundamentally altered expectations about where and how professional tasks are performed. I strongly agree that working from home offers significant benefits for both employees and their employers, though these advantages are not uniform across all industries or roles. For employees, the elimination of commuting is perhaps the most immediately impactful benefit. In major cities, the daily commute can consume two hours or more, representing both a financial cost and a source of significant stress. Remote working reclaims this time, enabling individuals to invest it in personal wellbeing, family responsibilities, or professional development. Furthermore, the autonomy to design one\'s own working environment has been shown in numerous studies to enhance both job satisfaction and cognitive performance. Employers, meanwhile, stand to gain considerably from reduced expenditure on office space and utilities, which can represent a substantial portion of operating costs for service-sector businesses. Remote working also broadens the potential talent pool, allowing companies to recruit from any geographic location rather than being limited to commutable distance from a physical office. Evidence from the post-pandemic period suggests that many organisations have maintained or improved productivity levels with distributed teams. That said, the benefits are less pronounced for roles requiring intensive collaboration or hands-on practical work, and for employees in cramped or noisy home environments. In conclusion, remote working represents a genuinely beneficial development for the majority of knowledge-sector workers and the organisations that employ them, provided that managers invest in appropriate digital infrastructure and communication practices.',
    scoringNotes:
      'IELTS General Task 2 uses the same Band Descriptors as Academic Task 2. This response earns Band 9 through its nuanced agreement (not absolute), sector-specific caveats, and concrete examples with evidential language.',
    highlightedVocab: [
      { word: 'autonomy', cefr: 'C1', explanation: 'The right or freedom to govern one\'s own actions; used here in a professional context.' },
      { word: 'distributed', cefr: 'C1', explanation: 'In a business context, refers to a workforce spread across multiple locations rather than centralised.' },
      { word: 'expenditure', cefr: 'C1', explanation: 'Formal noun for money spent; preferred over "spending" or "costs" in academic writing.' },
    ],
    highlightedStructures: [
      { phrase: 'though these advantages are not uniform across all industries or roles', label: 'Concessive qualifier', explanation: 'Adding a qualification to a strong stance with "though" immediately after stating it demonstrates the critical thinking that distinguishes Band 9 from Band 7 responses.' },
    ],
  },

  {
    id: 'ielts-gen-t2-advantages-001',
    exam: 'IELTS General',
    task: 'Task 2',
    questionType: 'Advantages & Disadvantages',
    targetWordCount: 260,
    tags: ['#Band_9', '#Travel', '#Tourism'],
    promptText:
      'International tourism has grown rapidly in recent decades. What are the advantages and disadvantages of this trend for the countries visited?',
    sampleAnswer:
      'The explosive growth of international tourism has transformed the economies and landscapes of countless destination countries. While the economic benefits of this trend are considerable, the environmental, cultural, and social costs are equally significant and deserve serious consideration. The most obvious advantage of mass tourism is its contribution to national income. Revenue from foreign visitors supports local businesses ranging from hotels and restaurants to artisan markets and guided tours. In many developing nations, tourism is among the largest sources of foreign currency and provides employment for substantial segments of the workforce. The sector also funds the conservation of natural and cultural heritage sites, which in turn attract further visitors. However, the disadvantages are also pronounced. Environmentally, high visitor numbers place severe strain on fragile ecosystems. Popular destinations such as Venice, the Maldives, and the Galápagos Islands have experienced habitat degradation, water scarcity, and pollution directly attributable to tourist activity. Culturally, the commercialisation of local traditions to meet tourist expectations can dilute their authenticity, transforming living cultural practices into performances for outsiders. Furthermore, the economic benefits of tourism are frequently unequally distributed, with profits often flowing to multinational hotel chains rather than local communities. In conclusion, international tourism brings genuine economic benefits to host nations but simultaneously exerts pressures that, if unmanaged, can cause irreversible harm. Sustainable tourism policies that limit visitor numbers, redirect revenue to local economies, and enforce environmental protections offer the most promising path to maximising benefits while mitigating the costs.',
    scoringNotes:
      'This response earns high marks by matching advantages and disadvantages in comparable depth, using real-world named examples (Venice, the Maldives), and concluding with a balanced policy recommendation that shows high-level synthesis.',
    highlightedVocab: [
      { word: 'attributable', cefr: 'C2', explanation: 'Formal adjective meaning able to be credited or assigned to a specific cause.' },
      { word: 'dilute', cefr: 'C1', explanation: 'Used metaphorically here: to weaken something by adding or mixing in something of lesser quality.' },
      { word: 'mitigating', cefr: 'C1', explanation: 'Formal verb meaning to reduce the severity of something; key policy-register vocabulary.' },
      { word: 'artisan', cefr: 'C1', explanation: 'Describes a worker who produces goods by hand using traditional methods.' },
    ],
    highlightedStructures: [
      { phrase: 'habitat degradation, water scarcity, and pollution directly attributable to tourist activity', label: 'Noun phrase with post-modifying participial phrase', explanation: 'Stacking multiple nouns with a shared post-modifying phrase is an efficient way to present several pieces of evidence without repeating sentence structures.' },
    ],
  },

  // ─── TOEFL iBT · Academic Discussion (Task 2) ───────────────────────────

  {
    id: 'toefl-t2-discussion-001',
    exam: 'TOEFL iBT',
    task: 'Academic Discussion',
    questionType: 'Academic Discussion',
    targetWordCount: 150,
    tags: ['#TOEFL_Max_Score', '#Technology', '#AI'],
    promptText:
      'Professor Chen asks: "Artificial intelligence is increasingly being used in hiring decisions. Some argue this reduces human bias, while others believe it can actually reinforce existing inequalities. What is your view on using AI in recruitment, and why?"',
    toeflStudentReplies: {
      professorQuestion: 'Artificial intelligence is increasingly being used in hiring decisions. Some argue this reduces human bias, while others believe it can actually reinforce existing inequalities. What is your view on using AI in recruitment, and why?',
      studentA: {
        name: 'Marcus',
        text: 'I think AI is generally a positive development for hiring because it removes the unconscious biases that affect human recruiters. When a person reviews a CV, factors like name, university, or even writing style can trigger unfair associations. AI evaluates objective criteria and applies them consistently to every applicant.',
      },
      studentB: {
        name: 'Priya',
        text: 'I respectfully disagree. AI systems are trained on historical data, and if that data reflects past discriminatory hiring practices, the algorithm will simply replicate those patterns at scale. A system trained on the CVs of previously successful hires will systematically disadvantage groups that were historically excluded from those roles.',
      },
    },
    sampleAnswer:
      'Both Marcus and Priya raise valid points, but I believe the truth lies in recognising that AI is a tool whose quality depends entirely on the data and oversight behind it. Priya\'s concern about training data is well-founded: an algorithm trained on historically biased outcomes will indeed perpetuate those biases at far greater scale than a single recruiter ever could. However, this is a problem of implementation, not of AI itself. If companies audit their training datasets for historical bias and apply fairness constraints to their models, AI can actually outperform human recruiters in consistency and objectivity. The key requirement is transparent, ongoing human oversight — neither uncritical automation nor outright rejection. I therefore advocate for a hybrid model in which AI screens for minimum qualifications while trained human reviewers make final decisions, with mandatory algorithmic audits conducted annually. This approach preserves the efficiency gains Marcus describes while addressing the structural risks Priya identifies.',
    scoringNotes:
      'A top-scoring TOEFL Academic Discussion response directly engages with both students\' points by name, takes a clear position, and develops a specific, nuanced argument. Simply restating the two positions without synthesis earns significantly lower scores.',
    highlightedVocab: [
      { word: 'perpetuate', cefr: 'C1', explanation: 'To make something continue indefinitely; used here in its causal/systemic sense.' },
      { word: 'algorithmic', cefr: 'C2', explanation: 'Adjective relating to algorithms; demonstrates domain-specific academic vocabulary.' },
      { word: 'transparent', cefr: 'C1', explanation: 'Open to scrutiny; in governance and technology contexts, means clearly explained and auditable.' },
    ],
    highlightedStructures: [
      { phrase: 'this is a problem of implementation, not of AI itself', label: 'Corrective distinction', explanation: 'Making a sharp conceptual distinction ("a problem of X, not Y") is a high-scoring rhetorical move that shows analytical precision.' },
      { phrase: 'I therefore advocate for a hybrid model in which AI screens … while trained human reviewers make final decisions', label: 'Policy proposal with embedded relative clause', explanation: 'Proposing a specific solution with clear conditions embedded in the sentence demonstrates the integrated reasoning TOEFL awards at the highest score level.' },
    ],
  },

  {
    id: 'toefl-t2-discussion-002',
    exam: 'TOEFL iBT',
    task: 'Academic Discussion',
    questionType: 'Academic Discussion',
    targetWordCount: 150,
    tags: ['#TOEFL_Max_Score', '#Education', '#Online Learning'],
    promptText:
      'Professor Williams asks: "Online education has expanded access to learning worldwide. However, some educators argue that it cannot fully replace in-person instruction. Do you think online education is as effective as traditional classroom learning? Why or why not?"',
    toeflStudentReplies: {
      professorQuestion: 'Online education has expanded access to learning worldwide. However, some educators argue that it cannot fully replace in-person instruction. Do you think online education is as effective as traditional classroom learning? Why or why not?',
      studentA: {
        name: 'Jordan',
        text: 'Online education is clearly more effective in many respects because it gives students the flexibility to learn at their own pace and access materials from world-class institutions regardless of their location. For working adults and students in remote areas, it removes barriers that would otherwise make higher education impossible.',
      },
      studentB: {
        name: 'Sofia',
        text: 'I think in-person learning is still superior for most students. The social dimension of education — discussions, group projects, mentoring relationships with professors — is very difficult to replicate online. Research shows that many students, especially younger ones, struggle with motivation and engagement in purely online environments.',
      },
    },
    sampleAnswer:
      'Jordan and Sofia each identify real strengths of their preferred mode, but the debate itself may rest on a false equivalence. Effectiveness in education is not a single variable — it depends on the subject, the student\'s learning style, and the quality of instruction. For skills requiring hands-on practice, such as laboratory science or surgical training, in-person instruction remains irreplaceable. For conceptual knowledge transfer, however, studies consistently show that well-designed online courses can match or exceed traditional classroom outcomes. Sofia\'s point about motivation is important, and I would add that this is where hybrid models demonstrate the greatest promise. Institutions that blend asynchronous online content with scheduled live sessions and small-group tutorials capture the accessibility advantages Jordan describes while preserving the social accountability that sustains engagement. Rather than declaring one mode superior, universities should adopt evidence-based blended designs tailored to specific disciplines and student populations.',
    scoringNotes:
      'This response earns top marks by challenging the framing of the question, engaging both students substantively, and proposing a disciplined, evidence-grounded solution rather than simply picking a side.',
    highlightedVocab: [
      { word: 'equivalence', cefr: 'C2', explanation: 'The state of being equal in value or effect; "false equivalence" is an academic phrase for a misleading comparison.' },
      { word: 'asynchronous', cefr: 'C2', explanation: 'In education technology, refers to content that students access at different times rather than all at once.' },
      { word: 'accountability', cefr: 'C1', explanation: 'The state of being responsible and answerable for one\'s actions; used here in its motivational sense.' },
    ],
    highlightedStructures: [
      { phrase: 'the debate itself may rest on a false equivalence', label: 'Framing challenge', explanation: 'Questioning the premise of a question rather than accepting it is a sophisticated rhetorical strategy that signals high-level critical thinking to TOEFL raters.' },
    ],
  },

  // ─── TOEFL iBT · Integrated (Task 1 — text-only stubs) ─────────────────

  {
    id: 'toefl-t1-integrated-001',
    exam: 'TOEFL iBT',
    task: 'Integrated',
    questionType: 'Integrated Reading-Lecture',
    targetWordCount: 190,
    tags: ['#TOEFL_Max_Score', '#Science', '#Palaeontology'],
    promptText:
      'Read the passage about the extinction of the megafauna. Then listen to the lecture (transcript provided below). Summarise the points made in the lecture and explain how they cast doubt on the arguments made in the reading passage.',
    toeflReadingPassage:
      'Large animal species — commonly called megafauna — disappeared from every continent except Africa in rapid succession between roughly 50,000 and 10,000 years ago. Many palaeontologists argue that climate change was the primary driver of these extinctions. They point to evidence of significant glacial cooling during this period, which transformed grassland ecosystems into tundra unsuitable for the large herbivores that depended on them. Additionally, computer models of past climates suggest that the thermal stress experienced by megafauna during glacial maxima would have been sufficient to cause population collapses independent of any human activity.',
    sampleAnswer:
      'The reading passage contends that climate change, specifically glacial cooling and ecosystem transformation, was the main cause of megafauna extinction. However, the lecture systematically challenges each of these points using archaeological and fossil evidence. First, while the reading attributes megafauna collapse to glacial cooling, the professor points out that large animals had survived numerous comparable glacial periods over the previous two million years without mass extinction. This pattern, the lecturer argues, undermines the claim that climate alone was sufficient to cause such widespread die-offs. Second, the lecture challenges the reading\'s reliance on climate models by noting that fossil evidence from Africa — the one continent where megafauna largely survived — correlates with areas of lower early human population density rather than areas of different climate. This geographic pattern suggests that human hunting pressure, rather than temperature, was the decisive variable. Finally, the professor highlights the temporal correlation between the arrival of human populations in Australia, the Americas, and Eurasia and the subsequent local megafauna collapses, an association that the climate hypothesis cannot adequately account for.',
    scoringNotes:
      'TOEFL Integrated responses must summarise the lecture\'s points and explicitly link each to the corresponding reading claim they challenge. Responses that only summarise the reading score significantly lower. The word "however" and phrases like "the professor points out" are essential signposting tools.',
    highlightedVocab: [
      { word: 'contends', cefr: 'C1', explanation: 'Formal reporting verb meaning to assert or maintain as a position; used to introduce the reading\'s claim.' },
      { word: 'undermines', cefr: 'C1', explanation: 'To weaken or damage the foundation of an argument; key word in academic counterargument.' },
      { word: 'correlates', cefr: 'C1', explanation: 'To have a statistical or logical relationship with; precise scientific vocabulary.' },
      { word: 'temporal', cefr: 'C1', explanation: 'Relating to time; "temporal correlation" means a pattern in timing rather than space.' },
    ],
    highlightedStructures: [
      { phrase: 'The reading passage contends that … However, the lecture systematically challenges each of these points', label: 'Contrast frame (reading vs. lecture)', explanation: 'Opening with the reading\'s claim and immediately countering with "However, the lecture" sets up the contrastive structure required for full marks on Integrated tasks.' },
      { phrase: 'an association that the climate hypothesis cannot adequately account for', label: 'Post-modifying relative clause with negative capability', explanation: 'Ending a sentence by noting what the opposing theory cannot explain is a powerful rhetorical device that demonstrates synthesis across sources.' },
    ],
  },

  {
    id: 'toefl-t1-integrated-002',
    exam: 'TOEFL iBT',
    task: 'Integrated',
    questionType: 'Integrated Reading-Lecture',
    targetWordCount: 190,
    tags: ['#TOEFL_Max_Score', '#Economics', '#Business'],
    promptText:
      'Read the passage about the benefits of a four-day working week. Then read the lecture summary below. Summarise the points made in the lecture and explain how they cast doubt on the arguments made in the reading passage.',
    toeflReadingPassage:
      'A growing number of economists and business leaders are advocating for a four-day working week as a means of improving employee wellbeing without sacrificing productivity. Several pilot programmes conducted in Iceland and the United Kingdom found that output remained stable or improved when workers shifted from a five-day to a four-day schedule, while rates of stress, sick leave, and employee turnover declined significantly. Proponents argue that compressed schedules force workers to eliminate inefficiencies, focus on high-priority tasks, and achieve more in less time, ultimately benefiting both workers and employers.',
    sampleAnswer:
      'The reading passage presents a favourable case for the four-day working week, citing pilot studies from Iceland and the UK to support claims about maintained productivity and improved wellbeing. The lecture, however, raises several important objections that complicate this optimistic picture. To begin with, the professor questions the generalisability of the pilot results, noting that the UK and Icelandic programmes predominantly included knowledge workers in professional services — a sector where output is inherently flexible. The same compressed schedule, the lecturer argues, is not transferable to industries such as manufacturing, healthcare, or retail, where continuous coverage and physical presence are operationally required. Furthermore, the lecture challenges the claim that eliminating inefficiencies drives productivity gains, suggesting instead that the improvements observed in pilots may reflect a novelty effect: workers performed better because the programme was new and motivating, not because the structure itself is inherently superior. Over time, the lecturer implies, these gains may erode as the compressed week becomes routine. Finally, the professor highlights methodological limitations in the studies cited, noting that they relied heavily on self-reported wellbeing data, which is susceptible to social desirability bias.',
    scoringNotes:
      'Top-scoring Integrated responses address every major counterpoint from the lecture in the correct contrastive frame. This response earns full marks by covering all three lecture points, correctly attributing each to the professor, and explicitly linking each to the reading argument it challenges.',
    highlightedVocab: [
      { word: 'generalisability', cefr: 'C2', explanation: 'The degree to which research findings can be applied to other contexts; key research methodology term.' },
      { word: 'susceptible', cefr: 'C1', explanation: 'Likely to be influenced or affected by something; used here in a research methods context.' },
      { word: 'inherently', cefr: 'C1', explanation: 'As a fundamental or essential quality; distinguishes structural features from incidental ones.' },
    ],
    highlightedStructures: [
      { phrase: 'workers performed better because the programme was new and motivating, not because the structure itself is inherently superior', label: 'Biclausal causal contrast', explanation: 'The "because X, not because Y" pattern is a precise way to isolate the correct causal explanation and reject an alternative; it signals strong analytical reasoning.' },
    ],
  },

];
