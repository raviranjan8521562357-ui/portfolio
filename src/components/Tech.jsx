import React from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

// Import all official React Icons
import {
  SiPython,
  SiJavascript,
  SiCplusplus,
  SiReact,
  SiHtml5,
  SiCss,
  SiFastapi,
  SiMongodb,
  SiMysql,
  SiN8N,
  SiLangchain,
  SiGit,
  SiGithub,
  SiPostman,
  SiDocker,
} from "react-icons/si";

import {
  FaJava,
  FaDatabase,
  FaNetworkWired,
  FaBrain,
  FaCube,
  FaLaptopCode,
} from "react-icons/fa";

import {
  TbApi,
  TbGraph,
  TbDatabaseSearch,
  TbRobot,
  TbPrompt,
  TbBinaryTree,
  TbBrandOpenai,
} from "react-icons/tb";

import { VscVscode } from "react-icons/vsc";

// Structured skills dataset with official colors and component links
const skillCategories = [
  {
    title: "Programming Languages",
    skills: [
      { name: "Java", icon: FaJava, color: "#ED8B00" },
      { name: "Python", icon: SiPython, color: "#3776AB" },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "SQL", icon: FaDatabase, color: "#00758F" },
      { name: "C++", icon: SiCplusplus, color: "#00599C" },
    ],
  },
  {
    title: "Frontend",
    skills: [
      { name: "React.js", icon: SiReact, color: "#61DAFB" },
      { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
      { name: "CSS3", icon: SiCss, color: "#1572B6" },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "FastAPI", icon: SiFastapi, color: "#009688" },
      { name: "REST APIs", icon: TbApi, color: "#4A90E2" },
    ],
  },
  {
    title: "Databases",
    skills: [
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      { name: "MySQL", icon: SiMysql, color: "#4479A1" },
    ],
  },
  {
    title: "AI & Generative AI",
    skills: [
      { name: "LangChain", icon: SiLangchain, color: "#00A88F" },
      { name: "LangGraph", icon: TbGraph, color: "#915EFF" },
      { name: "RAG", icon: TbDatabaseSearch, color: "#00CEA8" },
      { name: "AI Agents", icon: TbRobot, color: "#BF61FF" },
      { name: "Prompt Engineering", icon: TbPrompt, color: "#F5AF19" },
      { name: "OpenAI API", icon: TbBrandOpenai, color: "#10A37F" },
      { name: "n8n", icon: SiN8N, color: "#FF6C37" },
      { name: "LLMs", icon: FaBrain, color: "#EC008C" },
    ],
  },
  {
    title: "Tools & Platforms",
    skills: [
      { name: "Git", icon: SiGit, color: "#F05032" },
      { name: "GitHub", icon: SiGithub, color: "#FFFFFF" },
      { name: "VS Code", icon: VscVscode, color: "#007ACC" },
      { name: "Postman", icon: SiPostman, color: "#FF6C37" },
      { name: "Docker", icon: SiDocker, color: "#2496ED" },
    ],
  },
  {
    title: "Core Computer Science",
    skills: [
      { name: "Data Structures & Algorithms", icon: TbBinaryTree, color: "#BF61FF" },
      { name: "Object-Oriented Programming (OOP)", icon: FaCube, color: "#38EF7D" },
      { name: "DBMS", icon: FaDatabase, color: "#11998E" },
      { name: "Operating Systems", icon: FaLaptopCode, color: "#56CCF2" },
      { name: "Computer Networks", icon: FaNetworkWired, color: "#2F80ED" },
    ],
  },
];

const SkillBadge = ({ name, icon: Icon, color }) => {
  return (
    <motion.div
      whileHover={{
        scale: 1.05,
        boxShadow: `0 0 15px ${color}30`,
        borderColor: color,
        backgroundColor: "rgba(255, 255, 255, 0.05)",
      }}
      transition={{ type: "spring", stiffness: 350, damping: 15 }}
      className="flex items-center gap-2 px-3.5 py-2 bg-primary/40 rounded-full border border-secondary/15 hover:border-opacity-50 transition-all duration-300 cursor-default select-none backdrop-blur-sm"
    >
      <Icon style={{ color: color }} className="text-[17px] flex-shrink-0" />
      <span className="text-[13px] font-medium text-white-100 tracking-wide">
        {name}
      </span>
    </motion.div>
  );
};

const SkillCategoryCard = ({ category, index }) => (
  <motion.div
    variants={fadeIn("up", "spring", index * 0.12, 0.75)}
    className="h-full rounded-2xl p-[1px] bg-gradient-to-br from-cyan-500/30 to-purple-500/30 hover:from-cyan-500/50 hover:to-purple-500/50 shadow-[0_0_20px_rgba(145,94,255,0.05)] hover:shadow-[0_0_25px_rgba(145,94,255,0.15)] transition-all duration-300"
  >
    <div className="bg-tertiary rounded-2xl p-6 md:p-7 h-full flex flex-col justify-start">
      <h3 className="text-white text-[19px] font-bold mb-5 flex items-center gap-2.5 tracking-wide">
        <span className="w-2.5 h-2.5 rounded-full bg-[#00cea8] shadow-[0_0_8px_#00cea8] inline-block" />
        {category.title}
      </h3>
      <div className="flex flex-wrap gap-2.5">
        {category.skills.map((skill) => (
          <SkillBadge
            key={skill.name}
            name={skill.name}
            icon={skill.icon}
            color={skill.color}
          />
        ))}
      </div>
    </div>
  </motion.div>
);

const Tech = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>What I work with</p>
        <h2 className={styles.sectionHeadText}>Skills.</h2>
      </motion.div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {skillCategories.map((category, index) => (
          <SkillCategoryCard
            key={category.title}
            category={category}
            index={index}
          />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Tech, "");
