import DashboardLayout from '@/components/Dashboard/DasboardLayout';
import React from 'react';
import Button from '@/components/shared/Button';
import { Check } from 'lucide-react';

const plans = [
  {
    title: 'Free',
    price: '₦0',
    features: ['List up to 3 items', 'Basic support', 'Limited visibility'],
    highlight: false,
    buttonText: 'Current Plan',
    disabled: true,
  },
  {
    title: 'Standard',
    price: '₦500/mo',
    features: ['List up to 50 items', 'Priority support', 'Boosted visibility'],
    highlight: true,
    buttonText: 'Upgrade to Standard',
    disabled: false,
  },
  {
    title: 'Premium',
    price: '₦1000/mo',
    features: ['Unlimited items', '24/7 Support', 'Featured placement'],
    highlight: false,
    buttonText: 'Go Premium',
    disabled: false,
  },
];

const SubscriptionPage = () => {
  return (
    <DashboardLayout>
      <div className="w-full bg-white text-[#333333] p-4 text-[13px] sm:text-sm md:text-base">
        <div className="flex flex-col items-center justify-center md:mt-4 mb-6 gap-2">
          <h1 className="font-bold text-2xl md:text-3xl xl:text-4xl text-center">
            Choose a <span className="text-[#34C759]">Plan</span>
          </h1>
          <p className="text-sm md:text-base text-center text-gray-600">
            Select the subscription plan that best fits your needs.
          </p>
        </div>

        {/* Subscription Plans */}
        <div className="mt-8">
          <h2 className="text-sm md:text-base lg:text-lg font-semibold mb-3">Subscription Plans</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`bg-white border rounded-lg shadow-md p-5 flex flex-col gap-2 ${
                  plan.highlight ? 'border-[#34C759] shadow-lg' : 'border-gray-200'
                }`}
              >
                <h3 className="text-lg font-semibold text-[#34C759]">{plan.title}</h3>
                <p className="text-sm text-gray-600">{plan.features[0]}</p>
                <p className="font-bold text-xl mt-2">{plan.price}</p>

                {/* Feature List with Green Checks */}
                <div className="mt-2 space-y-1">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <Check size={16} className="text-[#34C759] mt-[2px]" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  text={plan.buttonText}
                  className={`mt-4 ${
                    plan.disabled
                      ? 'bg-gray-300 text-[#333] cursor-not-allowed'
                      : ''
                  }`}
                  disabled={plan.disabled}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SubscriptionPage;
