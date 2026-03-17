import React, { useState } from 'react';
import { ArrowLeftIcon, CheckCircle2Icon, CircleIcon } from 'lucide-react';
interface SubscriptionScreenProps {
  navigateTo: (screen: string) => void;
}
export const SubscriptionScreen: React.FC<SubscriptionScreenProps> = ({
  navigateTo
}) => {
  const [selectedPlan, setSelectedPlan] = useState<'yearly' | 'monthly'>(
    'yearly'
  );
  const benefits = [
  {
    title: 'Unlimited Recipes',
    description: 'Get access to hundreds of premium, chef-crafted recipes'
  },
  {
    title: 'Advanced Tracking',
    description: 'Daily calorie, macro, and personalized goal tracking'
  },
  {
    title: 'AI Recipe Generation',
    description: 'Generate new recipes from scratch with ingredients at hand'
  }];

  return (
    <div className="flex flex-col min-h-screen bg-white max-w-[430px] mx-auto relative overflow-hidden">
      {/* Background Image Decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 -mr-10 -mt-10 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
          alt="Healthy food"
          className="w-full h-full object-cover rounded-full opacity-90 mix-blend-multiply"
          style={{
            maskImage: 'radial-gradient(circle, black 40%, transparent 70%)',
            WebkitMaskImage:
            'radial-gradient(circle, black 40%, transparent 70%)'
          }} />
        
      </div>

      {/* Status Bar Area */}
      <div className="flex justify-between items-center px-5 py-3 text-[#1A1A1A] z-10">
        <span className="text-sm font-medium">9:41 AM</span>
        <div className="flex items-center space-x-3">
          <span className="text-sm">5G</span>
          <span className="text-sm">100%</span>
        </div>
      </div>

      {/* Back Button */}
      <div className="px-4 pt-1 pb-2 z-20">
        <button
          onClick={() => navigateTo('settings')}
          className="p-2 -ml-1 text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Go back to settings">
          
          <ArrowLeftIcon size={22} />
        </button>
      </div>

      <div className="flex-1 px-6 pt-4 pb-28 z-10 flex flex-col overflow-y-auto">
        {/* Header Text */}
        <div className="mb-8 max-w-[280px]">
          <h1 className="text-4xl font-bold text-[#1A1A1A] leading-tight mb-4 tracking-tight">
            Say hello to
            <br />
            your best self.
          </h1>
          <p className="text-[15px] text-gray-600 leading-relaxed">
            Members are up to 65% more likely to reach their goals with Premium.
          </p>
        </div>

        {/* Benefits List */}
        <div className="space-y-6 mb-10">
          {benefits.map((benefit, index) =>
          <div key={index} className="flex items-start">
              <div className="mt-0.5 mr-4 shrink-0">
                {/* Crown Icon SVG */}
                <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                
                  <path
                  d="M4.5 18H19.5V20H4.5V18ZM19.5 7.5L16.5 12L12 4.5L7.5 12L4.5 7.5V15H19.5V7.5Z"
                  fill="#FFB800" />
                
                </svg>
              </div>
              <div>
                <p className="text-[15px] text-[#1A1A1A] leading-snug">
                  <span className="font-bold">{benefit.title}:</span>{' '}
                  {benefit.description}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-auto">
          <h2 className="text-center text-[17px] font-bold text-[#1A1A1A] mb-6">
            Select a plan for your free trial.
          </h2>

          {/* Plan Cards */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* Yearly Plan */}
            <div
              onClick={() => setSelectedPlan('yearly')}
              className={`relative p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${selectedPlan === 'yearly' ? 'border-[#4CAF50] bg-white shadow-lg scale-[1.02]' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
              
              {/* Savings Badge */}
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#4CAF50] text-white text-[11px] font-bold px-3 py-1 rounded-full whitespace-nowrap tracking-wide">
                62% SAVINGS
              </div>

              <div className="flex justify-between items-start mb-2 mt-1">
                <h3 className="font-bold text-[#1A1A1A] tracking-wide">
                  YEARLY
                </h3>
                {selectedPlan === 'yearly' ?
                <CheckCircle2Icon
                  size={22}
                  className="text-[#4CAF50] fill-[#4CAF50]/10" /> :


                <CircleIcon size={22} className="text-gray-300" />
                }
              </div>

              <div className="mb-1">
                <span className="text-xl font-bold text-[#1A1A1A]">$68.98</span>
                <span className="text-sm text-gray-500 font-medium">/YR</span>
              </div>

              <div className="text-sm text-gray-400 line-through mb-4">
                $179.76/YR
              </div>

              <p className="text-[11px] text-gray-500 leading-tight">
                Billed yearly after free trial.
              </p>
            </div>

            {/* Monthly Plan */}
            <div
              onClick={() => setSelectedPlan('monthly')}
              className={`relative p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${selectedPlan === 'monthly' ? 'border-[#4CAF50] bg-white shadow-lg scale-[1.02]' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
              
              <div className="flex justify-between items-start mb-2 mt-1">
                <h3 className="font-bold text-[#1A1A1A] tracking-wide">
                  MONTHLY
                </h3>
                {selectedPlan === 'monthly' ?
                <CheckCircle2Icon
                  size={22}
                  className="text-[#4CAF50] fill-[#4CAF50]/10" /> :


                <CircleIcon size={22} className="text-gray-300" />
                }
              </div>

              <div className="mb-5">
                <span className="text-xl font-bold text-[#1A1A1A]">$14.98</span>
                <span className="text-sm text-gray-500 font-medium">/MO</span>
              </div>

              <p className="text-[11px] text-gray-500 leading-tight mt-[22px]">
                Billed monthly after free trial.
              </p>
            </div>
          </div>

          <p className="text-center text-sm text-gray-500 mb-6">
            Change plans or cancel anytime.
          </p>

          <button
            onClick={() => {
              // Handle subscription logic here
              navigateTo('home');
            }}
            className="w-full py-4 bg-[#2196F3] text-white rounded-full font-bold text-[17px] shadow-md hover:bg-[#1E88E5] transition-colors active:scale-[0.98]">
            
            Start 1-Month Free Trial
          </button>
        </div>
      </div>
    </div>);

};