
import React, { useState } from 'react';
import { LESSONS } from './constants';
import { TabType, Lesson } from './types';
import AudioButton from './components/AudioButton';
import ExerciseSection from './components/ExerciseSection';

const App: React.FC = () => {
  const [activeLessonId, setActiveLessonId] = useState<number>(41);
  const [activeTab, setActiveTab] = useState<TabType>(TabType.VOCABULARY);

  const activeLesson = LESSONS.find(l => l.id === activeLessonId) || LESSONS[0];

  const renderVocabulary = (lesson: Lesson) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {lesson.vocabulary.map((item, idx) => (
        <div key={idx} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between group hover:shadow-md transition-shadow">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-indigo-600 font-bold text-lg">
                {item.english}
                {item.past && (
                  <span className="text-slate-400 font-normal text-base ml-1">
                    ({item.past}{item.pastParticiple ? `, ${item.pastParticiple}` : ''})
                  </span>
                )}
              </span>
              <AudioButton text={`${item.english} ${item.past || ''} ${item.pastParticiple || ''}`} />
            </div>
            <p className="text-slate-500 italic">{item.portuguese}</p>
          </div>
        </div>
      ))}
    </div>
  );

  const renderPhrases = (lesson: Lesson) => (
    <div className="space-y-4">
      {lesson.phrases.map((phrase, idx) => (
        <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between gap-6 hover:bg-indigo-50/30 transition-colors">
          <div className="flex-1">
            <h4 className="text-xl font-medium text-slate-800 mb-1">{phrase.english}</h4>
            <p className="text-slate-500">{phrase.portuguese}</p>
          </div>
          <AudioButton text={phrase.english} />
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
              E
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">English Pack 9</h1>
              <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Intermediate Mastery</p>
            </div>
          </div>
          
          <nav className="flex items-center overflow-x-auto gap-2 no-scrollbar">
            {LESSONS.map((l) => (
              <button
                key={l.id}
                onClick={() => {
                  setActiveLessonId(l.id);
                  setActiveTab(TabType.VOCABULARY);
                }}
                className={`px-4 py-2 rounded-full font-bold text-sm transition-all whitespace-nowrap ${
                  activeLessonId === l.id 
                    ? 'bg-indigo-600 text-white shadow-md scale-105' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Lesson {l.id}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 mt-8">
        {/* Lesson Hero */}
        <div className="lesson-gradient p-8 rounded-3xl text-white mb-8 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-lg text-xs font-bold uppercase tracking-wider mb-2">
                Level 2 • Intermediate
              </span>
              <h2 className="text-4xl font-extrabold mb-2">{activeLesson.title}</h2>
              <p className="text-indigo-100 text-xl font-medium">{activeLesson.subtitle}</p>
            </div>
            <div className="flex gap-4">
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/10 flex flex-col items-center min-w-[100px]">
                <span className="text-2xl font-bold">{activeLesson.vocabulary.length}</span>
                <span className="text-[10px] uppercase font-bold text-indigo-200">Words</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/10 flex flex-col items-center min-w-[100px]">
                <span className="text-2xl font-bold">{activeLesson.phrases.length}</span>
                <span className="text-[10px] uppercase font-bold text-indigo-200">Phrases</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200 mb-8 max-w-md">
          {Object.values(TabType).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold capitalize transition-all ${
                activeTab === tab
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="min-h-[400px]">
          {activeTab === TabType.VOCABULARY && renderVocabulary(activeLesson)}
          {activeTab === TabType.PHRASES && renderPhrases(activeLesson)}
          {activeTab === TabType.EXERCISES && (
            <ExerciseSection 
              unscramble={activeLesson.unscramble} 
              cloze={activeLesson.cloze} 
            />
          )}
        </div>
      </main>

      {/* Floating Progress Tracker (Visual only for now) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white px-6 py-4 rounded-2xl shadow-2xl border border-slate-200 flex items-center gap-6 z-50">
        <div className="flex items-center gap-3">
          <div className="w-32 h-3 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-indigo-600 rounded-full transition-all duration-500" 
              style={{ width: `${((activeLessonId - 40) / 5) * 100}%` }}
            ></div>
          </div>
          <span className="text-sm font-bold text-slate-700">
            {Math.round(((activeLessonId - 40) / 5) * 100)}% Completed
          </span>
        </div>
      </div>
    </div>
  );
};

export default App;
