import { motion } from "framer-motion";
import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";

const Hero = () => {
  return (
    <section className="w-full min-h-screen mx-auto flex flex-col">
      {/* Hero Text Content */}
      <div
        className={`flex flex-row items-start gap-5 max-w-7xl ${styles.paddingX} pt-[100px] sm:pt-[120px]`}
      >
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#915EFF]" />
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I'm <span className="text-[#915EFF]">Ravi Ranjan</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            AI Engineer | Full Stack Developer <br className="sm:block hidden" />
            | Generative AI Enthusiast
          </p>
          <p className="mt-4 text-secondary text-[16px] sm:text-[18px] max-w-lg leading-[28px]">
            Building intelligent, scalable applications powered by AI — from concept to deployment.
          </p>
        </div>
      </div>

      {/* Canvas closer to the text */}
      <div className="w-full sm:h-[600px] sm:mt-[-300px] mt-[-140px] h-[350px]">
        <ComputersCanvas />
        <div className="w-full flex justify-center items-center mt-6">
        <a href="#about">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
            <motion.div
              animate={{ y: [0, 24, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-secondary mb-1"
            />
          </div>
        </a>
      </div>
      </div>

      {/* Scroll Indicator */}
      
    </section>
  );
};

export default Hero;
