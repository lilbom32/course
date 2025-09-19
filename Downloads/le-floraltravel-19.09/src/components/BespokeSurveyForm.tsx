import React, { useState, useMemo, useEffect } from 'react';
import { useLocalization } from '../hooks/useLocalization';
import { 
    continents, 
    baseBudgetsUSD,
    conversionRates,
    currencySymbols,
    occasions, 
    companions, 
    experiences, 
    accommodations,
    currencyOptions
} from '../data/surveyOptions';

interface BespokeSurveyFormProps {
    onSuccess: () => void;
}

interface FormData {
    destinationContinent: string;
    destinationRegion: string;
    travelTiming: 'flexible' | 'fixed';
    travelMonths: string[];
    groupSize: number;
    budget: string;
    budgetCurrency: string;
    occasion: string[];
    companions: string[];
    experiences: string[];
    accommodation: string[];
    dreamTrip: string;
    firstName: string;
    lastName: string;
    email: string;
    contactMethod: string;
    newsletter: boolean;
}

interface FormErrors {
    travelMonths?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
}

const initialFormData: FormData = {
    destinationContinent: 'Asia',
    destinationRegion: '',
    travelTiming: 'flexible',
    travelMonths: [],
    groupSize: 1,
    budget: '$250 - $499',
    budgetCurrency: 'USD',
    occasion: [],
    companions: [],
    experiences: [],
    accommodation: [],
    dreamTrip: '',
    firstName: '',
    lastName: '',
    email: '',
    contactMethod: 'By E-mail',
    newsletter: false,
};

const CheckmarkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
);

