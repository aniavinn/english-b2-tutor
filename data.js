// B2 English curriculum: grammar lessons with explanations and exercises.
// Exercise types: "mc" (multiple choice) and "fill" (typed answer, checked against `answers` array).

const LESSONS = [
  {
    id: "present-perfect-vs-past",
    title: "Present Perfect vs. Past Simple",
    summary: "Connecting past to present vs. finished past actions",
    explanation: `
      <p><strong>Present Perfect</strong> (have/has + past participle) links the past to the present —
      unspecified time, results that matter now, or actions continuing up to now.</p>
      <p><strong>Past Simple</strong> is used for finished actions at a specific, stated past time.</p>
      <div class="table-scroll"><table>
        <tr><th>Present Perfect</th><th>Past Simple</th></tr>
        <tr><td>already, just, yet, ever, never</td><td>yesterday, last week, in 2010, ago</td></tr>
        <tr><td>since, for (+ unfinished period)</td><td>a specific finished moment</td></tr>
        <tr><td>I have visited Rome. (at some point)</td><td>I visited Rome in 2019.</td></tr>
      </table></div>
      <p>Example: <em>I <strong>have lived</strong> here for 5 years</em> (still true) vs.
      <em>I <strong>lived</strong> in Paris in 2015</em> (finished).</p>
    `,
    exercises: [
      { type: "fill", q: "I have already ___ (finish) my homework.", answers: ["finished"] },
      { type: "fill", q: "She ___ (visit) Paris last year.", answers: ["visited"] },
      { type: "mc", q: "___ you ever been to Japan?", options: ["Did", "Have", "Was"], answer: "Have" },
      { type: "fill", q: "We ___ (not / see) him since Monday.", answers: ["haven't seen", "have not seen"] },
      { type: "mc", q: "I saw that film ___.", options: ["yesterday", "already", "just"], answer: "yesterday" },
      { type: "fill", q: "They ___ (live) in Berlin for five years now.", answers: ["have lived"] },
      { type: "mc", q: "He ___ his car last week.", options: ["has sold", "sold", "sells"], answer: "sold" },
      { type: "fill", q: "___ (you / finish) the report yet?", answers: ["have you finished"] },
      { type: "mc", q: "I ___ him yesterday at the station.", options: ["have seen", "saw", "see"], answer: "saw" },
      { type: "fill", q: "She has just ___ (arrive).", answers: ["arrived"] },
      { type: "mc", q: "We ___ that restaurant twice this month.", options: ["visited", "have visited", "visit"], answer: "have visited" },
      { type: "fill", q: "In 2015, I ___ (move) to London.", answers: ["moved"] },
      { type: "mc", q: "I haven't seen her ___ two days.", options: ["for", "since", "ago"], answer: "for" },
      { type: "fill", q: "He ___ (work) here since 2019.", answers: ["has worked"] }
    ]
  },
  {
    id: "conditionals",
    title: "Conditionals",
    summary: "Zero, First, Second, and Third conditional",
    explanation: `
      <div class="table-scroll"><table>
        <tr><th>Type</th><th>Form</th><th>Use</th></tr>
        <tr><td>Zero</td><td>If + present, present</td><td>General truths / facts</td></tr>
        <tr><td>First</td><td>If + present, will + base</td><td>Real future possibility</td></tr>
        <tr><td>Second</td><td>If + past simple, would + base</td><td>Unreal/hypothetical present</td></tr>
        <tr><td>Third</td><td>If + past perfect, would have + V3</td><td>Unreal past (can't change it)</td></tr>
      </table></div>
      <p>Note: in Second Conditional, "were" is used for all persons with "be": <em>If I were you...</em></p>
      <p>Examples: <em>If you heat ice, it melts.</em> · <em>If it rains, I'll stay home.</em> ·
      <em>If I were rich, I would travel.</em> · <em>If I had known, I would have called.</em></p>
    `,
    exercises: [
      { type: "fill", q: "If you heat ice, it ___ (melt).", answers: ["melts"] },
      { type: "fill", q: "If it rains tomorrow, we ___ (stay) at home.", answers: ["will stay"] },
      { type: "fill", q: "If I ___ (be) you, I would apologize.", answers: ["were"] },
      { type: "fill", q: "If she had studied harder, she ___ (pass) the exam.", answers: ["would have passed"] },
      { type: "mc", q: "If I win the lottery, I ___ a house.", options: ["buy", "will buy", "would buy"], answer: "will buy" },
      { type: "mc", q: "If I were rich, I ___ travel the world.", options: ["will", "would", "would have"], answer: "would" },
      { type: "fill", q: "If you don't water plants, they ___ (die).", answers: ["die"] },
      { type: "fill", q: "If we had left earlier, we ___ (not / miss) the train.", answers: ["wouldn't have missed", "would not have missed"] },
      { type: "mc", q: "What would you do if you ___ a ghost?", options: ["see", "saw", "had seen"], answer: "saw" },
      { type: "fill", q: "If he ___ (not / be) so lazy, he would have a better job.", answers: ["weren't", "wasn't", "were not", "was not"] },
      { type: "mc", q: "Water boils if you ___ it to 100°C.", options: ["heat", "will heat", "heated"], answer: "heat" },
      { type: "fill", q: "I would have called you if I ___ (know) your number.", answers: ["had known"] },
      { type: "mc", q: "If she calls, I ___ tell her the news.", options: ["would", "will", "had"], answer: "will" },
      { type: "fill", q: "If I ___ (have) more time, I would learn another language.", answers: ["had"] }
    ]
  },
  {
    id: "passive-voice",
    title: "Passive Voice",
    summary: "be + past participle, across all main tenses",
    explanation: `
      <p>Use the passive when the action or the receiver of the action is more important than who did it,
      or when the doer is unknown/unimportant.</p>
      <div class="table-scroll"><table>
        <tr><th>Tense</th><th>Passive form</th><th>Example</th></tr>
        <tr><td>Present Simple</td><td>am/is/are + V3</td><td>English is spoken here.</td></tr>
        <tr><td>Past Simple</td><td>was/were + V3</td><td>The letter was written yesterday.</td></tr>
        <tr><td>Present Continuous</td><td>am/is/are being + V3</td><td>The car is being repaired.</td></tr>
        <tr><td>Present Perfect</td><td>has/have been + V3</td><td>The email has been sent.</td></tr>
        <tr><td>Future</td><td>will be + V3</td><td>The results will be announced.</td></tr>
      </table></div>
    `,
    exercises: [
      { type: "fill", q: "The letter ___ (write) by John.", answers: ["was written"] },
      { type: "fill", q: "This building ___ (build) in 1990.", answers: ["was built"] },
      { type: "mc", q: "English ___ all over the world.", options: ["speaks", "is spoken", "spoke"], answer: "is spoken" },
      { type: "fill", q: "The car ___ (repair) right now.", answers: ["is being repaired"] },
      { type: "mc", q: "The documents ___ by tomorrow.", options: ["will send", "will be sent", "are sent"], answer: "will be sent" },
      { type: "fill", q: "My wallet ___ (steal) yesterday.", answers: ["was stolen"] },
      { type: "mc", q: "A new bridge ___ next year.", options: ["will build", "will be built", "builds"], answer: "will be built" },
      { type: "fill", q: "The homework must ___ (finish) by Friday.", answers: ["be finished"] },
      { type: "mc", q: "The cake ___ by my mother.", options: ["made", "was made", "is make"], answer: "was made" },
      { type: "fill", q: "The results ___ (announce) tomorrow.", answers: ["will be announced"] },
      { type: "mc", q: "This song ___ by a famous singer.", options: ["sang", "was sung", "sings"], answer: "was sung" },
      { type: "fill", q: "The room ___ (clean) every day.", answers: ["is cleaned"] },
      { type: "mc", q: "The email ___ already.", options: ["has sent", "has been sent", "sent"], answer: "has been sent" },
      { type: "fill", q: "The window ___ (break) by the storm.", answers: ["was broken"] }
    ]
  },
  {
    id: "reported-speech",
    title: "Reported Speech",
    summary: "Backshifting tenses and pronouns when reporting what someone said",
    explanation: `
      <p>When reporting speech in the past, tenses usually shift "one step back":</p>
      <div class="table-scroll"><table>
        <tr><th>Direct speech</th><th>Reported speech</th></tr>
        <tr><td>Present Simple</td><td>Past Simple</td></tr>
        <tr><td>Present Continuous</td><td>Past Continuous</td></tr>
        <tr><td>Past Simple</td><td>Past Perfect</td></tr>
        <tr><td>will</td><td>would</td></tr>
        <tr><td>can</td><td>could</td></tr>
        <tr><td>must</td><td>had to</td></tr>
      </table></div>
      <p>Questions become statements (no inversion), using <em>if/whether</em> for yes/no questions:
      "Are you coming?" &rarr; She asked if I <strong>was</strong> coming.</p>
    `,
    exercises: [
      { type: "fill", q: '"I am tired," she said. → She said (that) she ___ tired.', answers: ["was"] },
      { type: "fill", q: '"I will call you," he said. → He said he ___ call me.', answers: ["would"] },
      { type: "mc", q: '"I can swim," she said. → She said she ___ swim.', options: ["can", "could", "will"], answer: "could" },
      { type: "fill", q: '"I have finished," he said. → He said he ___ finished.', answers: ["had"] },
      { type: "mc", q: '"I saw him yesterday," she said. → She said she ___ him the day before.', options: ["saw", "had seen", "sees"], answer: "had seen" },
      { type: "fill", q: '"Are you coming?" he asked. → He asked if I ___ coming.', answers: ["was"] },
      { type: "mc", q: '"Where do you live?" she asked. → She asked where I ___.', options: ["live", "lived", "was living"], answer: "lived" },
      { type: "fill", q: '"Don\'t be late," she told me. → She told me not ___ (be) late.', answers: ["to be"] },
      { type: "mc", q: '"I\'m going to the shop," he said. → He said he ___ going to the shop.', options: ["was", "is", "would"], answer: "was" },
      { type: "fill", q: '"I bought a car," she said. → She said she ___ (buy) a car.', answers: ["had bought"] },
      { type: "mc", q: '"Can you help me?" she asked. → She asked if I ___ help her.', options: ["can", "could", "would"], answer: "could" },
      { type: "fill", q: '"We must leave now," they said. → They said they ___ leave then.', answers: ["had to"] },
      { type: "fill", q: '"I like it," she said. → She said she ___ it.', answers: ["liked"] },
      { type: "mc", q: '"I\'ll see you tomorrow," he said. → He said he would see me the ___ day.', options: ["following", "tomorrow", "yesterday"], answer: "following" }
    ]
  },
  {
    id: "relative-clauses",
    title: "Relative Clauses",
    summary: "who, which, that, whose, where, when",
    explanation: `
      <div class="table-scroll"><table>
        <tr><th>Pronoun</th><th>Refers to</th><th>Example</th></tr>
        <tr><td>who</td><td>people</td><td>the man who called</td></tr>
        <tr><td>which</td><td>things</td><td>the book which I read</td></tr>
        <tr><td>that</td><td>people or things (defining only)</td><td>the car that I bought</td></tr>
        <tr><td>whose</td><td>possession</td><td>the woman whose car was stolen</td></tr>
        <tr><td>where</td><td>places</td><td>the house where I grew up</td></tr>
        <tr><td>when</td><td>time</td><td>the day when we met</td></tr>
      </table></div>
      <p>Defining clauses (no commas) identify which one you mean; non-defining clauses (with commas)
      just add extra info and can't use "that": <em>My brother, who lives in Spain, is visiting.</em></p>
    `,
    exercises: [
      { type: "fill", q: "The man ___ lives next door is a doctor.", answers: ["who", "that"] },
      { type: "fill", q: "The book ___ I read was boring.", answers: ["that", "which"] },
      { type: "mc", q: "This is the house ___ I grew up.", options: ["where", "which", "who"], answer: "where" },
      { type: "fill", q: "She's the woman ___ car was stolen.", answers: ["whose"] },
      { type: "mc", q: "2020, ___ was a difficult year, is finally over.", options: ["that", "which", "who"], answer: "which" },
      { type: "fill", q: "The day ___ we met was rainy.", answers: ["when"] },
      { type: "mc", q: "My brother, ___ lives in Spain, is visiting us.", options: ["that", "who", "which"], answer: "who" },
      { type: "fill", q: "I don't like people ___ are rude.", answers: ["who", "that"] },
      { type: "mc", q: "The restaurant ___ we ate was excellent.", options: ["where", "which", "who"], answer: "where" },
      { type: "fill", q: "This is the man ___ helped me yesterday.", answers: ["who", "that"] },
      { type: "mc", q: "That's the reason ___ I called you.", options: ["why", "where", "who"], answer: "why" },
      { type: "fill", q: "The laptop ___ I bought last week is already broken.", answers: ["that", "which"] },
      { type: "mc", q: "My sister, ___ job is very stressful, needs a holiday.", options: ["who", "whose", "which"], answer: "whose" },
      { type: "fill", q: "Is this the film ___ won the award?", answers: ["that", "which"] }
    ]
  },
  {
    id: "modals-deduction",
    title: "Modals of Deduction",
    summary: "must / might / could / can't for logical certainty",
    explanation: `
      <div class="table-scroll"><table>
        <tr><th>Certainty</th><th>Present</th><th>Past</th></tr>
        <tr><td>Very sure (positive)</td><td>must + base</td><td>must have + V3</td></tr>
        <tr><td>Possible</td><td>might/may/could + base</td><td>might/may/could have + V3</td></tr>
        <tr><td>Very sure (negative)</td><td>can't + base</td><td>can't have + V3</td></tr>
      </table></div>
      <p>Example: <em>He's not answering — he <strong>must be</strong> asleep.</em>
      <em>She's not here — she <strong>must have left</strong> already.</em></p>
    `,
    exercises: [
      { type: "mc", q: "He's not answering; he ___ be asleep.", options: ["must", "mustn't", "can't"], answer: "must" },
      { type: "fill", q: "She ___ (must) be tired after that long flight.", answers: ["must"] },
      { type: "mc", q: "This ___ be true — I saw it myself!", options: ["might", "must", "can't"], answer: "must" },
      { type: "fill", q: "They ___ (can't) be home; the lights are off.", answers: ["can't"] },
      { type: "mc", q: "He might have ___ (forget) the meeting.", options: ["forget", "forgot", "forgotten"], answer: "forgotten" },
      { type: "fill", q: "She's not here — she ___ (must / leave) already.", answers: ["must have left"] },
      { type: "mc", q: "He ___ have taken the wrong train — that's why he's late.", options: ["might", "mustn't", "can't"], answer: "might" },
      { type: "fill", q: "That ___ (can't) be right — the shop closed an hour ago.", answers: ["can't"] },
      { type: "mc", q: "She ___ know the answer — she studied all night.", options: ["might", "must", "can't"], answer: "must" },
      { type: "fill", q: "He ___ (could) be at work, or he could be at home.", answers: ["could"] },
      { type: "mc", q: "They can't ___ yet — the flight isn't due for an hour.", options: ["arrive", "have arrived", "arrived"], answer: "have arrived" },
      { type: "fill", q: "I'm not sure, but she ___ (might) be at the gym.", answers: ["might"] },
      { type: "mc", q: "You ___ be joking!", options: ["must", "can't", "might"], answer: "must" },
      { type: "fill", q: "He ___ (must / study) hard because he got a great score.", answers: ["must have studied"] }
    ]
  },
  {
    id: "gerunds-infinitives",
    title: "Gerunds vs. Infinitives",
    summary: "verb + -ing vs. verb + to-infinitive patterns",
    explanation: `
      <p>Some verbs are followed by a <strong>gerund</strong> (-ing), some by a <strong>to-infinitive</strong>,
      and some can take either with a change in meaning.</p>
      <div class="table-scroll"><table>
        <tr><th>+ gerund</th><th>+ to-infinitive</th></tr>
        <tr><td>enjoy, avoid, finish, mind, suggest, practice, admit, can't stand</td><td>want, decide, hope, promise, plan, would like, afford</td></tr>
      </table></div>
      <p>Example: <em>I enjoy <strong>reading</strong>.</em> vs. <em>I want <strong>to read</strong>.</em></p>
    `,
    exercises: [
      { type: "fill", q: "I enjoy ___ (read) books.", answers: ["reading"] },
      { type: "fill", q: "She wants ___ (learn) French.", answers: ["to learn"] },
      { type: "mc", q: "We decided ___ home early.", options: ["going", "to go", "go"], answer: "to go" },
      { type: "fill", q: "He avoids ___ (eat) fast food.", answers: ["eating"] },
      { type: "mc", q: "They finished ___ dinner.", options: ["to eat", "eating", "eat"], answer: "eating" },
      { type: "fill", q: "I would like ___ (visit) Japan someday.", answers: ["to visit"] },
      { type: "mc", q: "She suggested ___ a movie.", options: ["to watch", "watching", "watch"], answer: "watching" },
      { type: "fill", q: "He can't stand ___ (wait) in line.", answers: ["waiting"] },
      { type: "mc", q: "I hope ___ you soon.", options: ["seeing", "to see", "see"], answer: "to see" },
      { type: "fill", q: "They practice ___ (speak) English every day.", answers: ["speaking"] },
      { type: "mc", q: "She promised ___ on time.", options: ["arriving", "to arrive", "arrive"], answer: "to arrive" },
      { type: "fill", q: "I don't mind ___ (help) you.", answers: ["helping"] },
      { type: "mc", q: "We plan ___ next summer.", options: ["travelling", "to travel", "travel"], answer: "to travel" },
      { type: "fill", q: "He admitted ___ (break) the window.", answers: ["breaking"] }
    ]
  },
  {
    id: "used-to-would",
    title: "Used to / Would",
    summary: "Talking about past habits and states",
    explanation: `
      <p><strong>used to + base</strong> describes past habits or states that are no longer true.</p>
      <p><strong>would + base</strong> also describes repeated past actions, but <em>not states</em> —
      you can't say "would be tall" or "would like".</p>
      <p>Negative/question form uses "use to" (no -d): <em>Did you use to...? / I didn't use to...</em></p>
      <ul>
        <li>I <strong>used to</strong> play football every weekend. (habit &mdash; OK with would too)</li>
        <li>This town <strong>used to</strong> be quiet. (state &mdash; would is wrong here)</li>
      </ul>
    `,
    exercises: [
      { type: "fill", q: "I ___ (used to) play football every weekend as a kid.", answers: ["used to"] },
      { type: "mc", q: "She ___ live in Paris, but now she lives in Rome.", options: ["used to", "would", "uses to"], answer: "used to" },
      { type: "fill", q: "We ___ (not / use to) like vegetables when we were young.", answers: ["didn't use to", "did not use to"] },
      { type: "mc", q: "Every summer, we ___ visit my grandparents.", options: ["would", "use to", "using to"], answer: "would" },
      { type: "fill", q: "Did you ___ (use to) live here?", answers: ["use to"] },
      { type: "mc", q: "He ___ have long hair, but he cut it.", options: ["would", "used to", "uses to"], answer: "used to" },
      { type: "fill", q: "They ___ (used to) be best friends.", answers: ["used to"] },
      { type: "mc", q: "As a child, I ___ climb trees for fun.", options: ["would", "use to", "using to"], answer: "would" },
      { type: "fill", q: "She didn't ___ (use to) drink coffee.", answers: ["use to"] },
      { type: "mc", q: "This town ___ be quiet, but now it's busy.", options: ["would", "used to", "use to"], answer: "used to" },
      { type: "fill", q: "We ___ (used to) go to the beach every Sunday.", answers: ["used to"] },
      { type: "mc", q: "I ___ believe in ghosts, but not anymore.", options: ["would", "used to", "use to"], answer: "used to" }
    ]
  },
  {
    id: "phrasal-verbs",
    title: "Phrasal Verbs",
    summary: "Common B2 phrasal verbs and their meanings",
    explanation: `
      <div class="table-scroll"><table>
        <tr><th>Phrasal verb</th><th>Meaning</th></tr>
        <tr><td>give up</td><td>stop trying / quit a habit</td></tr>
        <tr><td>look after</td><td>take care of</td></tr>
        <tr><td>run into</td><td>meet by chance</td></tr>
        <tr><td>come across</td><td>find by chance</td></tr>
        <tr><td>put off</td><td>postpone</td></tr>
        <tr><td>turn down</td><td>reject/refuse</td></tr>
        <tr><td>get along (with)</td><td>have a good relationship</td></tr>
        <tr><td>look forward to</td><td>anticipate happily</td></tr>
        <tr><td>figure out</td><td>understand/solve</td></tr>
        <tr><td>carry on</td><td>continue</td></tr>
        <tr><td>break down</td><td>stop working (machine) / lose control (emotion)</td></tr>
        <tr><td>take after</td><td>resemble (family)</td></tr>
        <tr><td>come up with</td><td>think of/produce (an idea)</td></tr>
        <tr><td>put up with</td><td>tolerate</td></tr>
      </table></div>
    `,
    exercises: [
      { type: "fill", q: "I need to ___ (give up) smoking.", answers: ["give up"] },
      { type: "mc", q: "Can you ___ my dog while I'm away?", options: ["look after", "look for", "look up"], answer: "look after" },
      { type: "fill", q: "I ___ (run into) an old friend at the mall.", answers: ["ran into"] },
      { type: "mc", q: "I ___ your keys on the table.", options: ["came across", "came up", "came over"], answer: "came across" },
      { type: "fill", q: "Let's not ___ (put off) the meeting again.", answers: ["put off"] },
      { type: "mc", q: "She ___ the job offer because the salary was too low.", options: ["turned down", "turned up", "turned off"], answer: "turned down" },
      { type: "fill", q: "I ___ (get along) well with my colleagues.", answers: ["get along"] },
      { type: "mc", q: "I'm really ___ the weekend.", options: ["looking forward to", "looking after", "looking for"], answer: "looking forward to" },
      { type: "fill", q: "It took me a while to ___ (figure out) the answer.", answers: ["figure out"] },
      { type: "mc", q: "Please ___ with your work while I'm gone.", options: ["carry on", "carry out", "carry over"], answer: "carry on" },
      { type: "fill", q: "My car ___ (break down) on the highway.", answers: ["broke down"] },
      { type: "mc", q: "He really ___ his father in personality.", options: ["takes after", "takes on", "takes over"], answer: "takes after" },
      { type: "fill", q: "We need to ___ (come up with) a new plan.", answers: ["come up with"] },
      { type: "mc", q: "I can't ___ this noise anymore.", options: ["put up with", "put off", "put down"], answer: "put up with" }
    ]
  }
];
