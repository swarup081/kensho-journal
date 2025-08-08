'use client';

import { submitFeedback } from './actions';
import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useAnimationControls } from 'framer-motion';
import { ArrowLeft, Lightbulb, MessageSquare, Bug, Star, ThumbsUp, Check } from 'lucide-react';

const ActionButton = ({ children, onClick, type = 'button', disabled = false, controls }) => (
  <motion.button
    animate={controls}
    type={type}
    onClick={onClick}
    disabled={disabled}
    className="font-semibold py-3 px-8 rounded-lg shadow-md transition-all duration-300 bg-gradient-to-r from-purple-600 to-orange-400 text-white disabled:bg-gray-600 disabled:shadow-none disabled:cursor-not-allowed"
  >
    {children}
  </motion.button>
);

const SelectionTile = ({ text, icon: Icon, iconColor, onClick, isSelected }) => (
  <button
    onClick={onClick}
    className={`p-6 bg-black/20 rounded-lg text-center hover:bg-purple-600/20 border-2 transition-all duration-200
      ${isSelected ? 'border-purple-500' : 'border-gray-800/50 hover:border-gray-700'}
    `}
  >
    <Icon className={`mx-auto h-8 w-8 ${iconColor}`} />
    <p className="mt-4 font-semibold text-gray-300">{text}</p>
  </button>
);

const CategoryPill = ({ text, onClick, isSelected }) => (
  <button
    onClick={onClick}
    className={`py-2 px-5 rounded-full font-semibold transition-all duration-200
      ${isSelected ? 'bg-purple-600 text-white ring-2 ring-purple-400' : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700'}
    `}
  >
    {text}
  </button>
);

const StarRating = ({ rating, setRating }) => (
  <div className="flex justify-center gap-2 mb-6">
    {[1, 2, 3, 4, 5].map(star => (
      <Star
        key={star}
        onClick={() => setRating(star)}
        className={`h-10 w-10 cursor-pointer transition-all duration-150
          ${rating >= star ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600 hover:text-gray-400 hover:scale-110'}
        `}
      />
    ))}
  </div>
);

const ToggleSwitch = ({ checked, onChange }) => (
  <div
    onClick={() => onChange(!checked)}
    className={`flex items-center w-14 h-8 flex-shrink-0 rounded-full p-1 cursor-pointer transition-colors duration-300 ${
      checked ? 'bg-purple-600 justify-end' : 'bg-gray-700 justify-start'
    }`}
  >
    <motion.div
      layout
      transition={{ type: 'spring', stiffness: 700, damping: 30 }}
      className="h-6 w-6 bg-white rounded-full shadow-md"
    />
  </div>
);


