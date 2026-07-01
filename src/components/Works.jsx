import React from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { github, linkedin } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  linkedin_link,
  github_link,
}) => {
  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <Tilt
        tiltMaxAngleX={45}
        tiltMaxAngleY={45}
        scale={1}
        transitionSpeed={450}
        className='bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full'
      >
        <div className='relative w-full h-[230px]'>
          <img
            src={image}
            alt='project_image'
            className='w-full h-full object-cover rounded-2xl'
          />

          <div className='absolute inset-0 flex justify-end m-3 card-img_hover'>
            <div className='flex gap-2'>
              {linkedin_link && (
                <button
                  type='button'
                  onClick={() => window.open(linkedin_link, "_blank")}
                  className='w-10 h-10 rounded-full flex justify-center items-center cursor-pointer bg-[#0A66C2] hover:bg-[#0A5BBB] transition-colors shadow-lg'
                  aria-label='Open LinkedIn post'
                >
                  <img
                    src={linkedin}
                    alt='LinkedIn'
                    className='w-6 h-6 object-contain'
                  />
                </button>
              )}
              {github_link && (
                <button
                  type='button'
                  onClick={() => window.open(github_link, "_blank")}
                  className='w-10 h-10 rounded-full flex justify-center items-center cursor-pointer bg-transparent hover:bg-white/10 transition-colors'
                  aria-label='Open GitHub repo'
                >
                  <img
                    src={github}
                    alt='GitHub'
                    className='w-8 h-8 object-contain'
                  />
                </button>
              )}
            </div>
          </div>
        </div>

        <div className='mt-5'>
          <h3 className='text-white font-bold text-[24px]'>{name}</h3>
          <p className='mt-2 text-secondary text-[14px]'>{description}</p>
        </div>

        
      </Tilt>
    </motion.div>
  );
};

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

      <div className='mt-20 flex flex-wrap gap-7'>
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "");
