import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Report",
    desc: "Submit an issue with location, images, and detailed description."
  },
  {
    number: "02",
    title: "Track",
    desc: "Monitor live updates, workflow progress, and status changes in real-time."
  },
  {
    number: "03",
    title: "Resolve",
    desc: "Authorities act transparently and close issues with verified completion."
  }
];

const HowItWorksSection = () => {
  return (
    <section className="py-24 px-6 text-white relative overflow-hidden">

      {/* Soft overlay for readability */}
      <div className="absolute inset-0 bg-black/40 -z-10"></div>

      {/* Section Header */}
      <div className="max-w-6xl mx-auto text-center mb-20">

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-6"
        >
          How NagarNiti Works
        </motion.h2>

        <p className="text-gray-400 text-lg">
          Simple process. Powerful transparency.
        </p>
      </div>

      {/* Timeline Line (Desktop Only) */}
      <div className="hidden md:block absolute left-1/2 top-52 h-[2px] w-[60%] -translate-x-1/2 bg-gradient-to-r from-cyan-500/20 via-cyan-400 to-cyan-500/20"></div>

      {/* Steps */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 relative">

        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-2xl text-center hover:border-cyan-400/40 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300"
          >

            {/* Step Number */}
            <div className="mb-6">
              <span className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                {step.number}
              </span>
            </div>

            <h3 className="text-xl font-semibold mb-4">
              {step.title}
            </h3>

            <p className="text-gray-400 text-sm leading-relaxed">
              {step.desc}
            </p>

          </motion.div>
        ))}

      </div>

    </section>
  );
};

export default HowItWorksSection;
