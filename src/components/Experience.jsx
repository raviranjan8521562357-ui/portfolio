import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";
import "react-vertical-timeline-component/style.min.css";
import { styles } from "../styles";
import { experiences as projectsData } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";
import { research, translate, chatbot } from "../assets";

const experienceData = [
  {
    company: "Chandigarh University",
    role: "B.E. Computer Science and Engineering",
    duration: "April 2022 – July 2026",
    link: "https://www.cuchd.in/",
    description: [
      "Final-year Computer Science student with hands-on experience building 4+ end-to-end AI systems.",
      "Skilled in Python, Java, TensorFlow, FastAPI, React, LangChain, RAG, and Computer Vision.",
      "Strong focus on building real-world AI applications including face recognition, resume screening, and medical imaging.",
      "Completed NPTEL certifications in Cloud Computing (Silver Medal), Computer Organization, and IoT Architectures."
    ]
  }
];

const ExperienceCard = ({ experience, index }) => {
  const projectIcons = [
    { id: 1, link: "#", icon: research },
    { id: 2, link: "#", icon: translate },
    { id: 3, link: "#", icon: chatbot },
  ];
  const iconData = projectIcons[index % projectIcons.length];
  
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "#1d1836",
        color: "#fff",
      }}
      contentArrowStyle={{ borderRight: "7px solid  #232631" }}
      date={experience.date}
      iconStyle={{ background: experience.iconBg }}
      icon={
        <div className="flex justify-center items-center w-full h-full">
          <a
            href={iconData.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={iconData.icon}
              alt={`logo-${iconData.id}`}
              className="w-full h-[60%] object-contain rounded-full"
            />
          </a>
        </div>
      }
    >
      <div>
        <h3 className="text-white text-[24px] font-bold">{experience.title}</h3>
        <p
          className="text-secondary text-[16px] font-semibold"
          style={{ margin: 0 }}
        >
          {experience.company_name}
        </p>
      </div>
      <ul className="mt-5 list-disc ml-5 space-y-2">
        {experience.points.map((point, i) => (
          <li
            key={`experience-point-${i}`}
            className="text-white-100 text-[14px] pl-1 tracking-wider"
          >
            {point}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};

const Experience = () => {
  return (
    <>
      {/* Experience Section */}
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>
          My academic background
        </p>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          Education.
        </h2>
      </motion.div>

      <div className="mt-20 flex flex-col">
        <div className="space-y-6">
          {experienceData.map((exp, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl shadow-md bg-[#1d1836] hover:shadow-lg transition"
            >
              <a
                href={exp.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl font-semibold text-blue-400 hover:underline"
              >
                {exp.company}
              </a>
              <p className="text-white text-[18px] mt-1">{exp.role}</p>
              <p className="text-secondary text-sm mt-1">{exp.duration}</p>
              <ul className="list-disc ml-5 mt-4 space-y-2">
                {exp.description.map((point, i) => (
                  <li key={i} className="text-white-100 text-[14px] pl-1 tracking-wider">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Projects Section */}
      <motion.div variants={textVariant()} className="mt-20">
        <p className={`${styles.sectionSubText} text-center`}>
          Projects I have done so far
        </p>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          Projects.
        </h2>
      </motion.div>

      <div className="mt-20 flex flex-col">
        <VerticalTimeline>
          {projectsData.map((experience, index) => (
            <ExperienceCard
              key={`experience-${index}`}
              experience={experience}
              index={index}
            />
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
};

export default SectionWrapper(Experience, "work");