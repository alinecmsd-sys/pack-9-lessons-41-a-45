
import { Lesson } from './types';

export const LESSONS: Lesson[] = [
  {
    id: 41,
    title: "Lesson 41",
    subtitle: "Be used to / Be supposed to",
    vocabulary: [
      { english: "to intend", past: "intended", portuguese: "pretender" },
      { english: "to pretend", past: "pretended", portuguese: "fingir" },
      { english: "to hitchhike", portuguese: "pedir carona" },
      { english: "give a ride", portuguese: "dar carona" },
      { english: "ambitious", portuguese: "ambicioso" },
      { english: "dead end", portuguese: "beco sem saída" },
      { english: "to make a deal", portuguese: "fazer um acordo" },
      { english: "discount", portuguese: "desconto" },
      { english: "to hurt", portuguese: "machucar / doer" },
    ],
    phrases: [
      { english: "I’m used to hitchhiking when I travel.", portuguese: "Estou acostumado a pedir carona quando viajo." },
      { english: "She is used to giving people a ride.", portuguese: "Ela está acostumada a dar carona às pessoas." },
      { english: "He is used to making deals at work.", portuguese: "Ele está acostumado a fazer acordos no trabalho." },
      { english: "I’m used to dead-end jobs.", portuguese: "Estou acostumado com empregos sem futuro." },
      { english: "He’s supposed to be more ambitious.", portuguese: "Ele deveria ser mais ambicioso." },
      { english: "They’re supposed to stop pretending.", portuguese: "Eles deveriam parar de fingir." },
      { english: "I’m supposed to ask for a discount.", portuguese: "Eu deveria pedir um desconto." },
      { english: "You’re supposed to help, not hurt people.", portuguese: "Você deveria ajudar, não machucar as pessoas." },
      { english: "What do you intend to do?", portuguese: "O que você pretende fazer?" },
    ],
    unscramble: [
      { id: "41-1", sentence: "I am used to hitchhiking when I travel", scrambled: ["I", "am", "hitchhiking", "to", "used", "travel", "I", "when"] },
      { id: "41-2", sentence: "She is used to giving people a ride", scrambled: ["is", "used", "ride", "a", "giving", "people", "to", "She"] },
      { id: "41-3", sentence: "He is used to making deals at work", scrambled: ["He", "work", "is", "making", "at", "used", "to", "deals"] },
      { id: "41-4", sentence: "I am used to dead end jobs", scrambled: ["used", "to", "jobs", "am", "I", "end", "dead"] },
      { id: "41-5", sentence: "He is supposed to be more ambitious", scrambled: ["He", "be", "ambitious", "is", "supposed", "to", "more"] },
      { id: "41-6", sentence: "They are supposed to stop pretending", scrambled: ["supposed", "They", "to", "stop", "are", "pretending"] },
      { id: "41-7", sentence: "I am supposed to ask for a discount", scrambled: ["I", "ask", "am", "supposed", "a", "for", "to", "discount"] },
      { id: "41-8", sentence: "You are supposed to help not hurt people", scrambled: ["are", "hurt", "to", "not", "You", "help", "supposed", "people"] },
      { id: "41-9", sentence: "What do you intend to do", scrambled: ["What", "intend", "do", "you", "to", "do"] },
      { id: "41-10", sentence: "I intend to make a deal today", scrambled: ["I", "today", "intend", "make", "deal", "a", "to"] }
    ],
    cloze: {
      title: "Traveling with Friends",
      instructions: "Fill in the gaps with: used, supposed, hitchhike, intend, discount.",
      text: "When I travel, I am [used] to walking long distances, but sometimes I [hitchhike] to save time. My friend is [supposed] to join me tomorrow. We [intend] to visit the local market. I always try to ask for a [discount] because I love saving money!"
    }
  },
  {
    id: 42,
    title: "Lesson 42",
    subtitle: "Present Perfect: I have been to",
    vocabulary: [
      { english: "networking", portuguese: "contatos profissionais" },
      { english: "job interview", portuguese: "entrevista de emprego" },
      { english: "workshop", portuguese: "oficina / workshop" },
      { english: "business meeting", portuguese: "reunião de negócios" },
      { english: "corporate conference", portuguese: "conferência corporativa" },
      { english: "training program", portuguese: "programa de treinamento" },
      { english: "environment", portuguese: "ambiente" },
      { english: "mandatory", portuguese: "obrigatório" },
      { english: "to challenge", portuguese: "desafiar" },
      { english: "career", portuguese: "carreira" },
    ],
    phrases: [
      { english: "I have been to professional networking events.", portuguese: "Eu estive em eventos de networking profissional." },
      { english: "She has been to job interviews in another city.", portuguese: "Ela esteve em entrevistas de emprego em outra cidade." },
      { english: "They have been to training workshops for teachers.", portuguese: "Eles estiveram em workshops de treinamento para professores." },
      { english: "We have been to business meetings abroad.", portuguese: "Nós estivemos em reuniões de negócios no exterior." },
      { english: "I haven’t been to a corporate conference yet.", portuguese: "Eu ainda não estive em uma conferência corporativa." },
      { english: "He hasn’t been to any leadership training programs.", portuguese: "Ele não esteve em nenhum programa de treinamento de liderança." },
      { english: "We haven’t been to a peaceful environment.", portuguese: "Nós não estivemos em um ambiente pacífico." },
      { english: "Have you been to any situation where English was mandatory?", portuguese: "Você já esteve em alguma situação onde o inglês era obrigatório?" },
      { english: "Has she been to a place that challenged her skills?", portuguese: "Ela esteve em um lugar que desafiou as habilidades dela?" },
      { english: "Have they been to an experience that helped their career?", portuguese: "Eles estiveram em uma experiência que ajudou a carreira deles?" },
    ],
    unscramble: [
      { id: "42-1", sentence: "I have been to professional networking events", scrambled: ["have", "I", "professional", "been", "to", "events", "networking"] },
      { id: "42-2", sentence: "She has been to job interviews abroad", scrambled: ["been", "job", "to", "She", "has", "interviews", "abroad"] },
      { id: "42-3", sentence: "They have been to training workshops", scrambled: ["They", "been", "workshops", "have", "to", "training"] },
      { id: "42-4", sentence: "We have been to business meetings", scrambled: ["business", "have", "to", "been", "meetings", "We"] },
      { id: "42-5", sentence: "I have not been to a conference yet", scrambled: ["a", "been", "not", "conference", "I", "to", "have", "yet"] },
      { id: "42-6", sentence: "He has not been to training programs", scrambled: ["training", "been", "to", "has", "He", "not", "programs"] },
      { id: "42-7", sentence: "We have not been to that environment", scrambled: ["We", "not", "have", "environment", "to", "been", "that"] },
      { id: "42-8", sentence: "Have you been to a situation like this", scrambled: ["Have", "to", "situation", "been", "you", "a", "like", "this"] },
      { id: "42-9", sentence: "Has she been to a place like that", scrambled: ["she", "been", "to", "Has", "a", "place", "like", "that"] },
      { id: "42-10", sentence: "They have been to a challenging workshop", scrambled: ["to", "have", "a", "been", "They", "challenging", "workshop"] }
    ],
    cloze: {
      title: "The New Job",
      instructions: "Fill in the gaps with: been, interview, career, mandatory, workshop.",
      text: "I have [been] to many places to find a job. Yesterday, I had a job [interview]. In my [career], I have attended many meetings. Next week, English will be [mandatory] for the new [workshop] I am attending."
    }
  },
  {
    id: 43,
    title: "Lesson 43",
    subtitle: "Present Perfect (various verbs)",
    vocabulary: [
      { english: "to eat", past: "ate", pastParticiple: "eaten", portuguese: "comer" },
      { english: "to improve", past: "improved", portuguese: "melhorar" },
      { english: "to change", past: "changed", portuguese: "mudar" },
      { english: "to forget", past: "forgot", pastParticiple: "forgotten", portuguese: "esquecer" },
      { english: "to develop", past: "developed", portuguese: "desenvolver" },
      { english: "to see", past: "saw", pastParticiple: "seen", portuguese: "ver" },
      { english: "to make", past: "made", portuguese: "fazer" },
      { english: "to try", past: "tried", portuguese: "tentar" },
    ],
    phrases: [
      { english: "I have eaten breakfast already.", portuguese: "Eu já tomei café da manhã." },
      { english: "She has improved her English a lot.", portuguese: "Ela melhorou muito o inglês dela." },
      { english: "We have changed our plans for tonight.", portuguese: "Nós mudamos nossos planos para hoje à noite." },
      { english: "They have forgotten the address of the office.", portuguese: "Eles esqueceram o endereço do escritório." },
      { english: "He has developed a new software application.", portuguese: "Ele desenvolveu um novo aplicativo de software." },
      { english: "I have seen that movie three times.", portuguese: "Eu vi aquele filme três vezes." },
      { english: "We have made a lot of progress this month.", portuguese: "Nós fizemos muito progresso este mês." },
      { english: "Have you tried the new restaurant downtown?", portuguese: "Você experimentou o novo restaurante no centro?" },
      { english: "It has changed my life for the better.", portuguese: "Isso mudou minha vida para melhor." },
      { english: "Has she eaten lunch yet?", portuguese: "Ela já almoçou?" },
    ],
    unscramble: [
      { id: "43-1", sentence: "I have eaten breakfast already", scrambled: ["breakfast", "already", "eaten", "I", "have"] },
      { id: "43-2", sentence: "She has improved her English a lot", scrambled: ["lot", "English", "has", "improved", "her", "She", "a"] },
      { id: "43-3", sentence: "We have changed our plans", scrambled: ["changed", "plans", "We", "have", "our"] },
      { id: "43-4", sentence: "They have forgotten the address", scrambled: ["the", "forgotten", "They", "address", "have"] },
      { id: "43-5", sentence: "He has developed a new application", scrambled: ["application", "new", "developed", "has", "a", "He"] },
      { id: "43-6", sentence: "I have seen that movie before", scrambled: ["movie", "seen", "have", "before", "I", "that"] },
      { id: "43-7", sentence: "We have made progress today", scrambled: ["progress", "made", "today", "We", "have"] },
      { id: "43-8", sentence: "Have you tried this food", scrambled: ["you", "this", "Have", "tried", "food"] },
      { id: "43-9", sentence: "It has changed my life", scrambled: ["life", "changed", "has", "It", "my"] },
      { id: "43-10", sentence: "Has she eaten lunch yet", scrambled: ["Has", "lunch", "she", "yet", "eaten"] }
    ],
    cloze: {
      title: "Personal Growth",
      instructions: "Fill in the gaps with: improved, seen, made, tried, forgotten.",
      text: "Since I started studying, I have [improved] my vocabulary. I have [seen] many videos online to help. I have [made] some friends in the class too. I have [tried] to speak every day. Sometimes, I have [forgotten] a few words, but that is normal!"
    }
  },
  {
    id: 44,
    title: "Lesson 44",
    subtitle: "Present Perfect + just",
    vocabulary: [
      { english: "to clean", past: "cleaned", portuguese: "limpar" },
      { english: "to be hired", portuguese: "ser contratado" },
      { english: "to buy", past: "bought", portuguese: "comprar" },
      { english: "to publish", past: "published", portuguese: "publicar" },
      { english: "to send", past: "sent", portuguese: "enviar" },
      { english: "to receive", past: "received", portuguese: "receber" },
      { english: "to update", past: "updated", portuguese: "atualizar" },
      { english: "to realize", past: "realized", portuguese: "perceber / dar-se conta" },
    ],
    phrases: [
      { english: "I have just cleaned the room.", portuguese: "Eu acabei de limpar o quarto." },
      { english: "Have you just been hired?", portuguese: "Você acabou de ser contratado?" },
      { english: "She has just bought a new dress.", portuguese: "Ela acabou de comprar um vestido novo." },
      { english: "Have they just published their books?", portuguese: "Eles acabaram de publicar os livros deles?" },
      { english: "We have just sent the reports.", portuguese: "Nós acabamos de enviar os relatórios." },
      { english: "Has he just received the email?", portuguese: "Ele acabou de receber o e-mail?" },
      { english: "I have just updated the document.", portuguese: "Eu acabei de atualizar o documento." },
      { english: "She has just realized her mistake.", portuguese: "Ela acabou de perceber o erro dela." },
    ],
    unscramble: [
      { id: "44-1", sentence: "I have just cleaned the room", scrambled: ["cleaned", "room", "have", "the", "I", "just"] },
      { id: "44-2", sentence: "Have you just been hired", scrambled: ["hired", "just", "Have", "you", "been"] },
      { id: "44-3", sentence: "She has just bought a dress", scrambled: ["dress", "just", "has", "a", "bought", "She"] },
      { id: "44-4", sentence: "They have just published their books", scrambled: ["published", "their", "just", "books", "They", "have"] },
      { id: "44-5", sentence: "We have just sent the reports", scrambled: ["reports", "just", "sent", "have", "the", "We"] },
      { id: "44-6", sentence: "Has he just received the email", scrambled: ["just", "Has", "received", "email", "he", "the"] },
      { id: "44-7", sentence: "I have just updated the document", scrambled: ["updated", "document", "have", "the", "I", "just"] },
      { id: "44-8", sentence: "She has just realized her mistake", scrambled: ["mistake", "just", "realized", "has", "her", "She"] },
      { id: "44-9", sentence: "He has just finished his work", scrambled: ["just", "work", "finished", "has", "He", "his"] },
      { id: "44-10", sentence: "We have just started the meeting", scrambled: ["started", "just", "the", "have", "We", "meeting"] }
    ],
    cloze: {
      title: "Morning at the Office",
      instructions: "Fill in the gaps with: just, hired, bought, sent, updated.",
      text: "A new employee was [hired] this morning. He has [just] arrived at the office. He has already [bought] a coffee for everyone. I have [sent] him the welcome email and [updated] the team list."
    }
  },
  {
    id: 45,
    title: "Lesson 45",
    subtitle: "Present Perfect + yet",
    vocabulary: [
      { english: "to decide", past: "decided", portuguese: "decidir" },
      { english: "to check", past: "checked", portuguese: "checar / verificar" },
      { english: "to reply", past: "replied", portuguese: "responder" },
      { english: "to discuss", past: "discussed", portuguese: "discutir / debater" },
      { english: "to confirm", past: "confirmed", portuguese: "confirmar" },
      { english: "to learn", past: "learned", portuguese: "aprender" },
      { english: "to solve", past: "solved", portuguese: "resolver" },
      { english: "to review", past: "reviewed", portuguese: "revisar" },
      { english: "to master", past: "mastered", portuguese: "dominar (assunto)" },
    ],
    phrases: [
      { english: "Have you decided what to eat yet?", portuguese: "Você já decidiu o que comer?" },
      { english: "I haven’t checked the messages yet.", portuguese: "Eu ainda não verifiquei as mensagens." },
      { english: "Has she replied to your email yet?", portuguese: "Ela já respondeu seu e-mail?" },
      { english: "They haven’t discussed the project yet.", portuguese: "Eles ainda não discutiram o projeto." },
      { english: "Have we confirmed the reservation yet?", portuguese: "Nós já confirmamos a reserva?" },
      { english: "I haven’t learned all the words yet.", portuguese: "Eu ainda não aprendi todas as palavras." },
      { english: "Has he solved the problem yet?", portuguese: "Ele já resolveu o problema?" },
      { english: "We haven’t reviewed the material yet.", portuguese: "Nós ainda não revisamos o material." },
      { english: "Have they mastered the technique yet?", portuguese: "Eles já dominaram a técnica?" },
      { english: "I haven’t master the lesson yet.", portuguese: "Eu ainda não dominei a lição." },
    ],
    unscramble: [
      { id: "45-1", sentence: "Have you decided what to eat yet", scrambled: ["to", "you", "decided", "eat", "what", "Have", "yet"] },
      { id: "45-2", sentence: "I have not checked the messages yet", scrambled: ["messages", "checked", "the", "not", "have", "I", "yet"] },
      { id: "45-3", sentence: "Has she replied to your email yet", scrambled: ["replied", "Has", "email", "yet", "to", "your", "she"] },
      { id: "45-4", sentence: "They have not discussed the project yet", scrambled: ["They", "not", "project", "discussed", "have", "the", "yet"] },
      { id: "45-5", sentence: "Have we confirmed the reservation yet", scrambled: ["we", "reservation", "confirmed", "the", "yet", "Have"] },
      { id: "45-6", sentence: "I have not learned all words yet", scrambled: ["all", "learned", "have", "not", "words", "I", "yet"] },
      { id: "45-7", sentence: "Has he solved the problem yet", scrambled: ["solved", "he", "problem", "Has", "the", "yet"] },
      { id: "45-8", sentence: "We have not reviewed the material yet", scrambled: ["We", "not", "material", "have", "reviewed", "the", "yet"] },
      { id: "45-9", sentence: "Have they mastered the technique yet", scrambled: ["Have", "they", "technique", "mastered", "the", "yet"] },
      { id: "45-10", sentence: "I have not decided yet", scrambled: ["not", "have", "decided", "I", "yet"] }
    ],
    cloze: {
      title: "End of the Day Tasks",
      instructions: "Fill in the gaps with: yet, decided, checked, replied, confirmed.",
      text: "It is 5 PM, and I haven't finished [yet]. I have [checked] my list, but I haven't [decided] if I should stay late. My boss hasn't [replied] to my question. I haven't [confirmed] my meeting for tomorrow either."
    }
  },
];
