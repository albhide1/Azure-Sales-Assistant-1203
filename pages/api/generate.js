import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const basePromptPrefix =
`
Write me notes for an upcoming call l have. These notes should include 5 key talking points for the Microsoft Azure product and the customer mentioned below. Put these five talking points in a section with the header “Key Talking Points”. These talking points should be specifically for the type of Microsoft Azure product I am selling, not for Microsoft Azure as a whole. For example, if I specify that I am selling Microsoft Synapse, my talking points should be based around Microsoft Synapse. 

Base your language on the customer’s role at the company and how technical you understand the customer is. For example, if the customer holds a technical role at the company they are working at (CTO, CIO, etc), use more technical and specific language. In this scenario, specifically to the technology our Microsoft Azure product uses and how that technology is applicable to the customer’s oraganization. Alternatively, if the customer works a role in business development, use more general and broad language; still mention all relevant information, just with less technical language. In these five talking points, incorporate specific references to the company that the customer is working for, but do not make that the entire point of the talking points.

Additionally, provide 5 specific use-cases and examples for whichever company the customer is working in. All of this information should be specific to the company at hand, reference the company name in each point of your response. Avoid general insights that can be applicable at any company. For example, if I am selling Microsoft Synapse to Starbucks, discuss the reduce of waste for cups/plastic, analyzing customer sentiment for components like drink-quality, and targetted campaigns through the Starbucks app. Alternatively, if I am selling Microsoft Synapse to the Bechtel Corporation, discuss how we can improve the efficiency of their projects, data management, and on-ground operations. Put this information in a separate section of your response with the header “Specific Use Cases for (INPUT COMPANY NAME HERE)”. 

Base your response on the following inputs. Do not base your response on a random product, name of customer, role at company, or company of customer:

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