const FeedbackPage = () => {
  const [step, setStep] = useState(1);
  const [feedbackType, setFeedbackType] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [categories, setCategories] = useState(new Set());
  const [canContact, setCanContact] = useState(false);
  const [validationError, setValidationError] = useState('');

  const controls = useAnimationControls();
  const totalSteps = 5;

  const handleNext = () => {
    if (step === 2) {
      if (feedbackType === 'General Feedback' && (comment.trim() === '' || rating === 0)) {
        setValidationError('Please provide a rating and a comment.');
        controls.start({ x: [-5, 5, -5, 5, 0], transition: { duration: 0.4 } });
        return;
      }
      if ((feedbackType === 'Feature Idea' || feedbackType === 'Bug Report') && comment.trim() === '') {
        setValidationError('Please provide a detailed comment.');
        controls.start({ x: [-5, 5, -5, 5, 0], transition: { duration: 0.4 } });
        return;
      }
    }
    if (step === 3 && categories.size === 0) {
      setValidationError('Please select at least one category.');
      controls.start({ x: [-5, 5, -5, 5, 0], transition: { duration: 0.4 } });
      return;
    }
    
    setValidationError('');
    setStep(prev => Math.min(prev + 1, totalSteps));
  };

  const handleBack = () => {
    setValidationError('');
    setStep(prev => Math.max(prev - 1, 1));
  };
  
  const handleCategoryToggle = (category) => {
    setValidationError('');
    setCategories(prev => {
      const newCategories = new Set(prev);
      newCategories.has(category) ? newCategories.delete(category) : newCategories.add(category);
      return newCategories;
    });
  };

const handleSubmit = async () => {
  const formData = new FormData();
  formData.append('feedbackType', feedbackType);
  formData.append('rating', rating);
  formData.append('comment', comment);
  formData.append('categories', JSON.stringify(Array.from(categories)));
  formData.append('canContact', canContact);

  await submitFeedback(formData);

  handleNext();
};

  const renderStepContent = () => {
    const motionProps = {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
      transition: { duration: 0.3, ease: "easeInOut" },
    };

    return (
      <AnimatePresence mode="wait">
        <motion.div key={step} {...motionProps}>
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-semibold text-center text-gray-200">What kind of feedback do you have?</h2>
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <SelectionTile text="General Feedback" icon={MessageSquare} iconColor="text-purple-400" isSelected={feedbackType === 'General Feedback'} onClick={() => { setFeedbackType('General Feedback'); handleNext(); }} />
                <SelectionTile text="Feature Idea" icon={Lightbulb} iconColor="text-orange-400" isSelected={feedbackType === 'Feature Idea'} onClick={() => { setFeedbackType('Feature Idea'); handleNext(); }} />
                <SelectionTile text="Bug Report" icon={Bug} iconColor="text-red-400" isSelected={feedbackType === 'Bug Report'} onClick={() => { setFeedbackType('Bug Report'); handleNext(); }} />
              </div>
            </div>
          )}
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-semibold text-center text-gray-200">Tell us more...</h2>
              {feedbackType === 'General Feedback' && (
                <div className="mt-8 text-center">
                  <p className="text-gray-400 mb-4">How would you rate your overall experience?</p>
                  <StarRating rating={rating} setRating={(r) => {setRating(r); setValidationError('');}} />
                </div>
              )}
              <textarea
                className="w-full h-40 bg-gray-900/70 text-gray-200 p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                placeholder="Let your thoughts flow..." value={comment} onChange={(e) => { setComment(e.target.value); setValidationError(''); }}
              />
            </div>
          )}
          {step === 3 && (
            <div>
              <h2 className="text-2xl font-semibold text-center text-gray-200">What is this feedback about?</h2>
              <p className="text-center text-gray-500 mt-2">Select all that apply.</p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {['App Design', 'Journaling Editor', 'Calendar View', 'App Speed', 'Other'].map(cat => (
                  <CategoryPill key={cat} text={cat} isSelected={categories.has(cat)} onClick={() => handleCategoryToggle(cat)} />
                ))}
              </div>
            </div>
          )}
          {step === 4 && (
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-center text-gray-200">Help Us Understand</h2>
              <p className="mt-4 text-gray-400 max-w-md mx-auto">You&apos;re helping us build. A quick follow-up email helps us understand your unique perspective. Is it okay if we reach out?</p>
              <div className="mt-8 flex justify-between items-center max-w-sm mx-auto p-4 rounded-lg bg-gray-800/50">
                <span className="font-semibold text-gray-300">Allow us to contact you via email</span>
                <ToggleSwitch checked={canContact} onChange={setCanContact} />
              </div>
            </div>
          )}
          {step === 5 && (
            <div className="text-center p-4">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.2 }}
                  className="inline-block"
                >
                  <ThumbsUp className="h-20 w-20 text-purple-400" />
                </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="mt-6 text-3xl font-bold text-white">
                  Thank You for Your Contribution
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="mt-4 text-gray-400 max-w-md mx-auto">
                  Your feedback is a seed of growth for our community&apos;s sanctuary. We are grateful for your time and your thoughtful perspective.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="mt-8">
                <Link href="/journal">
                  <ActionButton>Back to Journal</ActionButton>
                </Link>
              </motion.div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <div className="p-4 sm:p-8 lg:p-12">
      <div className="max-w-2xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-100" style={{ fontFamily: "'Lora', serif" }}>Share Your Feedback</h1>
          <p className="text-gray-400 mt-1">Help us shape the future of your personal sanctuary.</p>
        </header>
        
        {step < 5 && (
          <div className="w-full bg-gray-800/50 rounded-full h-1.5 mb-8">
            <motion.div
              className="bg-purple-600 h-1.5 rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${(step / (totalSteps - 1)) * 100}%` }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            />
          </div>
        )}
        
        <div className="bg-black/10 rounded-2xl shadow-2xl p-8 min-h-[380px] flex flex-col justify-center">
          {renderStepContent()}
        </div>
        
        {step > 1 && step < 5 && (
          <div className="mt-8 flex flex-col items-end">
             <AnimatePresence>
              {validationError && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="mb-4 text-red-400 font-semibold"
                >
                  {validationError}
                </motion.p>
              )}
            </AnimatePresence>
            <div className={`w-full flex justify-between items-center`}>
              <button onClick={handleBack} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors font-semibold">
                <ArrowLeft className="h-5 w-5" /> Back
              </button>
              <ActionButton 
                onClick={
                  step === 4 ? handleSubmit :
                  handleNext
                }
                controls={controls}
              >
                {step === 4 ? 'Submit' : 'Next'}
              </ActionButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackPage;