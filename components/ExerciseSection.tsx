
import React, { useState, useEffect } from 'react';
import { UnscrambleExercise, ClozeExercise } from '../types';

interface ExerciseSectionProps {
  unscramble: UnscrambleExercise[];
  cloze: ClozeExercise;
}

const ExerciseSection: React.FC<ExerciseSectionProps> = ({ unscramble, cloze }) => {
  // Unscramble state
  const [unscrambleAnswers, setUnscrambleAnswers] = useState<Record<string, string[]>>({});
  const [unscrambleFeedback, setUnscrambleFeedback] = useState<Record<string, 'correct' | 'incorrect' | null>>({});

  // Cloze state
  const [clozeAnswers, setClozeAnswers] = useState<string[]>([]);
  const [clozeFeedback, setClozeFeedback] = useState<boolean | null>(null);

  const toggleWord = (exerciseId: string, word: string) => {
    const currentSelection = unscrambleAnswers[exerciseId] || [];
    if (currentSelection.includes(word)) {
      // Logic could be more complex (index based) but for simplicity we'll toggle
      // To allow multiple same words, we use a simple check
      setUnscrambleAnswers({
        ...unscrambleAnswers,
        [exerciseId]: currentSelection.filter(w => w !== word)
      });
    } else {
      setUnscrambleAnswers({
        ...unscrambleAnswers,
        [exerciseId]: [...currentSelection, word]
      });
    }
  };

  const handleUnscrambleCheck = (ex: UnscrambleExercise) => {
    const userSentence = (unscrambleAnswers[ex.id] || []).join(' ').toLowerCase().trim();
    const correctSentence = ex.sentence.toLowerCase().trim();
    
    setUnscrambleFeedback({
      ...unscrambleFeedback,
      [ex.id]: userSentence === correctSentence ? 'correct' : 'incorrect'
    });
  };

  const handleClozeCheck = () => {
    const blanks = cloze.text.match(/\[(.*?)\]/g)?.map(m => m.slice(1, -1)) || [];
    const isAllCorrect = blanks.every((correctWord, index) => 
      clozeAnswers[index]?.toLowerCase().trim() === correctWord.toLowerCase().trim()
    );
    setClozeFeedback(isAllCorrect);
  };

  const renderClozeText = () => {
    const parts = cloze.text.split(/\[.*?\]/);
    return parts.map((part, index) => (
      <React.Fragment key={index}>
        {part}
        {index < parts.length - 1 && (
          <input
            type="text"
            className="mx-1 px-2 py-0.5 border-b-2 border-indigo-300 focus:border-indigo-600 outline-none w-24 text-indigo-700 bg-transparent"
            onChange={(e) => {
              const newAnswers = [...clozeAnswers];
              newAnswers[index] = e.target.value;
              setClozeAnswers(newAnswers);
            }}
          />
        )}
      </React.Fragment>
    ));
  };

  return (
    <div className="space-y-12">
      {/* Unscramble Part */}
      <section>
        <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <span className="bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
          Unscramble the Sentences
        </h3>
        <div className="space-y-8">
          {unscramble.map((ex, index) => (
            <div key={ex.id} className="p-6 bg-white rounded-xl shadow-sm border border-slate-100">
              <p className="text-sm font-medium text-slate-500 mb-4 uppercase tracking-wider">Sentence {index + 1}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {ex.scrambled.map((word, i) => {
                  const isSelected = (unscrambleAnswers[ex.id] || []).includes(word);
                  return (
                    <button
                      key={i}
                      onClick={() => {
                        const current = unscrambleAnswers[ex.id] || [];
                        setUnscrambleAnswers({ ...unscrambleAnswers, [ex.id]: [...current, word] });
                      }}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 transition-colors"
                    >
                      {word}
                    </button>
                  );
                })}
              </div>

              <div className="min-h-[50px] p-3 border-2 border-dashed border-slate-200 rounded-lg bg-slate-50 flex flex-wrap gap-2 items-center mb-4">
                {(unscrambleAnswers[ex.id] || []).map((word, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      const current = [...(unscrambleAnswers[ex.id] || [])];
                      current.splice(i, 1);
                      setUnscrambleAnswers({ ...unscrambleAnswers, [ex.id]: current });
                    }}
                    className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg border border-indigo-200 flex items-center gap-1 group"
                  >
                    {word}
                    <span className="text-indigo-300 group-hover:text-indigo-600 text-xs">×</span>
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <button
                  onClick={() => handleUnscrambleCheck(ex)}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
                >
                  Check Answer
                </button>
                
                {unscrambleFeedback[ex.id] && (
                  <span className={`flex items-center gap-2 font-semibold ${unscrambleFeedback[ex.id] === 'correct' ? 'text-emerald-600' : 'text-rose-500'}`}>
                    {unscrambleFeedback[ex.id] === 'correct' ? '✅ Correct!' : '❌ Try again!'}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cloze Part */}
      <section className="bg-white p-8 rounded-2xl shadow-lg border border-indigo-50">
        <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span className="bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
          Fill in the Blanks: {cloze.title}
        </h3>
        <p className="text-slate-500 italic mb-6">{cloze.instructions}</p>
        
        <div className="text-lg leading-loose text-slate-700 bg-slate-50 p-6 rounded-xl border border-slate-100 mb-6">
          {renderClozeText()}
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={handleClozeCheck}
            className="px-8 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors shadow-lg font-bold"
          >
            Check Story
          </button>
          {clozeFeedback !== null && (
            <span className={`text-lg font-bold ${clozeFeedback ? 'text-emerald-600' : 'text-rose-500'}`}>
              {clozeFeedback ? '✨ Excellent! Perfectly completed.' : '🔍 Almost there! Check your answers.'}
            </span>
          )}
        </div>
      </section>
    </div>
  );
};

export default ExerciseSection;
