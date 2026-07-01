import React, { memo } from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

const ProjectCard = memo(({
  index,
  name,
  description,
  tags,
  features,
  image,
  github_link,
  live_demo_link,
}) => {
  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <Tilt
        tiltMaxAngleX={15}
        tiltMaxAngleY={15}
        scale={1}
        transitionSpeed={450}
        className='bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full project-card-hover'
      >
        <div className='relative w-full h-[230px]'>
          <img
            src={image}
            alt={name}
            className='w-full h-full object-cover rounded-2xl'
            loading="lazy"
          />

          <div className='absolute inset-0 flex justify-end m-3 card-img_hover'>
            <div className='flex gap-2'>
              {github_link && (
                <button
                  type='button'
                  onClick={() => window.open(github_link, "_blank")}
                  className='w-10 h-10 rounded-full flex justify-center items-center cursor-pointer bg-black/60 hover:bg-black/80 backdrop-blur-sm transition-all duration-300 shadow-lg'
                  aria-label={`Open ${name} GitHub repo`}
                >
                  <img
                    src={github}
                    alt='GitHub'
                    className='w-7 h-7 object-contain'
                  />
                </button>
              )}
            </div>
          </div>
        </div>

        <div className='mt-5'>
          <h3 className='text-white font-bold text-[22px]'>{name}</h3>
          <p className='mt-2 text-secondary text-[14px] leading-[22px]'>{description}</p>
        </div>

        {/* Key Features */}
        {features && features.length > 0 && (
          <ul className='mt-3 space-y-1'>
            {features.map((feature, i) => (
              <li key={i} className='text-white-100 text-[12px] flex items-start gap-2'>
                <span className='text-[#915EFF] mt-0.5'>▸</span>
                {feature}
              </li>
            ))}
          </ul>
        )}

        {/* Technology Badges */}
        <div className='mt-4 flex flex-wrap gap-2'>
          {tags.map((tag) => (
            <span
              key={tag.name}
              className={`text-[12px] font-medium px-2.5 py-1 rounded-full bg-primary/60 border border-secondary/20 ${tag.color}`}
            >
              #{tag.name}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className='mt-4 flex gap-3'>
          {live_demo_link && (
            <a
              href={live_demo_link}
              target='_blank'
              rel='noopener noreferrer'
              className='flex-1 text-center py-2 px-4 rounded-lg bg-[#915EFF] hover:bg-[#7d4edb] text-white text-[13px] font-semibold transition-all duration-300 shadow-md hover:shadow-lg'
            >
              Live Demo
            </a>
          )}
          {github_link && (
            <a
              href={github_link}
              target='_blank'
              rel='noopener noreferrer'
              className='flex-1 text-center py-2 px-4 rounded-lg bg-tertiary border border-secondary/30 hover:border-[#915EFF]/50 text-white text-[13px] font-semibold transition-all duration-300'
            >
              GitHub
            </a>
          )}
        </div>
      </Tilt>
    </motion.div>
  );
});

ProjectCard.displayName = "ProjectCard";

const Works = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <h2 className={`${styles.sectionHeadText}`}>Projects.</h2>
      </motion.div>

      <div className='w-full flex'>
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className='mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]'
        >
          This section highlights my key projects that demonstrate my expertise in AI/ML, full-stack development, and building real-world applications. Each project reflects my dedication to innovation, problem-solving, and building end-to-end AI systems using modern technologies.
        </motion.p>
      </div>

      <div className='mt-20 flex flex-wrap gap-7 justify-center'>
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "");