export const BespokeSurveyForm: React.FC<BespokeSurveyFormProps> = ({ onSuccess }) => {
    const { t, language } = useLocalization();
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [errors, setErrors] = useState<FormErrors>({});

    const dynamicBudgetOptions = useMemo(() => {
        const rate = conversionRates[formData.budgetCurrency as keyof typeof conversionRates] || 1;
        const symbol = currencySymbols[formData.budgetCurrency as keyof typeof currencySymbols] || '$';
    
        return baseBudgetsUSD.map(range => {
            let convertedMin = range.min * rate;
            let convertedMax = range.max ? range.max * rate : null;
    
            // Round VND to nearest 1000 for cleaner display
            if (formData.budgetCurrency === 'VND') {
                convertedMin = Math.round(convertedMin / 1000) * 1000;
                if (convertedMax) {
                    convertedMax = Math.round(convertedMax / 1000) * 1000;
                }
            } else { // Round others to nearest integer
                convertedMin = Math.round(convertedMin);
                 if (convertedMax) {
                    convertedMax = Math.round(convertedMax);
                }
            }
            
            const formattedMin = convertedMin.toLocaleString('en-US');
    
            // String formatting logic
            if (convertedMax) {
                const formattedMax = convertedMax.toLocaleString('en-US');
                if (formData.budgetCurrency === 'VND') {
                     return `${formattedMin} - ${formattedMax} ${symbol}`;
                }
                return `${symbol}${formattedMin} - ${symbol}${formattedMax}`;
            }
    
            if (formData.budgetCurrency === 'VND') {
                return `${formattedMin}+ ${symbol}`;
            }
            return `${symbol}${formattedMin}+`;
        });
    }, [formData.budgetCurrency]);

    useEffect(() => {
        setFormData(prev => ({
            ...prev,
            budget: dynamicBudgetOptions[0],
        }));
    }, [dynamicBudgetOptions]);


    const handleMultiSelect = (field: keyof FormData, value: string) => {
        setFormData(prev => {
            const currentValues = prev[field] as string[];
            const newValues = currentValues.includes(value)
                ? currentValues.filter(v => v !== value)
                : [...currentValues, value];
            return { ...prev, [field]: newValues };
        });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const { checked } = e.target as HTMLInputElement;
            setFormData(prev => ({...prev, [name]: checked }));
        } else {
             setFormData(prev => ({...prev, [name]: value }));
        }
    };
    
    const validateStep1 = (): boolean => {
        const newErrors: FormErrors = {};
        if (formData.travelTiming === 'fixed' && formData.travelMonths.length === 0) {
            newErrors.travelMonths = t('bespoke_survey.form.step1.month_error');
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    
    const validateStep3 = (): boolean => {
        const newErrors: FormErrors = {};
        if (!formData.firstName.trim()) newErrors.firstName = t('bespoke_survey.form.step3.error_required');
        if (!formData.lastName.trim()) newErrors.lastName = t('bespoke_survey.form.step3.error_required');
        if (!formData.email.trim()) {
             newErrors.email = t('bespoke_survey.form.step3.error_required');
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
             newErrors.email = t('bespoke_survey.form.step3.error_invalid_email');
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const nextStep = () => {
        let isValid = true;
        if (currentStep === 1) isValid = validateStep1();
        if (isValid) setCurrentStep(prev => prev + 1);
    };

    const prevStep = () => setCurrentStep(prev => prev - 1);
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateStep3()) {
            console.log('Form Submitted:', formData);
            onSuccess();
        }
    };

    const monthGrid = useMemo(() => {
        const months = [];
        const date = new Date();
        date.setMonth(date.getMonth()); // Start from next month
        for (let i = 0; i < 12; i++) {
            const monthName = date.toLocaleDateString(language, { month: 'short' });
            const year = date.getFullYear();
            months.push({ id: `${monthName}-${year}`, name: monthName, year });
            date.setMonth(date.getMonth() + 1);
        }
        return months;
    }, [language]);
    
    return (
        <div className="survey-form-container">
            <h2 className="survey-form-title">{t('bespoke_survey.form.title')}</h2>
            
            <div className="progress-bar">
                <div className="progress-line" style={{ width: `${((currentStep - 1) / 2) * 100}%` }}></div>
                <div className={`progress-step ${currentStep >= 1 ? 'complete' : ''}`}>
                   {currentStep > 1 ? <CheckmarkIcon/> : '1'}
                </div>
                <div className={`progress-step ${currentStep >= 2 ? 'active' : ''} ${currentStep > 2 ? 'complete' : ''}`}>
                    {currentStep > 2 ? <CheckmarkIcon/> : '2'}
                </div>
                <div className={`progress-step ${currentStep === 3 ? 'active' : ''}`}>
                    3
                </div>
            </div>

            <form onSubmit={handleSubmit} noValidate>
                {/* Step 1 */}
                <div className={`form-step ${currentStep === 1 ? 'active' : ''}`}>
                    <div className="form-grid">
                        <div className="form-group">
                            <label htmlFor="destinationContinent">{t('bespoke_survey.form.step1.where_go')}</label>
                            <select id="destinationContinent" name="destinationContinent" value={formData.destinationContinent} onChange={handleInputChange} className="form-select">
                                {continents.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="destinationRegion">{t('bespoke_survey.form.step1.where_in_continent', formData.destinationContinent)}</label>
                            <input type="text" id="destinationRegion" name="destinationRegion" value={formData.destinationRegion} onChange={handleInputChange} className="form-input" placeholder={t('bespoke_survey.form.step1.where_placeholder')} />
                        </div>
                    </div>
                    
                    <div className="form-grid">
                         <div className="form-group">
                            <label className="label">{t('bespoke_survey.form.step1.when_travel')}</label>
                            <div className="checkbox-group">
                                <input type="radio" id="flexible" name="travelTiming" value="flexible" checked={formData.travelTiming === 'flexible'} onChange={handleInputChange} />
                                <label htmlFor="flexible">{t('bespoke_survey.form.step1.flexible_dates')}</label>
                            </div>
                            <div className="checkbox-group">
                                <input type="radio" id="fixed" name="travelTiming" value="fixed" checked={formData.travelTiming === 'fixed'} onChange={handleInputChange} />
                                <label htmlFor="fixed">{t('bespoke_survey.form.step1.know_dates')}</label>
                            </div>
                        </div>
                        {formData.travelTiming === 'fixed' && (
                            <div className="form-group">
                                <label className="label">{t('bespoke_survey.form.step1.when_thinking')}</label>
                                <div className="month-picker">
                                    {monthGrid.map(m => (
                                        <div key={m.id} className={`month-cell ${formData.travelMonths.includes(m.id) ? 'selected' : ''}`} onClick={() => handleMultiSelect('travelMonths', m.id)}>
                                            <div>{m.name}</div>
                                            <div className="year">{m.year}</div>
                                        </div>
                                    ))}
                                </div>
                                {errors.travelMonths && <div className="form-error">{errors.travelMonths}</div>}
                            </div>
                        )}
                    </div>
                    
                     <div className="form-grid">
                        <div className="form-group">
                            <label htmlFor="groupSize">{t('bespoke_survey.form.step1.group_size')}</label>
                            <input type="number" id="groupSize" name="groupSize" value={formData.groupSize} min="1" onChange={handleInputChange} className="form-input" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="budget">{t('bespoke_survey.form.step1.daily_budget')}</label>
                            <div className="budget-currency-group">
                                <select id="budget" name="budget" value={formData.budget} onChange={handleInputChange} className="form-select">
                                    {dynamicBudgetOptions.map(b => <option key={b} value={b}>{b}</option>)}
                                </select>
                                <select id="budgetCurrency" name="budgetCurrency" value={formData.budgetCurrency} onChange={handleInputChange} className="form-select" aria-label={t('bespoke_survey.form.step1.currency')}>
                                    {currencyOptions.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>
                    
                    <div className="form-group full-width">
                        <label className="label">{t('bespoke_survey.form.step1.occasion')}</label>
                        <div className="choice-buttons">
                            {occasions.map(o => <button type="button" key={o} className={`choice-btn ${formData.occasion.includes(o) ? 'selected' : ''}`} onClick={() => handleMultiSelect('occasion', o)}>{o}</button>)}
                        </div>
                    </div>
                    <div className="form-group full-width">
                        <label className="label">{t('bespoke_survey.form.step1.travelling_with')}</label>
                        <div className="choice-buttons">
                            {companions.map(c => <button type="button" key={c} className={`choice-btn ${formData.companions.includes(c) ? 'selected' : ''}`} onClick={() => handleMultiSelect('companions', c)}>{c}</button>)}
                        </div>
                    </div>
                </div>

                {/* Step 2 */}
                <div className={`form-step ${currentStep === 2 ? 'active' : ''}`}>
                    <div className="form-group full-width">
                        <label className="label">{t('bespoke_survey.form.step2.experiences_seeking')}</label>
                        <div className="choice-buttons">
                           {experiences.map(e => <button type="button" key={e} className={`choice-btn ${formData.experiences.includes(e) ? 'selected' : ''}`} onClick={() => handleMultiSelect('experiences', e)}>{e}</button>)}
                        </div>
                    </div>
                     <div className="form-group full-width">
                        <label className="label">{t('bespoke_survey.form.step2.accommodation_prefer')}</label>
                        <div className="choice-buttons">
                           {accommodations.map(a => <button type="button" key={a} className={`choice-btn ${formData.accommodation.includes(a) ? 'selected' : ''}`} onClick={() => handleMultiSelect('accommodation', a)}>{a}</button>)}
                        </div>
                    </div>
                    <div className="form-group full-width">
                        <label htmlFor="dreamTrip">{t('bespoke_survey.form.step2.dream_trip_tell_us')}</label>
                        <textarea id="dreamTrip" name="dreamTrip" value={formData.dreamTrip} onChange={handleInputChange} className="form-textarea" placeholder={t('bespoke_survey.form.step2.dream_trip_placeholder')}></textarea>
                    </div>
                </div>

                {/* Step 3 */}
                <div className={`form-step ${currentStep === 3 ? 'active' : ''}`}>
                    <div className="form-grid">
                        <div className="form-group">
                            <label htmlFor="firstName">{t('bespoke_survey.form.step3.first_name')} *</label>
                            <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} className="form-input" required />
                             {errors.firstName && <div className="form-error">{errors.firstName}</div>}
                        </div>
                         <div className="form-group">
                            <label htmlFor="lastName">{t('bespoke_survey.form.step3.last_name')} *</label>
                            <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} className="form-input" required />
                            {errors.lastName && <div className="form-error">{errors.lastName}</div>}
                        </div>
                    </div>
                    <div className="form-group full-width">
                        <label htmlFor="email">{t('bespoke_survey.form.step3.email')} *</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className="form-input" required />
                        {errors.email && <div className="form-error">{errors.email}</div>}
                    </div>
                     <div className="form-group full-width">
                        <label htmlFor="contactMethod">{t('bespoke_survey.form.step3.how_contact')}</label>
                        <select id="contactMethod" name="contactMethod" value={formData.contactMethod} onChange={handleInputChange} className="form-select">
                            <option value="By E-mail">{t('bespoke_survey.form.step3.by_email')}</option>
                        </select>
                    </div>
                    <div className="form-group full-width checkbox-group">
                        <input type="checkbox" id="newsletter" name="newsletter" checked={formData.newsletter} onChange={handleInputChange} />
                        <label htmlFor="newsletter">{t('bespoke_survey.form.step3.newsletter_signup')}</label>
                    </div>
                    <p className="terms-text">{t('bespoke_survey.form.step3.terms')} <a href="#">{t('bespoke_survey.form.step3.terms_link_T&C')}</a> and <a href="#">{t('bespoke_survey.form.step3.terms_link_privacy')}</a>.</p>
                </div>
                
                <div className="form-navigation">
                    {currentStep > 1 ? (
                        <button type="button" className="btn btn-back" onClick={prevStep}>{t('bespoke_survey.form.back_button')}</button>
                    ) : (
                        <span></span> 
                    )}
                    {currentStep < 3 ? (
                        <button type="button" className="btn" onClick={nextStep}>{t('bespoke_survey.form.next_button')}</button>
                    ) : (
                        <button type="submit" className="btn btn-pulse">{t('bespoke_survey.form.submit_button')}</button>
                    )}
                </div>
            </form>
        </div>
    );
};