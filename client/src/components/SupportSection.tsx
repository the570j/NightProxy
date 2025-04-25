import { supportOptions } from '@/lib/utils';

export default function SupportSection() {
  return (
    <section id="support" className="py-16 md:py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-space-accent to-space-highlight">
              Support Center
            </span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Have questions or need assistance? Our team is ready to help you
            navigate any issues.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {supportOptions.map((option, index) => (
            <div
              key={index}
              className="glass rounded-xl p-6 hover:scale-105 transition-transform duration-300"
            >
              <div className={`${option.iconColor} text-3xl mb-4`}>
                <i className={`fas fa-${option.icon}`}></i>
              </div>
              <h3 className="text-xl font-semibold font-poppins mb-3">
                {option.title}
              </h3>
              <p className="text-gray-300 mb-4">{option.description}</p>
              <a
                href={option.linkUrl}
                className={`${option.iconColor} hover:underline inline-flex items-center`}
              >
                {option.linkText} <i className="fas fa-arrow-right ml-2"></i>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
