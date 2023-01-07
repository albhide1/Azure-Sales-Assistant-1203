import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const basePromptPrefix =
`
Please advise me whether I should go to the doctor based on the following specifications. Start your response with "Yes, you should see a doctor" or "No, you probably do not need to see a doctor. If the specifications below are mild, not serious, or not-threatening, advise not to go to the doctor. Include a small medical diagnosis and specifically name two possible associated diseases/ailments. Also include what the patient should do about their ailment. Mention which symptoms are associated with the ailment you diagnose. If you recommend that the patient see a doctor, specify which type of doctor.

Symptoms:  Weak, Tired
Duration: 1 Day
Age: 18
Weight: 180
Additional information: I have been on the Keto diet for the last day.
Should I go to the doctor: No, you probably do not need to see a doctor. There are many possible causes for feeling weak and tired, including your recent switch to the Keto diet. We advise you to get sleep and persevere through this tough time. However, if the symptoms persist, or you experience swelling or trouble breathing, we do recommend that you see a general care doctor.

Symptoms: Inflammation, Cough, Weight Loss, Chills, Fever
Duration: 1 Week
Age: 60
Weight: 250
Additional information: I recently went swimming in a lake.
Should I go to the doctor: Yes, you should see a doctor. You may have Tuberculosis (TB) based on your inflammation and cough. TB is a bacterial infection caused by Mycobacterium tuberculosis. It is a serious and potentially life-threatening illness that can affect the lungs and other parts of the body. See a doctor immediately, preferably a pulmonologist or lung specialist.

Symptoms: Itch, Redness
Duration: 1 Day
Age: 16
Weight: 140
Additional information: I ran in the grass outside.
Should I go to the doctor:   No, you probably do not need to see a doctor. This is most likely an allergic reaction due to the grass you ran in. Try to take an antihistamine, soothing lotion, and an ice pack to reduce the discomfort and itchiness. If the symptoms persist, or you experience swelling or trouble breathing, it’s best to see your doctor, preferably a dermatologist.

Should I go to the doctor:
`;
const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}\n`,
    temperature: 0.7,
    max_tokens: 250,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;

