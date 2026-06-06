import React, { useState } from 'react';
import { Sparkles, CheckCircle, Send } from 'lucide-react';

export default function RSVPForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    attendance: '', // 'accept' or 'decline'
    hasPlusOne: false,
    guestName: '',
    diet: '',
    song: '',
    notes: ''
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = "Full name is required.";
    if (!formData.email.trim()) {
      tempErrors.email = "Email address is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Please enter a valid email.";
    }
    if (!formData.attendance) tempErrors.attendance = "Please let us know if you can make it.";
    if (formData.hasPlusOne && !formData.guestName.trim()) {
      tempErrors.guestName = "Please enter your guest's name.";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Simulate API submit
      setSubmitted(true);
    }
  };

  return (
    <section id="rsvp" className="py-24 px-6 md:px-12 bg-white w-full border-t border-black/5 flex flex-col items-center">
      <div className="w-full max-w-[650px]">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="font-display italic text-3xl text-accent-color block mb-2">Be there</span>
          <h2 className="text-4xl md:text-5xl font-display mb-4">Kindly Respond</h2>
          <p className="text-base text-text-muted max-w-[480px] mx-auto font-light">
            Please fill out the form below to let us know if you will be celebrating with us in Big Sur.
          </p>
        </div>

        {submitted ? (
          /* SUCCESS STATE */
          <div className="p-12 bg-bg-surface border border-accent-light rounded-3xl text-center shadow-lg animate-[fadeIn_0.6s_ease]">
            <div className="w-16 h-16 bg-bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="text-accent-color" size={36} />
            </div>
            <h3 className="text-3xl font-display mb-4">Thank You!</h3>
            <p className="text-lg text-text-primary mb-2 font-medium">Your RSVP has been submitted.</p>
            <p className="text-sm text-text-muted font-light max-w-[400px] mx-auto leading-relaxed">
              {formData.attendance === 'accept' 
                ? "We are thrilled that you can make it! We will send updates and travel advice to your email address as the date approaches."
                : "We are so sorry you won't be able to make it. You will be missed, but we look forward to celebrating with you in spirit!"}
            </p>
            <div className="mt-8 flex justify-center gap-1 text-xs text-accent-color font-semibold uppercase tracking-widest">
              <Sparkles size={14} />
              <span>See you in California</span>
            </div>
          </div>
        ) : (
          /* FORM STATE */
          <form 
            onSubmit={handleSubmit} 
            className="p-8 md:p-12 bg-bg-surface border border-border-color rounded-3xl shadow-sm flex flex-col gap-6"
          >
            {/* Full Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold uppercase tracking-wider text-text-muted mb-2">
                Your Full Name
              </label>
              <input 
                type="text" 
                id="name" 
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`input-field ${errors.name ? 'border-red-400 focus:border-red-400 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]' : ''}`}
                placeholder="Jim Halpert"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.name}</p>}
            </div>

            {/* Email Address */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold uppercase tracking-wider text-text-muted mb-2">
                Email Address
              </label>
              <input 
                type="email" 
                id="email" 
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`input-field ${errors.email ? 'border-red-400 focus:border-red-400' : ''}`}
                placeholder="jim@paper-co.com"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.email}</p>}
            </div>

            {/* Attendance (Radio Buttons) */}
            <div>
              <span className="block text-sm font-semibold uppercase tracking-wider text-text-muted mb-3">
                Will you be attending?
              </span>
              <div className="flex flex-col gap-3">
                <label className="radio-label">
                  <input 
                    type="radio" 
                    name="attendance" 
                    value="accept"
                    checked={formData.attendance === 'accept'}
                    onChange={handleInputChange}
                    className="radio-input"
                  />
                  <span className="text-text-primary font-medium">Joyfully Accepts</span>
                </label>
                <label className="radio-label">
                  <input 
                    type="radio" 
                    name="attendance" 
                    value="decline"
                    checked={formData.attendance === 'decline'}
                    onChange={handleInputChange}
                    className="radio-input"
                  />
                  <span className="text-text-primary font-medium">Regretfully Declines</span>
                </label>
              </div>
              {errors.attendance && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.attendance}</p>}
            </div>

            {/* Plus One (Conditional) */}
            {formData.attendance === 'accept' && (
              <div className="animate-[fadeIn_0.3s_ease] border-t border-black/5 pt-6 flex flex-col gap-6">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    name="hasPlusOne"
                    checked={formData.hasPlusOne}
                    onChange={handleInputChange}
                    className="w-5 h-5 rounded border-border-color accent-[#8a5a2b] cursor-pointer"
                  />
                  <span className="text-sm font-medium text-text-primary select-none">
                    I will be bringing a guest (+1)
                  </span>
                </label>

                {formData.hasPlusOne && (
                  <div className="animate-[fadeIn_0.3s_ease]">
                    <label htmlFor="guestName" className="block text-sm font-semibold uppercase tracking-wider text-text-muted mb-2">
                      Guest's Full Name
                    </label>
                    <input 
                      type="text" 
                      id="guestName" 
                      name="guestName"
                      value={formData.guestName}
                      onChange={handleInputChange}
                      className={`input-field ${errors.guestName ? 'border-red-400 focus:border-red-400' : ''}`}
                      placeholder="Pam Beesly"
                    />
                    {errors.guestName && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.guestName}</p>}
                  </div>
                )}
              </div>
            )}

            {/* Dietary Restrictions */}
            <div>
              <label htmlFor="diet" className="block text-sm font-semibold uppercase tracking-wider text-text-muted mb-2">
                Dietary Restrictions / Allergies
              </label>
              <textarea 
                id="diet" 
                name="diet"
                value={formData.diet}
                onChange={handleInputChange}
                rows={2}
                className="input-field resize-none"
                placeholder="Vegetarian, Nut allergy, etc. (leave blank if none)"
              />
            </div>

            {/* Song Request */}
            <div>
              <label htmlFor="song" className="block text-sm font-semibold uppercase tracking-wider text-text-muted mb-2">
                Song Request (For the dance floor!)
              </label>
              <input 
                type="text" 
                id="song" 
                name="song"
                value={formData.song}
                onChange={handleInputChange}
                className="input-field"
                placeholder="Dancing Queen - ABBA"
              />
            </div>

            {/* Custom Notes */}
            <div>
              <label htmlFor="notes" className="block text-sm font-semibold uppercase tracking-wider text-text-muted mb-2">
                Note to the Couple
              </label>
              <textarea 
                id="notes" 
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows={3}
                className="input-field resize-none"
                placeholder="We can't wait to celebrate with you!"
              />
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="btn-primary w-full py-3.5 mt-4 font-semibold tracking-wide flex items-center justify-center gap-2"
            >
              <Send size={16} />
              <span>Submit RSVP</span>
            </button>
          </form>
        )}

      </div>
    </section>
  );
}
