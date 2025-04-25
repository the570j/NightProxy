import { features } from '@/lib/utils';

export default function FeatureSection() {
  return (
    <section id="features" className="py-16 md:py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-space-accent to-space-highlight">
              Stellar Features
            </span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Discover why NightProxy is the preferred choice for navigating the digital cosmos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glass rounded-xl p-6 hover:scale-105 transition-transform duration-300 gradient-border h-full flex flex-col"
            >
              <div className={`${feature.iconColor} text-3xl mb-4`}>
                <i className={`fas fa-${feature.icon}`}></i>
              </div>
              <h3 className="text-xl font-semibold font-poppins mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-300 flex-grow">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
